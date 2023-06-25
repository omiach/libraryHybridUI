import { mainModule } from '../../../../core/main.module';
import { AuthRequest } from '../../resources/models/authRequest';
import { AuthInterface } from '../../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../resources/store/auth.actions';
import * as AuthSelectors from '../../resources/store/auth.selectors';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { User } from '../../resources/models/user';
import { StateService } from '@uirouter/core';


class LoginController {
    static $inject = ['authService','store','$state'];
    user$:Observable<User>;
    login$:Observable<boolean>;
    authService:AuthInterface;
    store:Store;
    $state:StateService;
    formData:AuthRequest = {
      name:'',
      password:''
    };

    constructor(authService, store, $state) {
      this.authService = authService;
      this.store = store;
      this.$state = $state;
    }

    $onInit = function() { 
      
    };

    submitForm(){
      this.initLogin();
      this.login$.subscribe();
    }

    initLogin(){
      this.user$ = this.store.select(AuthSelectors.selectUser);
      this.login$ = this.authService.logIn(this.formData).pipe(
        take(1),
        switchMap((result) => {
          if (result.succeeded){
            this.authService.setTokens(result);
            return this.authService.getCurrentUserInfo().pipe(
              switchMap((user) => {
                this.store.dispatch(authActions.getCurrentUserInfoSuccess({user:user}));
                this.$state.go('shell');
                return of(true);
              }),
              catchError((error) => {
                this.authService.logOut();
                this.store.dispatch(authActions.getCurrentUserInfoFailure({error: error?.error?.errors}));
                console.log('ERROR - ' + error?.error?.errors.toString());
                return of(false);
              })
            )            
          }
          else{
            this.authService.logOut();  
            this.store.dispatch(authActions.loginFailure({error: result.errors}));
            console.log('ERROR - ' + result.errors.toString());
            return of(false);
          }
        }),
        catchError((error) => {
          this.authService.logOut();      
          this.store.dispatch(authActions.loginFailure({error: error?.error?.errors}));     
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
  