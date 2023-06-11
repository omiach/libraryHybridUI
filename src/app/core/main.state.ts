import { mainModule } from "./main.module";

const appState = {
  name: 'app',
  component: 'app'
}

/* const mainState = {
    parent: 'app',
    name: 'shell',
    url:"/",
    templateUrl:'./shell/shell.component.html',
    component: 'shell'
  }; */
  
/*   const loginState = {
    name: 'login',
    url:'/login',
    templateUrl:'',
    component: 'login'
  }
 */

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(appState);
  //$stateProvider.state(mainState);
  //$stateProvider.state(loginState);
}]);
