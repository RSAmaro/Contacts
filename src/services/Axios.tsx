import axios, { Axios } from 'axios';
import { ContactDTO } from '../models/ContactDTO';
import { ContactTypeDTO } from '../models/ContactTypeDto';
import { MessageHelper, MessagingHelperObj } from '../classes/MessageHelper';
import { Contact } from '../interfaces/Contact';
import { ContactType } from '../interfaces/ContactType';
import { LoginDTO } from '../models/Login';
import { AuthDTO } from '../models/AuthDTO';
import { APIService } from './Api';

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
            },{
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + APIService.GetToken()
                }
            }
            )
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
            result.message = "Erro ao Criar, certifique-se que todos os campos estão preenchidos!";
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
            result.message = "Erro ao Editar, certifique-se que todos os campos estão preenchidos!";
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

    async getTypeRows(page: number, items: number, sort: string, q: string, params: string[]): Promise<ContactType[]> {
        try {
            //const response = await axios.get(`List?page=${page}&itemsperpage=${items}&sort=${sort}`);
            const response = await axios.post('ContactType/List', {
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

    async createType(contact: ContactTypeDTO): Promise<MessageHelper> {
        try {
            const response = await axios.post('ContactType/', {
                Name: contact.name,
            })
            return response.data;
        } catch (error) {
            const result = new MessageHelper();
            result.message = "Erro ao Criar, certifique-se que todos os campos estão preenchidos!";
            return result;
        }
    }

    async editType(id: string, type: ContactTypeDTO) : Promise<MessageHelper> {
        try {
            const response = await axios.put('ContactType/' + id, {
                Id: type.id,
                Name: type.name,
            })
            return response.data;
        } catch (error) {
            const result = new MessageHelper();
            result.message = "Erro ao Editar, certifique-se que todos os campos estão preenchidos!";
            return result;
        }
    }

    async getTypeById(id: string): Promise<ContactTypeDTO> {
        try {
            const response = await axios.get('ContactType/' + id);
            return response.data.obj;
        } catch (error) {
            return new ContactTypeDTO();
        }
    }

    async loginUser(auth: LoginDTO): Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await axios.post(`Auth/login`, {...auth},{
                withCredentials: true
            });
            return response.data
        }
        catch(error){
            return new MessagingHelperObj<AuthDTO | null>(false, "Erro ao fazer login", null);
        }
    }

    async createUser(register: AuthDTO): Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await axios.post(`Auth/register`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelperObj<AuthDTO| null>(false, "Erro ao criar a conta", null)
        }
    }

    async getUser(): Promise<MessagingHelperObj<AuthDTO | null>> {
        try {
            var response = await axios.get(`User/Login`, {
                withCredentials: true
            });
            return response.data;

        } catch (error) {
            return new MessagingHelperObj<AuthDTO | null>(false, "Error finding user!", null);
        }
    }
}