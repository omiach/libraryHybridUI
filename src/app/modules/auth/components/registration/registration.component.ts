import { authModule } from '../../auth.module';
import { AuthInterface } from '../../resources/services/auth.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../resources/store/auth.actions';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { StateService } from '@uirouter/core';
import { RegistrationRequest } from '../../resources/models/registrationRequest';

class RegistrationController {
    static $inject = ['authService','store','$state'];
    authService:AuthInterface;
    store:Store;
    $state:StateService;
    registrationForm;
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
      this.initRegistration().subscribe();
    }

    initRegistration():Observable<void>{
      return this.authService.registration(this.formData).pipe(
        take(1),
        switchMap(responce => {
          if(responce.succeeded){          
            this.authService.setTokens(responce);
            return this.authService.getCurrentUserInfo().pipe(
              switchMap((user) => {
                this.store.dispatch(authActions.getCurrentUserInfoSuccess({user:user}));
                this.$state.go('books');
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
        <div ng-form="$ctrl.registrationForm">
          <div style="width: 400px;" >
            <div class="text-center">
              <h1>Registration</h1>
            </div>
            <div class="mb-3" >
              <label for="loginName" class="form-label">User name</label>
              <input type="input" name="name" class="form-control" id="loginName" ng-model="$ctrl.formData.name" required
                ng-class="{
                  'is-invalid':$ctrl.registrationForm.name.$invalid && !$ctrl.registrationForm.name.$pristine,
                  'is-valid':$ctrl.registrationForm.name.$valid && !$ctrl.registrationForm.name.$pristine
                }">
            </div>
            <div class="mb-3" >
              <label for="address" class="form-label">Address</label>
              <input type="input" name="address" class="form-control" id="address" ng-model="$ctrl.formData.address" required
                ng-class="{
                  'is-invalid':$ctrl.registrationForm.address.$invalid && !$ctrl.registrationForm.address.$pristine,
                  'is-valid':$ctrl.registrationForm.address.$valid && !$ctrl.registrationForm.address.$pristine
                }">
            </div>
            <div class="mb-3" >
              <label for="dateOfBirth" class="form-label">Date of birth</label>
              <input type="date" name="dateOfBirth" class="form-control" id="dateOfBirth" ng-model="$ctrl.formData.dateOfBirth" required
                ng-class="{
                  'is-invalid':$ctrl.registrationForm.dateOfBirth.$invalid && !$ctrl.registrationForm.dateOfBirth.$pristine,
                  'is-valid':$ctrl.registrationForm.dateOfBirth.$valid && !$ctrl.registrationForm.dateOfBirth.$pristine
                }">
            </div>
            <div class="mb-3" >
              <label for="phone" class="form-label">Phone</label>
              <input type="input" name="phone" class="form-control" id="phone" space  ui-mask="999-999-9999" ui-mask-placeholder-char="space" ng-model="$ctrl.formData.phone" required
                ng-class="{
                  'is-invalid':$ctrl.registrationForm.phone.$invalid && !$ctrl.registrationForm.phone.$pristine,
                  'is-valid':$ctrl.registrationForm.phone.$valid && !$ctrl.registrationForm.phone.$pristine
                }">
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" name="password" class="form-control" id="loginPassword" ng-model="$ctrl.formData.password" required
                ng-class="{
                  'is-invalid':$ctrl.registrationForm.password.$invalid && !$ctrl.registrationForm.password.$pristine,
                  'is-valid':$ctrl.registrationForm.password.$valid && !$ctrl.registrationForm.password.$pristine
                }">
            </div>
              <button type="submit" class="btn btn-primary w-100" ng-click="$ctrl.submitForm()" ng-disabled="$ctrl.registrationForm.$invalid">
                Register
              </button>
            </div>
      </div>
    </div>
    `
  };
  
  authModule.component('registration', registrationComponent);
  