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
    <h1 class="text-3xl font-bold underline">
    Hello world!
    </h1>
    <ui-view></ui-view>
    `
  };
  
  mainModule.component('shell', shellComponent);
  