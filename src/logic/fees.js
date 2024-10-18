export class Fee {
    constructor(description, amount, date, category) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.type = 'fee';
    }

    validate() {
        const is_valid_description = this.description.trim().length > 0;
        const is_valid_amount = typeof this.amount === 'number' && this.amount > 0;
        const is_valid_date = !isNaN(new Date(this.date).getTime());
        const is_valid_category = this.category.trim().length > 0;
        return is_valid_description && is_valid_amount && is_valid_date && is_valid_category;
    }
}

export const calculate_total_fees = (fees) => {
    return fees.reduce((total, fee) => total + fee.amount, 0);
};