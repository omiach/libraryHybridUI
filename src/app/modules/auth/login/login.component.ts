import { mainModule } from '../../../core/main.module';
import { AuthRequest } from '../resources/models/authRequest';
import { AuthInterface } from '../resources/services/auth.service';
import { Store } from '@ngrx/store';


class LoginController {
    static $inject = ['authService, storeService'];
    authService:AuthInterface;
    storeService:Store;
    formData:AuthRequest = {
      name:'',
      password:''
    };

    constructor(authService) {
      this.authService = authService;
    }

    $onInit = function() {   
    };

    submitForm(){
      //this.storeService.dispatch();
      this.authService.logIn(this.formData)
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
  