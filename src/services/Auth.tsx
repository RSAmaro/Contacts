import { MessagingHelperObj } from "../classes/MessageHelper";
import { AuthDTO } from "../models/AuthDTO";
import { LoginDTO } from "../models/Login";
import { APIService } from "./Api";

export class AuthService{
    async Login(auth: LoginDTO): Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/auth/login`, {...auth},{
                withCredentials: true
            });
            return response.data
        }
        catch(error){
            return new MessagingHelperObj<AuthDTO | null>(false, "Erro ao fazer login", null);
        }
    }

    async Register(register: AuthDTO): Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/auth/register`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelperObj<AuthDTO| null>(false, "Erro ao criar a conta", null)
        }
    }

    async GetUser() : Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/auth/getUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelperObj<AuthDTO | null>(false, "Erro a buscar o user", null);
        }
    }

    async Logout() : Promise<MessagingHelperObj<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/auth/logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelperObj<any>(false, "Erro ao fazer logout", null);
        }
    }

}