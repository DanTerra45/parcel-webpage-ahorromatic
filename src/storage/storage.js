export class StorageService {
    constructor(storage_key = 'ahorromatic_data') {
      this.storage_key = storage_key;
      this.initialize_storage();
    }
    initialize_storage() {
      if (!localStorage.getItem(this.storage_key)) {
        localStorage.setItem(this.storage_key, JSON.stringify({
          incomes: [],
          fees: [],
          savings_goals: []
        }));
      }
    }
    get_data() {
      return JSON.parse(localStorage.getItem(this.storage_key));
    }
    save_data(data) {
      localStorage.setItem(this.storage_key, JSON.stringify(data));
    }
    add_income(income) {
      const data = this.get_data();
      data.incomes.push(income);
      this.save_data(data);
    }
    add_fee(fee) {
      const data = this.get_data();
      data.fees.push(fee);
      this.save_data(data);
    }
    add_savings_goal(goal) {
      const data = this.get_data();
      if (!data.savings_goals) {
        data.savings_goals = [];
      }
      data.savings_goals.push(goal);
      this.save_data(data);
    }
    get_savings_goals() {
      const data = this.get_data();
      return data.savings_goals || [];
    }
    get_incomes() {
      return this.get_data().incomes;
    }
    get_fees() {
      return this.get_data().fees;
    }
    get_incomes_by_period(start_date, end_date) {
      const incomes = this.get_incomes();
      return incomes.filter(income => {
        const income_date = new Date(income.date);
        return income_date >= new Date(start_date) && income_date <= new Date(end_date);
      });
    }
    get_fees_by_period(start_date, end_date) {
      const fees = this.get_fees();
      return fees.filter(fee => {
        const fee_date = new Date(fee.date);
        return fee_date >= new Date(start_date) && fee_date <= new Date(end_date);
      });
    }
    get_fees_by_period_and_category(start_date, end_date, category) {
      const fees = this.get_fees_by_period(start_date, end_date);
      return category === 'all' ? fees : fees.filter(fee => fee.category === category);
    }
    delete_income(index) {
      const data = this.get_data();
      data.incomes.splice(index, 1);
      this.save_data(data);
    }
    delete_fee(index) {
      const data = this.get_data();
      data.fees.splice(index, 1);
      this.save_data(data);
    }
    clear_all() {
      localStorage.removeItem(this.storage_key);
      this.initialize_storage();
    }
  }