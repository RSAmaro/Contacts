export class MessageHelper {
    success: boolean = false;
    message: string = "";
    obj: any | null;
}

export class MessagingHelperObj<T>{
    success: boolean;
    message: string;
    obj: T;
    constructor(success: boolean, message: string, obj: T){
        this.success = success;
        this.message = message;
        this.obj = obj;
    }
}
