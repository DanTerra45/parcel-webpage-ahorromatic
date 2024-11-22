export const templates = {
    summary: `
      <div class="dashboard">
        <h1>Resumen de tu actividad</h1>
        <div id="summary"></div>
      </div>
    `,
    incomes: `
      <div class="incomes">
        <h1>Registro de ingresos</h1>
        <form id="income-form">
          <input type="text" id="income_description" placeholder="Descripción" required>
          <input type="number" id="income_amount" placeholder="Cantidad" required>
          <input type="date" id="income_date" required>
          <button type="submit">Agregar Ingreso</button>
        </form>
        <div id="incomes_list"></div>
      </div>
    `,
    fees: `
      <div class="fees">
        <h1>Registro de gastos</h1>
        <form id="fee-form">
          <input type="text" id="fee_description" placeholder="Descripción" required>
          <input type="number" id="fee_amount" placeholder="Cantidad" required>
          <input type="date" id="fee_date" required>
          <select id="fee_category" required>
            <option value="" selected disabled>Selecciona categoría</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            <option value="otros">Otros</option>
          </select>
          <button type="submit">Agregar Gasto</button>
        </form>
        <div id="fees_list"></div>
      </div>
    `,
    settings: `
      <div class="settings">
        <h1>Configuraciónes</h1>
        <form id="settings_form" class="settings-form">
          <div class="settings_item">
            <label for="notifications">Activar Notificaciones</label>
            <input type="checkbox" id="notifications" checked>
          </div>
          <div class="settings_item">
            <label for="dark_mode">Modo Oscuro</label>
            <input type="checkbox" id="dark_mode">
          </div>
          <div class="settings_item">
            <label for="language">Preferir Formato de Idioma</label>
            <select id="language">
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="fr">Francés</option>
            </select>
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    `,
    register: `
      <div class="register">
        <h1>Registrarse</h1>
        <form id="register_form" class="auth-form">
          <input type="text" id="user_name" placeholder="Usuario" required>
          <input type="email" id="user_email" placeholder="Email" required>
          <input type="password" id="user_password" placeholder="Contraseña" required>
          <input type="password" id="confirm_password" placeholder="Confirmar Contraseña" required>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    `,
    login: `
      <div class="login">
        <h1>Inicia sesión</h1>
        <form id="login_form" class="auth-form">
          <input type="text" id="login_user_name" placeholder="Usuario" required>
          <input type="password" id="login_user_password" placeholder="Contraseña" required>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    `,
    reports: `
      <div class="reports">
        <h1>Reportes</h1>
        <div class="report-form">
          <select id="report_type">
            <option value="all">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>
          <input type="date" id="report_start_date" required>
          <input type="date" id="report_end_date" required>
          <select id="report_category">
            <option value="all">Todas las categorías</option>
          </select>
          <button id="generate_report_btn">Generar Reporte</button>
        </div>
        <div id="report_results"></div>
      </div>
    `
};  