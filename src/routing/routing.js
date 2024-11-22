import { StorageService } from '../storage/storage.js';
import { templates } from './templates.js';
import { render_summary, render_incomes, render_fees, setup_income_form, setup_fee_form } from '../dom/presenter.js';

const main_element = document.querySelector('main');

const route_templates = {
  '/': templates.summary,
  '/incomes': templates.incomes,
  '/fees': templates.fees,
  '/settings': templates.settings,
  '/register': templates.register,
  '/login': templates.login,
  '/reports': templates.reports,
};

export function navigate_to(route, link) {
  const path = route.startsWith('/') ? route : `/${route}`;
  main_element.innerHTML = route_templates[path] || '<h1 class="error-message">Oops, algo ha fallado.</h1>';
  document.querySelectorAll('.icon_nav').forEach(nav_item => 
    nav_item.classList.remove('active')
  );
  if (link) link.classList.add('active');
  window.history.pushState({}, '', path);
  initialize_page_handlers(path);
}

function initialize_page_handlers(route) {
  const storage = new StorageService();
  const route_handlers = {
    '/': () => render_summary(storage),
    '/incomes': () => {
      render_incomes(storage);
      setup_income_form(storage);
    },
    '/fees': () => {
      render_fees(storage);
      setup_fee_form(storage);
    },
    '/reports': () => {
      setup_report_form(storage);
      const categories = [...new Set(storage.get_fees().map(fee => fee.category))];
      const category_select = document.getElementById('report_category');
      if (category_select) {
        category_select.innerHTML = `
          <option value="all">Todas las categorías</option>
          ${categories.map(category => 
            `<option value="${category}">${category}</option>`
          ).join('')}
        `;
      }
    }
  };
  const handler = route_handlers[route];
  if (handler) handler();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[router_link]').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const route = link.getAttribute('router_link');
      navigate_to(route, link);
    });
  });

  window.addEventListener('popstate', () => {
    navigate_to(window.location.pathname);
  });

  navigate_to(window.location.pathname || '/');
});