import { mainModule } from "../main.module";

const mainState = {
    parent: 'app',
    name: 'shell',
    url:"/",
    component: 'shell',
    data: {
      requiresAuth:true
    }
  };
  
mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(mainState);
}]);
