export class Income {
    constructor(description, amount, date) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = 'income';
    }

    validate() {
        const is_valid_description = this.description.trim().length > 0;
        return is_valid_description;
      }
}

export const calculate_total_incomes = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
};