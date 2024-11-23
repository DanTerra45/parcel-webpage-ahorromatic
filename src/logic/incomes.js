import { validate_common_fields } from './validation.js';

export class Income {
    constructor(description, amount, date) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = 'income';
    }
    validate() {
        return validate_common_fields(this);
    }
}

export const calculate_total_incomes = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
};