import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { mainModule } from '../main.module';
import { Store } from '@ngrx/store';
import { User } from '../../modules/auth/resources/models/user';
import * as AuthSelectors from '../../modules/auth/resources/store/auth.selectors';
import { AuthService } from '../../modules/auth/resources/services/auth.service';
import * as authActions from '../../modules/auth/resources/store/auth.actions';

class ShellController {
    static $inject = ['store','authService'];
    store:Store;
    authService:AuthService;
    user$:Observable<User>;
    isLoggedIn$:Observable<boolean>;
    constructor(store, authService) { 
      this.store = store;
      this.authService = authService;
    }

    $onInit = function() { 
      this.user$ = this.store.select(AuthSelectors.selectUser);
      this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
      this.loginCheck();
    };

    public logOut(){
      this.authService.logOut();
    }
  
    loginCheck(){

      if (!this.authService.isAuthenticated()){
        return;
      }

      this.initUserInfo().subscribe();
      
    }

    initUserInfo():Observable<null>{
      return this.authService.getCurrentUserInfo().pipe(
        take(1),
        switchMap((user) => {
          this.store.dispatch(authActions.getCurrentUserInfoSuccess({user:user}));
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
}

const shellComponent = {
    controller: ShellController,
    template:
    `<div class="flex-fill d-flex flex-column bg-light overflow-hidden"> 
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
        <div class="container-fluid">
          <a class="navbar-brand" ui-sref="shell">Library</a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>



          <div class="navbar-collapse collapse" id="navbarsExample05" style="">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" ui-sref="books">Books</a>
              </li>
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

      <ui-view flex-fill align-items-stretch d-flex flex-fill-child align-items-stretch-child d-flex-child></ui-view>
    </div>
    `
  };
  
  mainModule.component('shell', shellComponent);
  