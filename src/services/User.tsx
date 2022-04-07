import { MessagingHelperObj } from "../classes/MessageHelper";
import { ForgotPasswordDTO } from "../models/ForgotPasswordDTO";
import { ResetPasswordDTO } from "../models/ResetPassword";
import { APIService } from "./Api";

export class UserService{

    async ForgotPassword(email: ForgotPasswordDTO) : Promise<MessagingHelperObj<null>>{
        try{
            var result = await APIService.Axios().post(`${APIService.GetURL()}/User/ForgotPassword`,{email: email.email});
            return result.data
        }catch(error){
            return new MessagingHelperObj(false, "Error connecting to API", null);
        }
    }   

    async ResetPassword(reset: ResetPasswordDTO) : Promise<MessagingHelperObj<null>>{
        try{
            var result = await APIService.Axios().post(`${APIService.GetURL()}/User/ResetPassword`,{...reset},{
                withCredentials: true
            });
            return result.data;
        }catch(error){
            return new MessagingHelperObj(false, "Error connecting to API", null);
        }
    }
}