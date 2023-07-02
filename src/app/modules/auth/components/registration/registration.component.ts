import { authModule } from '../../auth.module';
import { AuthInterface } from '../../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../resources/store/auth.actions';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { StateService } from '@uirouter/core';
import { RegistrationRequest } from '../../resources/models/registrationRequest';

class RegistrationController {
    static $inject = ['authService','store','$state'];
    registration$:Observable<void>;
    authService:AuthInterface;
    store:Store;
    $state:StateService;
    formData:RegistrationRequest = {
      name:'',
      address:'',
      dateOfBirth:null,
      phone:0,
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
      this.initRegistration();
      this.registration$.subscribe();
    }

    initRegistration(){
      this.registration$ = this.authService.registration(this.formData).pipe(
        take(1),
        switchMap(responce => {
          if(responce.succeeded){          
            this.authService.setTokens(responce);
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
            this.store.dispatch(authActions.loginFailure({error: responce.errors}));
            alert('ERROR - ' + responce.errors.toString());
            return of();     
          }
        }),
        catchError((error) => {
          alert('ERROR - ' + error?.error?.errors.toString());   
          return of();
        })
      );
    }
}

const registrationComponent = {
    controller: RegistrationController,
    template:
    `<div class="flex-fill conteiner d-flex justify-content-center align-items-center" >  
        <form>
          <div style="width: 400px;">
            <div class="text-center">
              <h1>Registration</h1>
            </div>
            <div class="mb-3" >
              <label for="loginName" class="form-label">User name</label>
              <input type="input" class="form-control" id="loginName" ng-model="$ctrl.formData.name">
            </div>
            <div class="mb-3" >
              <label for="address" class="form-label">Address</label>
              <input type="input" class="form-control" id="address" ng-model="$ctrl.formData.address">
            </div>
            <div class="mb-3" >
              <label for="dateOfBirth" class="form-label">Date of birth</label>
              <input type="date" class="form-control" id="dateOfBirth" ng-model="$ctrl.formData.dateOfBirth">
            </div>
            <div class="mb-3" >
              <label for="phone" class="form-label">Phone</label>
              <input type="input" class="form-control" id="phone" space  ui-mask="999-999-9999" ui-mask-placeholder-char="space" ng-model="$ctrl.formData.phone">
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" ng-model="$ctrl.formData.password">
            </div>
              <button type="submit" class="btn btn-primary w-100" ng-click="$ctrl.submitForm()">Register</button>
            </div>
      </form>

    </div>
    `
  };
  
  authModule.component('registration', registrationComponent);
  