export interface RegistrationRequest {
    name: string;
    address:string;
    dateOfBirth:Date | null;
    phone:number;
    password: string;
}
