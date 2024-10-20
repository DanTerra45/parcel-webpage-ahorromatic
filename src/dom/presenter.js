import { Income } from "../logic/incomes.js";
import { Fee } from "../logic/fees.js";
import { StorageService } from "../storage/storage.js";
import { navigate_to } from "../routing/routing.js";

const storage = new StorageService();

export function render_summary() {
  const summary_div = document.getElementById('summary');
  if (!summary_div) return;

  const incomes = storage.get_incomes();
  const fees = storage.get_fees();

  const total_incomes = incomes.reduce((total, income) => total + income.amount, 0);
  const total_fees = fees.reduce((total, fee) => total + fee.amount, 0);
  const balance = total_incomes - total_fees;

  summary_div.innerHTML = `
    <div class="summary-cards">
      <div class="card income-card">
        <h3>Total Ingresos</h3>
        <p>${total_incomes.toFixed(2)} Bs</p>
      </div>
      <div class="card fee-card">
        <h3>Total Gastos</h3>
        <p>${total_fees.toFixed(2)} Bs</p>
      </div>
      <div class="card balance-card">
        <h3>Balance</h3>
        <p>${balance.toFixed(2)} Bs</p>
      </div>
    </div>
  `;
}

export function render_incomes() {
  const incomes_list = document.getElementById('incomes-list');
  if (!incomes_list) return;

  const incomes = storage.get_incomes();
  const fragment = document.createDocumentFragment();

  incomes.forEach((income, index) => {
    const income_item = document.createElement('div');
    income_item.className = 'income-item';

    income_item.innerHTML = `
      <span>${income.description}</span>
      <span>${income.amount.toFixed(2)} Bs</span>
      <span>${new Date(income.date).toLocaleDateString()}</span>
      <button class="delete-income" data-index="${index}">Eliminar</button>
    `;

    fragment.appendChild(income_item);
  });

  incomes_list.innerHTML = '';
  incomes_list.appendChild(fragment);
}

export function setup_income_form() {
  const form = document.getElementById('income-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const income = new Income(
      document.getElementById('income-description').value,
      Number(document.getElementById('income-amount').value),
      document.getElementById('income-date').value
    );

    if (income.validate()) {
      storage.add_income(income);
      render_incomes();
      render_summary();
      form.reset();
    }
  });
}

export function setup_fee_form() {
  const form = document.getElementById('fee-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fee = new Fee(
      document.getElementById('fee-description').value,
      Number(document.getElementById('fee-amount').value),
      document.getElementById('fee-date').value,
      document.getElementById('fee-category').value
    );

    if (fee.validate()) {
      storage.add_fee(fee);
      render_fees();
      render_summary();
      form.reset();
    }
  });
}

document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-income')) {
    const index = event.target.dataset.index;
    storage.delete_income(index);
    render_incomes();
    render_summary();
  }

  if (event.target.classList.contains('delete-fee')) {
    const index = event.target.dataset.index;
    storage.delete_fee(index);
    render_fees();
    render_summary();
  }
});