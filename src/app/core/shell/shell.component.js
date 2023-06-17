import { mainModule } from '../main.module';
/* import template from './shell.component.html'; */

class ShellController {
    //data
    //emailAddress;
    //isAuthenticated;
  
    //static $inject = ['AppConfig', 'AuthService', '$state'];
    constructor() { //AppConfig, public AuthService, public $state
      //this.emailAddress = AppConfig.emailAddress;
      //this.isAuthenticated = AuthService.isAuthenticated();
    }
  
/*     logout() {
      let {AuthService, $state} = this;
      AuthService.logout();
      return $state.go('welcome', {}, { reload: true });
    } */
}

const shellComponent = {
    controller: ShellController,
    template:
    `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Fifth navbar example">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Library</a>
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse" id="navbarsExample05" style="">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
          </ul>

          <p class="mb-0 text-light">--NAME--</p>
          <button class="btn btn-muted text-light">Register</button>  
          <button class="btn btn-muted text-light">Login</button>     
          <button class="btn btn-muted text-light">Log out</button>  
        </div>

      </div>
    </nav>
    <ui-view></ui-view>
    `
  };
  
  mainModule.component('shell', shellComponent);
  