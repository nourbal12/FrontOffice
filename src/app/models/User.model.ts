export interface data {

    token: string;
    userInfo: Object;
    
}
export interface User{
    user_id:any,
    name:string,
    email:string,
    password:string,
    data:data,
    userInfo:string
}

export class Client {
    id:number;
    name:string;
    email:string;
    password:string;  
}