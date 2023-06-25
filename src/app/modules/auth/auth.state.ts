import { mainModule } from "../../core/main.module";

  const loginState = {
    parent:'shell',
    name: 'login',
    url:'/login',
    component: 'login'
  }

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(loginState);
}]);
