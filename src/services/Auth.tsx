import { MessagingHelperObj } from "../classes/MessageHelper";
import { AuthDTO } from "../models/AuthDTO";
import { ConfirmDTO } from "../models/ConfirmDTO";
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
            return new MessagingHelperObj<AuthDTO | null>(false, "Couldn't connect to the API!", null);
        }
    }

    async Register(register: AuthDTO): Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/auth/register`, {...register});
            return response.data;
        }catch(error){
            return new MessagingHelperObj<AuthDTO| null>(false, "Couldn't connect to the API!", null)
        }
    }

    async GetUser() : Promise<MessagingHelperObj<AuthDTO | null>>{
        try{
            var response = await APIService.Axios().get(`${APIService.GetURL()}/auth/getUser`,{
                withCredentials: true
            });
            return response.data;

        }catch(error){
            return new MessagingHelperObj<AuthDTO | null>(false, "Couldn't connect to the API!", null);
        }
    }

    async Logout() : Promise<MessagingHelperObj<any>>{
        try{
            var response = await APIService.Axios().post(`${APIService.GetURL()}/auth/logout`,{},{
                withCredentials: true
            });
            return response.data;
        }catch(error){
            return new MessagingHelperObj<any>(false, "Couldn't connect to the API!", null);
        }
    }

    async ConfirmEmail(confirm: ConfirmDTO) : Promise<MessagingHelperObj<null>>{
        try{
            var result = await APIService.Axios().post(`${APIService.GetURL()}/Auth/ConfirmEmail`,{...confirm},{
                withCredentials: true
            });
            return result.data;
        }catch(error){
            return new MessagingHelperObj(false, "Error connecting to API", null);
        }
    }
}