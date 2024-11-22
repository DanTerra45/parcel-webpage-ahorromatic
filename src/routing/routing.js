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
  '/savings-goals': templates.savings_goals
};

export function navigate_to(route, link) {
  const path = route.startsWith('/') ? route : `/${route}`;
  main.innerHTML = routes[path] || '<h1>Oops, algo ha fallado.</h1>';
  document.querySelectorAll('.icon_nav').forEach(nav => nav.classList.remove('active'));
  if (link) link.classList.add('active');
  window.history.pushState({}, '', path);
  initialize_page_handlers(path);
}

function initialize_page_handlers(route) {
  const storage = new StorageService();

  switch (route) {
    case '/':
      render_summary(storage);
      break;
    case '/incomes':
      render_incomes(storage);
      setup_income_form(storage);
      break;
    case '/fees':
      render_fees(storage);
      setup_fee_form(storage);
      break;
  }
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