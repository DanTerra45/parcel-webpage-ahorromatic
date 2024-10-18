export class Income {
    constructor(description, amount, date) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = 'income';
    }
}

export const calculate_total_incomes = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
};