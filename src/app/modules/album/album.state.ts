import { albumModule } from "./album.module";

  const albumState = {
    parent:'shell',
    name: 'album',
    url:'/album',
    component: 'album'
  }

albumModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(albumState);
}]);
