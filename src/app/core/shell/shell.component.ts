import { Observable } from 'rxjs';
import { mainModule } from '../main.module';
import { Store } from '@ngrx/store';
import { User } from '../../modules/auth/resources/models/user';
import * as AuthSelectors from '../../modules/auth/resources/store/auth.selectors';
import { AuthService } from '../../modules/auth/resources/services/auth.service';

class ShellController {
    static $inject = ['store','authService'];
    store:Store;
    authService:AuthService;
    user$:Observable<User>;
    isLoggedIn$:Observable<boolean>;
    constructor(store, authService) { 
      this.store = store;
      this.authService = authService;

      this.user$ = this.store.select(AuthSelectors.selectUser);
      this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    }

    public logOut(){
      this.authService.logOut();
    }
  
}

const shellComponent = {
    controller: ShellController,
    template:
    `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Fifth navbar example">
      <div class="container-fluid">
        <a class="navbar-brand" ui-sref="shell">Library</a>
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse" id="navbarsExample05" style="">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li> -->
          </ul>

          <div
            ng-if="($ctrl.user$ | async:this) !== null"
            class="text-light d-flex align-items-center me-5">
              Hello: {{($ctrl.user$ | async:this).name}} !
          </div>

          <div 
            ng-if="!($ctrl.isLoggedIn$ | async:this)"
            class="d-flex px-6 ms-20">
            <a ui-sref="registration"
              class="btn btn-muted text-light">
                Register
            </a>  
            <a ui-sref="login" class="btn btn-muted text-light">Login</a>    
          </div>

          <button 
            ng-if="($ctrl.isLoggedIn$ | async:this)"
            ng-click=$ctrl.logOut();
            class="btn btn-muted text-light">
              Log out
          </button>  

        </div>

      </div>
    </nav>
    <ui-view></ui-view>
    `
  };
  
  mainModule.component('shell', shellComponent);
  