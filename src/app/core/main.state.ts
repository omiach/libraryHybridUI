import { mainModule } from "./main.module";

const appState = {
  name: 'app',
  component: 'app'
}

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(appState);
}]);
