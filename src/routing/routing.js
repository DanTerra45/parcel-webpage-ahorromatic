import { StorageService } from '../storage/storage.js';
import { render_summary, render_incomes, render_fees, setup_income_form, setup_fee_form } from '../dom/presenter.js';

const main = document.querySelector('main');

const routes = {
    '/': `
      <div class="dashboard">
        <h1>Resumen de tu actividad</h1>
        <div id="summary"></div>
      </div>
    `,
    '/incomes': `
    <div class="incomes">
      <h1>Registro de ingresos</h1>
      <form id="income-form">
        <input type="text" id="income-description" placeholder="Descripción" required>
        <input type="number" id="income-amount" placeholder="Cantidad" required>
        <input type="date" id="income-date" required>
        <button type="submit">Agregar Ingreso</button>
      </form>
      <div id="incomes-list"></div>
    </div>
    `,
    '/fees': `
    <div class="fees">
      <h1>Registro de gastos</h1>
      <form id="fee-form">
        <input type="text" id="fee-description" placeholder="Descripción" required>
        <input type="number" id="fee-amount" placeholder="Cantidad" required>
        <input type="date" id="fee-date" required>
        <select id="fee-category" required>
          <option value="" selected disabled>Selecciona categoría</option>
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="servicios">Servicios</option>
          <option value="otros">Otros</option>
        </select>
        <button type="submit">Agregar Gasto</button>
      </form>
      <div id="fees-list"></div>
    </div>
    `,
    '/settings': `
    <div class="settings">
      <h1>Configuraciónes</h1>
      <form id="register_form" class="auth-form">
      <label for="notifications">Activar Notificaciones</label>
      <input type="checkbox" id="notifications" checked>
      <label for="dark_mode">Modo Oscuro</label>
      <input type="checkbox" id="dark_mode">
      <label for="language">Preferir Formato de Idioma</label>
      <select id="language">
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
      </select>
      <button type="submit">Guardar Cambios</button>
      </form>
    </div>
    `,
    '/register': `
    <div class="register">
      <h1>Registrarse</h1>
      <form id="register_form" class="auth-form">
        <input type="text" id="username" placeholder="Usuario" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Contraseña" required>
        <input type="password" id="confirm_password" placeholder="Confirmar Contraseña" required>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  `,
    '/login': `
    <div class="login">
        <h1>Inicia sesión</h1>
        <form id="login_form" class="auth-form">
        <input type="text" id="login_username" placeholder="Usuario" required>
        <input type="password" id="login_password" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
        </form>
    </div>
    `,
    '/reports': `
    <div class="reports">
      <h1>Reportes</h1>
      <div class="report-filters">
        <select id="report_type">
          <option value="all">Todos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>
        <input type="date" id="report_start_date" required>
        <input type="date" id="report_end_date" required>
        <select id="category_filter">
          <option value="all">Todas las categorías</option>
        </select>
        <button onclick="window.generate_report()">Generar Reporte</button>
      </div>
      <div id="report_results" class="report-results"></div>
      <div id="report_chart" class="report-chart"></div>
    </div>
    `
};

export function navigate_to(route, link) {
    const path = route.startsWith('/') ? route : `/${route}`;
    main.innerHTML = routes[path] || '<h1>Oops, algo ha fallado.</h1>';
    document.querySelectorAll('.icon_nav').forEach(nav => nav.classList.remove('active'));
    if (link) link.classList.add('active');
    window.history.pushState({}, '', path);
    initialize_page_handlers(path);
}