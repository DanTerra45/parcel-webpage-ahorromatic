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
  `
};