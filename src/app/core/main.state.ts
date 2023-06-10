import { mainModule } from "./main.module";

const mainState = {
    name: 'app',
    url:"/",
    component: 'shell'
  };
  
/*   const homeState = {
    parent: 'app',
    name: 'home',
    url: '/home',
    component: 'home'
  }; */

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(mainState);
  //$stateProvider.state(homeState);
}]);
