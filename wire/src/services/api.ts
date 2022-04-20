import axios from "axios";


/**
 * Singleton  SearchClass to get package data from the api code
 */
class PackageClass {
    private static instance: PackageClass;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PackageClass()
        }
        return this.instance;
    }

    private async get(endpoint: string, options = {}) {
        return await axios.get(`${endpoint}`, options);
    }

    public async searchPacakage(endpoint: string) {
        return await this.get(endpoint);
    }

}

const PackageService = PackageClass.getInstance()
export default PackageService;