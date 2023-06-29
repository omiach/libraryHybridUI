import { AuthConstantsInterface, MocksKeys } from "../../../../shared/constants/constants";
import { AuthResult } from "../models/authResult";
import { AuthRequest } from "../models/authRequest";
import { Observable, of } from "rxjs";
import { User } from "../models/user";
import { Store } from "@ngrx/store";
import * as authActions from '../store/auth.actions';
import { RegistrationRequest } from "../models/registrationRequest";


export class AuthService implements AuthInterface  {
    static $inject = ['store','authConstants','mocksConstants'];
    authConstants:AuthConstantsInterface;
    mocksKeys:MocksKeys;
    store:Store;

    constructor(store, authConstants, mocksConstants) {
        this.authConstants = authConstants;
        this.store = store;
        this.mocksKeys = mocksConstants;
        const users = JSON.parse(localStorage.getItem(this.mocksKeys.USERS)) as User[];
        if (!users || users.length === 0){
            this.generateMockUsers();
        }
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

        const responce:AuthResult = {
            token:'',
            refreshToken:'',
            succeeded:false,
            errors:[]
        }

        const users = JSON.parse(localStorage.getItem(this.mocksKeys.USERS)) as User[];

        if(users.find(x => x.name === authRequest.name && x.password === authRequest.password)){
            return of({...responce, token:authRequest.name, refreshToken:authRequest.name + '_refreshToken', succeeded:true});
        } 
        else{
            return of({...responce, errors:['Wrong password']});                
        }
    }

    registration(registrationRequest:RegistrationRequest):Observable<AuthResult>{

        const responce:AuthResult = {
            token:'',
            refreshToken:'',
            succeeded:false,
            errors:[]
        }

        let users = JSON.parse(localStorage.getItem(this.mocksKeys.USERS)) as User[];

        if(users.find(x => x.name === registrationRequest.name)){
            return of({...responce, errors:['User exist']});
        }
        
        users.push({...registrationRequest});
        localStorage.setItem(this.mocksKeys.USERS, JSON.stringify(users));

        return of({...responce, token:registrationRequest.name, refreshToken:registrationRequest.name+'_refreshToken', succeeded:true});
    }

    getCurrentUserInfo():Observable<User>{
        const users = JSON.parse(localStorage.getItem(this.mocksKeys.USERS)) as User[];
        const token = localStorage.getItem(this.authConstants.ACCES_TOKEN_KEY);
        return of(users.find(x => x.name === token))
    }

    generateMockUsers(){
        const users:User[] = [
            {name:'admin',address:'Address 1', dateOfBirth :new Date(1980,1,1),phone:380971111111,password:'admin'},
            {name:'user1',address:'Address 2', dateOfBirth :new Date(1981,1,1),phone:380971111112,password:'user1'},
            {name:'user2',address:'Address 3', dateOfBirth :new Date(1982,1,1),phone:380971111113,password:'user2'},
            {name:'user3',address:'Address 4', dateOfBirth :new Date(1983,1,1),phone:380971111114,password:'user3'},
            {name:'user4',address:'Address 5', dateOfBirth :new Date(1984,1,1),phone:380971111115,password:'user4'},
        ];
        localStorage.setItem('mockUsers', JSON.stringify(users));
    }

}

export interface AuthInterface{
    isAuthenticated();
    logOut();
    logIn(authRequest:AuthRequest):Observable<AuthResult>;
    setTokens(authResult:AuthResult);
    getCurrentUserInfo():Observable<User>;
    registration(registrationRequest:RegistrationRequest):Observable<AuthResult>;
}
