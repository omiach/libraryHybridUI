import { authConstantsInterface } from "../../../../shared/constants/constants";
import { AuthResult } from "../models/authResult";
import { AuthRequest } from "../models/authRequest";
import { Observable, of } from "rxjs";
import { User } from "../models/user";


export class AuthService implements AuthInterface  {
    static $inject = ['authConstants'];
    authConstants:authConstantsInterface;
    mockUsers:AuthRequest[];

    constructor(authConstants) {
        this.authConstants = authConstants;
        this.generateMockUsers();
    }

    isAuthenticated(){
        return !!localStorage.getItem(this.authConstants.ACCES_TOKEN_KEY) && !!localStorage.getItem(this.authConstants.REFRESH_TOKEN_KEY);
    }

    setTokens(loginResult:AuthResult){
        localStorage.setItem(this.authConstants.ACCES_TOKEN_KEY, loginResult.token);
        localStorage.setItem(this.authConstants.REFRESH_TOKEN_KEY, loginResult.refreshToken);
    }

    logOut(){
        localStorage.removeItem(this.authConstants.ACCES_TOKEN_KEY);
        localStorage.removeItem(this.authConstants.REFRESH_TOKEN_KEY);
    }

    logIn(authRequest:AuthRequest):Observable<AuthResult>{
/*         if(this.mockUsers.find(x => x.name === authRequest.name && x.password === authRequest.password)){
            this.setTokens({token:'token', refreshToken:'refreshToken',succeeded:true,twoFactorCodeRequired:false,errors:[]});
        }
        else{
            this.logOut();
        } */
        console.log('this.mockUsers');
        console.log(this.mockUsers);
        console.log(authRequest.name);
        if(this.mockUsers.find(x => x.name === authRequest.name && x.password === authRequest.password)){
            return of({token:authRequest.name, refreshToken:authRequest.name + '_refreshToken',succeeded:true,errors:[]});
        } 
        else{
            return of({token:'', refreshToken:'',succeeded:false,errors:['Mock error']});                
        }
    }

    getCurrentUserInfo():Observable<User>{
        const users = JSON.parse(localStorage.getItem('mockUsers')) as User[];
        console.log('users');
        console.log(users);
        const token = localStorage.getItem(this.authConstants.ACCES_TOKEN_KEY);
        return of(users.find(x => x.name === token))
    }

    generateMockUsers(){
        this.mockUsers = [
            {name:'admin',password:'admin'},
            {name:'user1',password:'user1'},
            {name:'user2',password:'user2'},
            {name:'user3',password:'user3'},
            {name:'user4',password:'user4'},
        ];
        localStorage.setItem('mockUsers', JSON.stringify(this.mockUsers));
    }

}

export interface AuthInterface{
    isAuthenticated();
    logOut();
    logIn(authRequest:AuthRequest):Observable<AuthResult>;
    setTokens(loginResult:AuthResult);
    getCurrentUserInfo():Observable<User>;
}
