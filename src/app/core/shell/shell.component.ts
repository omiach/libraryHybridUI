import { mainModule } from '../main.module';

class ShellController {
    //data
    //emailAddress;
    //isAuthenticated;
  
    //static $inject = ['AppConfig', 'AuthService', '$state'];
    constructor(AppConfig, public AuthService, public $state) {
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
    templateUrl: './shell.component.html'
  };
  
  mainModule.component('shell', shellComponent);
  