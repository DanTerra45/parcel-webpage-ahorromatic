import { navigate_to } from "../routing/routing.js";

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

export function setup_income_form(storage) {
  const form = document.getElementById('income-form');
  if (!form) return;
  form.onsubmit = (render_event) => {
    render_event.preventDefault();
    const description = document.getElementById('income_description').value;
    const amount = document.getElementById('income_amount').value;
    const date = document.getElementById('income_date').value;
    storage.add_income({ description, amount, date });
    render_incomes(storage);
    render_summary(storage);
    form.reset();
  };
  window.delete_income = (index) => {
    storage.delete_income(index);
    render_incomes(storage);
    render_summary(storage);
  };
}

export function setup_fee_form(storage) {
  const form = document.getElementById('fee-form');
  if (!form) return;
  form.onsubmit = (render_event) => {
    render_event.preventDefault();
    const description = document.getElementById('fee_description').value;
    const amount = document.getElementById('fee_amount').value;
    const date = document.getElementById('fee_date').value;
    const category = document.getElementById('fee_category').value;
    storage.add_fee({ description, amount, date, category });
    render_fees(storage);
    render_summary(storage);
    form.reset();
  };
  window.delete_fee = (index) => {
    storage.delete_fee(index);
    render_fees(storage);
    render_summary(storage);
  };
}

export function setup_savings_goal_form(storage) {
  const form = document.getElementById('savings-goal-form');
  if (!form) return;
  form.onsubmit = (render_event) => {
    render_event.preventDefault();
    const description = document.getElementById('goal_description').value;
    const amount = document.getElementById('goal_amount').value;
    const date = document.getElementById('goal_date').value;
    storage.add_savings_goal({ description, amount, date });
    render_savings_goals(storage);
    form.reset();
  };
  window.delete_savings_goal = (index) => {
    storage.delete_savings_goal(index);
    render_savings_goals(storage);
  };
}

export function setup_report_form(storage) {
  const generate_btn = document.getElementById('generate_report_btn');
  const results_div = document.getElementById('report_results');
  if (!generate_btn) return;
  generate_btn.onclick = () => {
    const type = document.getElementById('report_type').value;
    const start_date = document.getElementById('report_start_date').value;
    const end_date = document.getElementById('report_end_date').value;
    const category = document.getElementById('report_category').value;
    let html = '';
    let has_content = false;
    if (type === 'all' || type === 'income') {
      const period_incomes = storage.get_incomes_by_period(start_date, end_date);
      const total_incomes = period_incomes.reduce((sum, income) => sum + Number(income.amount), 0);
      if (period_incomes.length > 0) {
        has_content = true;
        html += `
          <div class="list">
            <h2>Resultados del Reporte</h2>
            <div class="report-section">
              <h3>Ingresos</h3>
              <p>Total: $${total_incomes.toFixed(2)}</p>
              <ul>
                ${period_incomes.map(income => `
                  <li>${income.description}: $${Number(income.amount).toFixed(2)} (${income.date})</li>
                `).join('')}
              </ul>
            </div>
          </div>
        `;
      }
    }
  }
  if (type === 'all' || type === 'fee') {
    const period_fees = storage.get_fees_by_period_and_category(start_date, end_date, category);
    const total_fees = period_fees.reduce((sum, fee) => sum + Number(fee.amount), 0);
    if (period_fees.length > 0) {
      hasContent = true;
      if (!html) {
        html += `
          <div class="list">
            <h2>Resultados del Reporte</h2>
        `;
      }
      html += `
        <div class="report-section">
          <h3>Gastos</h3>
          <p>Total: $${total_fees.toFixed(2)}</p>
          <ul>
            ${period_fees.map(fee => `
              <li>${fee.description}: $${Number(fee.amount).toFixed(2)} (${fee.date}) - ${fee.category}</li>
            `).join('')}
          </ul>
        </div>
      `;
      if (html.includes('<div class="list">')) {
        html += '</div>';
      }
    }
  }
  results_div.innerHTML = html;
  if (has_content) {
    results_div.querySelector('.list').classList.add('active');
  }
};