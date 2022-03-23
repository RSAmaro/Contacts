import axios, { Axios } from 'axios';
import { ContactDTO } from '../classes/ContactDTO';
import { ContactTypeDTO } from '../classes/ContactTypeDto';
import { Contact } from '../interfaces/Contact';

export class Api extends Axios {

    public count: number = 0;
    
    constructor() {
        super()
        axios.defaults.baseURL = 'https://localhost:7081/api/';
    }

    async getRows(page: number, items: number, sort: string, q: string, params: string[]): Promise<Contact[]> {
        try {
            //const response = await axios.get(`List?page=${page}&itemsperpage=${items}&sort=${sort}`);
            const response = await axios.post('Contacts/List', {
                page: page,
                itemsperpage: items,
                sort: sort,
                qry: q,
                qryParam: params
            })
            this.count = response.data.totalCount;
            return response.data.results;
        } catch (error) {
            return [];
        }
    }

    async getById(id: string): Promise<ContactDTO> {
        try {
            const response = await axios.get('Contacts/' + id);
            return response.data;
        } catch (error) {
            return new ContactDTO();
        }
    }

    async getTypes(): Promise<ContactTypeDTO[]>{
        try {
            const response = await axios.get('ContactType/');
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async createContact(contact: ContactDTO): Promise<Boolean> {
        try {
            await axios.post('Contacts/', {
                Name: contact.name,
                Phone: contact.phone,
                TypeId: contact.typeId
            })
            
            return true;
        } catch (error) {
            return false;
        }
    }

    async editContact(id: string, contact: ContactDTO) {
        try {
            const response = await axios.put('Contacts/' + id, {
                Id: contact.id,
                Name: contact.name,
                Phone: contact.phone,
                TypeId: contact.typeId
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }
}