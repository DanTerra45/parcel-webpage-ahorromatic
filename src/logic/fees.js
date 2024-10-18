export class Fee {
    constructor(description, amount, date, category) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.type = 'fee';
    }
}

export const calculate_total_fees = (fees) => {
    return fees.reduce((total, fee) => total + fee.amount, 0);
};