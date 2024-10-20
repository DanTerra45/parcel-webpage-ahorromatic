export class StorageService {
    constructor(storage_key = 'ahorromatic_data') {
        this.storage_key = storage_key;
        this.initialize_storage();
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

    get_incomes() {
        return this.get_data().incomes;
    }

    get_fees() {
        return this.get_data().fees;
    }

    delete_income(index) {
        const data = this.get_data();
        data.incomes.splice(index, 1);
        this.save_data(data);
    }
}