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
        return is_valid_description;
    }
}

export const calculate_total_fees = (fees) => {
    return fees.reduce((total, fee) => total + fee.amount, 0);
};