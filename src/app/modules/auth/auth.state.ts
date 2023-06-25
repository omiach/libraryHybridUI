import { mainModule } from "../../core/main.module";

  const loginState = {
    parent:'shell',
    name: 'login',
    url:'/login',
    component: 'login'
  }

  const registrationState = {
    parent:'shell',
    name: 'registration',
    url:'/registration',
    component: 'registration'
  }

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(loginState);
  $stateProvider.state(registrationState);
}]);
