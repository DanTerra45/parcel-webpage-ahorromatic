import { Income } from "../logic/incomes.js";
import { Fee } from "../logic/fees.js";
import { StorageService } from "../storage/storage.js";
import { navigate_to } from "../routing/routing.js";

const storage = new StorageService();

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