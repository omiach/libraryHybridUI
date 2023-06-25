import { authConstantsInterface } from "../../../../shared/constants/constants";
import { AuthResult } from "../models/authResult";
import { AuthRequest } from "../models/authRequest";
import { Observable, of } from "rxjs";
import { User } from "../models/user";
import { Store } from "@ngrx/store";
import * as authActions from '../store/auth.actions';


export class AuthService implements AuthInterface  {
    static $inject = ['authConstants','store'];
    authConstants:authConstantsInterface;
    mockUsers:AuthRequest[];
    store:Store;

    constructor(authConstants, store) {
        this.authConstants = authConstants;
        this.store = store;
        this.generateMockUsers();
    }

    isAuthenticated(){
        return !!localStorage.getItem(this.authConstants.ACCES_TOKEN_KEY) && !!localStorage.getItem(this.authConstants.REFRESH_TOKEN_KEY);
    }

    setTokens(authResult:AuthResult){
        localStorage.setItem(this.authConstants.ACCES_TOKEN_KEY, authResult.token);
        localStorage.setItem(this.authConstants.REFRESH_TOKEN_KEY, authResult.refreshToken);
        this.store.dispatch(authActions.loginSuccess({authResult:authResult}));
    }

    logOut(){
        localStorage.removeItem(this.authConstants.ACCES_TOKEN_KEY);
        localStorage.removeItem(this.authConstants.REFRESH_TOKEN_KEY);
        this.store.dispatch(authActions.logout());
    }

    logIn(authRequest:AuthRequest):Observable<AuthResult>{
        if(this.mockUsers.find(x => x.name === authRequest.name && x.password === authRequest.password)){
            return of({token:authRequest.name, refreshToken:authRequest.name + '_refreshToken',succeeded:true,errors:[]});
        } 
        else{
            return of({token:'', refreshToken:'',succeeded:false,errors:['Mock error']});                
        }
    }

    getCurrentUserInfo():Observable<User>{
        const users = JSON.parse(localStorage.getItem('mockUsers')) as User[];
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
