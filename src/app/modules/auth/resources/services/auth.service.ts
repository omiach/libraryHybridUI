import { authConstantsInterface } from "../../../../shared/constants/constants";
import { AuthResult } from "../models/authResult";
import { AuthRequest } from "../models/authRequest";


export class AuthService  {
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

    logIn(loginResult:AuthResult){
        localStorage.setItem(this.authConstants.ACCES_TOKEN_KEY, loginResult.token);
        localStorage.setItem(this.authConstants.REFRESH_TOKEN_KEY, loginResult.refreshToken);
    }

    logOut(){
        localStorage.removeItem(this.authConstants.ACCES_TOKEN_KEY);
        localStorage.removeItem(this.authConstants.REFRESH_TOKEN_KEY);
    }

    authenticate(authRequest:AuthRequest){
        if(this.mockUsers.find(x => x.name === authRequest.name && x.password === authRequest.password)){
            this.logIn({token:'token', refreshToken:'refreshToken',succeeded:true,twoFactorCodeRequired:false,errors:[]});
        }
        else{
            this.logOut();
        }
    }

    generateMockUsers(){
        this.mockUsers = [
            {name:'admin',password:'admin'},
            {name:'user1',password:'user1'},
            {name:'user2',password:'user2'},
            {name:'user3',password:'user3'},
            {name:'user4',password:'user4'},
        ];
    }

}
