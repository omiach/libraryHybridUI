import { mainModule } from "./main.module";

const mainState = {
    name: 'main',
    url: '',
    component: 'shell'
  };
  
mainModule.config(['$stateProvider', ($stateProvider) => {
$stateProvider.state(mainState);
}]);
