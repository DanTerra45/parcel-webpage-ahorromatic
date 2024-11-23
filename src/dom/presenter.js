import { navigate_to } from "../routing/routing.js";

const storage = new StorageService();

export function render_summary(storage) {
  const summary_element = document.getElementById('summary');
  const incomes = storage.get_incomes();
  const fees = storage.get_fees();
  const total_incomes = incomes.reduce((sum, income) => sum + Number(income.amount), 0);
  const total_fees = fees.reduce((sum, fee) => sum + Number(fee.amount), 0);
  const balance = total_incomes - total_fees;
  summary_element.innerHTML = `
    <div class="summary-card">
      <h2>Balance Total</h2>
      <p class="amount ${balance >= 0 ? 'positive' : 'negative'}"> Bs${balance.toFixed(2)}</p>
    </div>
    <div class="summary-card">
      <h2>Ingresos Totales</h2>
      <p class="amount positive"> Bs${total_incomes.toFixed(2)}</p>
    </div>
    <div class="summary-card">
      <h2>Gastos Totales</h2>
      <p class="amount negative"> Bs${total_fees.toFixed(2)}</p>
    </div>
  `;
}

export function render_incomes(storage) {
  const incomes_list = document.getElementById('incomes_list');
  const incomes = storage.get_incomes();
  if (incomes && incomes.length > 0) {
    incomes_list.innerHTML = `
      <div class="list">
        <h2>Lista de Ingresos</h2>
        ${incomes.map((income, index) => `
          <div class="list-item">
            <div class="item-info">
              <p class="description">${income.description}</p>
              <p class="amount">$${Number(income.amount).toFixed(2)}</p>
              <p class="date">${income.date}</p>
            </div>
            <button onclick="window.delete_income(${index})">Eliminar</button>
          </div>
        `).join('')}
      </div>
    `;
    incomes_list.querySelector('.list').classList.add('active');
  } 
  else {
    incomes_list.innerHTML = '';
  }
}

export function render_fees(storage) {
  const fees_list = document.getElementById('fees_list');
  const fees = storage.get_fees();
  if (fees && fees.length > 0) {
    fees_list.innerHTML = `
      <div class="list">
        <h2>Lista de Gastos</h2>
        ${fees.map((fee, index) => `
          <div class="list-item">
            <div class="item-info">
              <p class="description">${fee.description}</p>
              <p class="amount">$${Number(fee.amount).toFixed(2)}</p>
              <p class="date">${fee.date}</p>
              <p class="category">${fee.category}</p>
            </div>
            <button onclick="window.delete_fee(${index})">Eliminar</button>
          </div>
        `).join('')}
      </div>
    `;
    fees_list.querySelector('.list').classList.add('active');
  } 
  else {
    fees_list.innerHTML = '';
  }
}

export function render_savings_goals(storage) {
  const goals_list = document.getElementById('savings_goals_list');
  if (!goals_list) return;
  const goals = storage.get_savings_goals();
  const incomes = storage.get_incomes();
  const fees = storage.get_fees();
  const total_savings = incomes.reduce((sum, income) => sum + Number(income.amount), 0) - fees.reduce((sum, fee) => sum + Number(fee.amount), 0);
  if (goals && goals.length > 0) {
    goals_list.innerHTML = `
      <div class="list">
        <h2>Tus Metas de Ahorro</h2>
        ${goals.map((goal, index) => {
          const progress = (total_savings / Number(goal.amount)) * 100;
          const progress_capped = Math.min(100, Math.max(0, progress));
          return `
            <div class="list-item goal-item">
              <div class="item-info">
                <p class="description">${goal.description}</p>
                <p class="amount">Meta: $${Number(goal.amount).toFixed(2)}</p>
                <p class="date">Fecha objetivo: ${goal.date}</p>
                <div class="progress-bar">
                  <div class="progress" style="width: ${progress_capped}%"></div>
                </div>
                <p class="progress-text">Progreso: ${progress_capped.toFixed(1)}%</p>
                <p class="savings-amount">Ahorrado: $${total_savings.toFixed(2)}</p>
              </div>
              <button onclick="window.delete_savings_goal(${index})">Eliminar</button>
            </div>
          `;
        }).join('')}
      </div>
    `;
    goals_list.querySelector('.list').classList.add('active');
  } 
  else {
    goals_list.innerHTML = '';
  }
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