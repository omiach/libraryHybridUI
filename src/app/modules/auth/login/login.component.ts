import { mainModule } from '../../../core/main.module';
import { AuthRequest } from '../resources/models/authRequest';
import { AuthInterface } from '../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../resources/store/auth.actions';
import * as AuthSelectors from '../resources/store/auth.selectors';
import { concatMap } from 'rxjs-compat/operator/concatMap';
import { AuthResult } from '../resources/models/authResult';
import { catchError, mergeMap, of, switchMap } from 'rxjs';


class LoginController {
    static $inject = ['authService','storeService'];
    authService:AuthInterface;
    storeService:Store;
    formData:AuthRequest = {
      name:'',
      password:''
    };

    constructor(authService, storeService) {
      this.authService = authService;
      this.storeService = storeService
    }

    $onInit = function() { 
      //this.userInfo$ = this.storeService.select(AuthSelectors.selectUser);
    };

    submitForm(){
      //this.storeService.dispatch(authActions.getCurrentUserInfoSuccess({user:{name:'TEST '}}))
      //this.storeService.dispatch(authActions.login({authRequest:this.formData}));
      //this.authService.logIn(this.formData);

      var tt = this.authService.logIn(this.formData).pipe(
        switchMap((result:AuthResult) => {
          if (result.succeeded)
          {
            this.authService.setTokens(result);
            return this.authService.getCurrentUserInfo().pipe
            (
              switchMap((user) => {
                this.storeService.dispatch(authActions.getCurrentUserInfoSuccess({user:user}))
                return of(true);
              })
            )            
          }
          else 
          {
            this.authService.logOut();  
            console.log('ERROR - ' + result.errors.toString());
            return of(false);
          }
        }),
        catchError((error) => {
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
              <div>USER NAME: {{ ($ctrl.userInfo$ | async:this).name }}</div>
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
  