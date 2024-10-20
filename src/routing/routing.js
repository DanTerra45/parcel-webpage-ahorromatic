import { StorageService } from '../storage/storage.js';
import { render_summary, render_incomes, render_fees, setup_income_form, setup_fee_form } from '../dom/presenter.js';

const main = document.querySelector('main');

const routes = {
    '/': `
      <div class="dashboard">
        <h1>Resumen de tu actividad</h1>
        <div id="summary"></div>
      </div>
    `
};