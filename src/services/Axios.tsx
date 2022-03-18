import axios, { Axios } from 'axios';
import { Contact } from '../interfaces/Contact';

export class Api extends Axios {

    public count: number = 0;
    
    constructor() {
        super()
        axios.defaults.baseURL = 'https://localhost:7081/api/Contacts/';
    }

    async getRows(page: number, items: number, sort: string): Promise<Contact[]> {
        try {
            const response = await axios.get(`List?page=${page}&itemsperpage=${items}&sort=${sort}`);
            this.count = response.data.totalCount;
            return response.data.results;
        } catch (error) {
            return [];
        }
    }

    editRows(id: any) {
        return this.put(`${id}`)
    }
}