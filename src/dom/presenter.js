import { Income } from "../logic/incomes.js";
import { Fee } from "../logic/fees.js";
import { StorageService } from "../storage/storage.js";
import { navigate_to } from "../routing/routing.js";

const storage = new StorageService();

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