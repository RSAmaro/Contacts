import axios, {AxiosInstance} from "axios";
import { AuthService } from "./Auth";

class APIServiceClass {
    private url: string  = "https://localhost:7081/api";
    private token: string | null = null;
    private instance = axios.create();
    private authService = new AuthService();

    constructor(){
        var service = this.authService;
        this.instance.interceptors.response.use(function (response){
            return response
        }, function(error){
            if(error.response.status === 401){
                service.Logout();
                window.location.href = "/login";
            }
            return Promise.reject(error);
        })
    }

    GetURL(): string{
        return this.url
    }
    SetToken(token: string | null){
        this.token = token;
    }
    GetToken(): string{
        return this.token?? "";
    }

    Axios(): AxiosInstance{
        return this.instance;
    }
}

export const APIService = new APIServiceClass();