import axios, { Axios } from 'axios';
import { ContactDTO } from '../classes/ContactDTO';
import { ContactTypeDTO } from '../classes/ContactTypeDto';
import { MessageHelper } from '../classes/MessageHelper';
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
            return response.data.obj;
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

    async createContact(contact: ContactDTO): Promise<MessageHelper> {
        try {
            const response = await axios.post('Contacts/', {
                Name: contact.name,
                Phone: contact.phone,
                TypeId: contact.typeId
            })
            return response.data;
        } catch (error) {
            const result = new MessageHelper();
            result.message = "Erro ao Criar";
            return result;
        }
    }

    async editContact(id: string, contact: ContactDTO) : Promise<MessageHelper> {
        try {
            const response = await axios.put('Contacts/' + id, {
                Id: contact.id,
                Name: contact.name,
                Phone: contact.phone,
                TypeId: contact.typeId
            })
            return response.data;
        } catch (error) {
            const result = new MessageHelper();
            result.message = "Erro ao Editar";
            return result;
        }
    }

    async deleteContact(id: string): Promise<Boolean> {
        try {
            await axios.delete('Contacts/' + id);
            return true;
        } catch (error) {
            return false;
        }
    }
}