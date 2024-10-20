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
  `
};