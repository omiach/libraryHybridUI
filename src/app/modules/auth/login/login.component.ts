import { mainModule } from '../../../core/main.module';
import { AuthRequest } from '../resources/models/authRequest';
import { AuthInterface } from '../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../resources/store/auth.actions';
import * as AuthSelectors from '../resources/store/auth.selectors';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { User } from '../resources/models/user';


class LoginController {
    static $inject = ['authService','storeService'];
    user$:Observable<User>;
    login$:Observable<boolean>;
    authService!:AuthInterface;
    storeService!:Store;
    formData:AuthRequest = {
      name:'',
      password:''
    };

    constructor(authService, storeService) {
      this.authService = authService;
      this.storeService = storeService;
    }

    $onInit = function() { 
      
    };

    submitForm(){
      this.initLogin();
      this.login$.subscribe();
    }

    initLogin(){
      this.user$ = this.storeService.select(AuthSelectors.selectUser);
      this.login$ = this.authService.logIn(this.formData).pipe(
        switchMap((result) => {
          if (result.succeeded){
            this.authService.setTokens(result);
            this.storeService.dispatch(authActions.loginSuccess({authResult:result}));
            return this.authService.getCurrentUserInfo().pipe(
              switchMap((user) => {
                this.storeService.dispatch(authActions.getCurrentUserInfoSuccess({user:user}))
                return of(true);
              }),
              catchError((error) => {
                this.authService.logOut();
                this.storeService.dispatch(authActions.getCurrentUserInfoFailure({error: error?.error?.errors}));
                console.log('ERROR - ' + error?.error?.errors.toString());
                return of(false);
              })
            )            
          }
          else{
            this.authService.logOut();  
            this.storeService.dispatch(authActions.loginFailure({error: result.errors}));
            console.log('ERROR - ' + result.errors.toString());
            return of(false);
          }
        }),
        catchError((error) => {
          this.authService.logOut();      
          this.storeService.dispatch(authActions.loginFailure({error: error?.error?.errors}));     
          console.log('ERROR - ' + error?.error?.errors.toString()); 
          return of(false);
        })
      );
    }
}

const loginComponent = {
    controller: LoginController,
    template:
    `<div class="h-100 conteiner d-flex justify-content-center align-items-center" >
        
        <form>
          <div style="width: 400px;" d-flex justify-content-center align-items-center>
            <div class="text-center">
              <h1>Library</h1>
              <div ng-if="$ctrl.user$ !== undefine">USER NAME: {{ ($ctrl.user$ | async:this).name }}</div>
            </div>
            <div class="mb-3" >
              <label for="loginName" class="form-label">User name</label>
              <input type="input" class="form-control" id="loginName" ng-model="$ctrl.formData.name">
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" ng-model="$ctrl.formData.password">
            </div>
              <button type="submit" class="btn btn-primary w-100" ng-click="$ctrl.submitForm()">Submit</button>
            </div>
      </form>

    </div>
    `
  };
  
  mainModule.component('login', loginComponent);
  