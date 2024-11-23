import { validate_common_fields } from './validation.js';

export class Fee {
    constructor(description, amount, date, category) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.type = 'fee';
    }
    validate() {
        const common_validation = validate_common_fields(this);
        const is_valid_category = this.category && this.category.trim().length > 0;
        return common_validation && is_valid_category;
    }
}

export const calculate_total_fees = (fees) => {
    return fees.reduce((total, fee) => total + fee.amount, 0);
};