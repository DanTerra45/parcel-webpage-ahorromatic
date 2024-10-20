export class StorageService {
    constructor(storage_key = 'ahorromatic_data') {
        this.storage_key = storage_key;
        this.initialize_storage();
    }
}