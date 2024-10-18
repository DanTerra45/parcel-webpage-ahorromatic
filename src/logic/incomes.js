export class Income {
    constructor(description, amount, date) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = 'income';
    }

    validate() {
        const is_valid_description = this.description.trim().length > 0;
        const is_valid_amount = typeof this.amount === 'number' && this.amount > 0;
        const is_valid_date = !isNaN(new Date(this.date).getTime());
        return is_valid_description && is_valid_amount && is_valid_date;
      }
}

export const calculate_total_incomes = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
};