import { mainModule } from "../../core/main.module";

  const albumState = {
    parent:'shell',
    name: 'album',
    url:'/album',
    component: 'album'
  }

mainModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(albumState);
}]);
