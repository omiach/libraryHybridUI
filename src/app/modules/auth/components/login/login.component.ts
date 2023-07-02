import { authModule } from '../../auth.module';
import { AuthRequest } from '../../resources/models/authRequest';
import { AuthInterface } from '../../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../resources/store/auth.actions';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { StateService } from '@uirouter/core';


class LoginController {
    static $inject = ['authService','store','$state'];
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
      this.initLogin().subscribe();
    }

    initLogin():Observable<null>{
      return this.authService.logIn(this.formData).pipe(
        take(1),
        switchMap((result) => {
          if (result.succeeded){
            this.authService.setTokens(result);
            return this.authService.getCurrentUserInfo().pipe(
              switchMap((user) => {
                this.store.dispatch(authActions.getCurrentUserInfoSuccess({user:user}));
                this.$state.go('shell');
                return of();
              }),
              catchError((error) => {
                this.authService.logOut();
                this.store.dispatch(authActions.getCurrentUserInfoFailure({error: error?.error?.errors}));
                alert('ERROR - ' + error?.error?.errors.toString());
                return of();
              })
            )            
          }
          else{
            this.authService.logOut();  
            this.store.dispatch(authActions.loginFailure({error: result.errors}));
            alert('ERROR - ' + result.errors.toString());
            return of();
          }
        }),
        catchError((error) => {
          this.authService.logOut();      
          this.store.dispatch(authActions.loginFailure({error: error?.error?.errors}));     
          alert('ERROR - ' + error?.error?.errors.toString()); 
          return of();
        })
      );
    }
}

const loginComponent = {
    controller: LoginController,
    template:
    `
    <div class="flex-fill conteiner d-flex justify-content-center align-items-center">
      <form>
        <div style="width: 400px;">
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
  
  authModule.component('login', loginComponent);
  