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
}