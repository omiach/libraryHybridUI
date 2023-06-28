import { mainModule } from '../../../../core/main.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';


class AlbumController {
    static $inject = ['store','$state'];
    store:Store;
    $state:StateService;

    constructor( store, $state) {
      this.store = store;
      this.$state = $state;
    }

    $onInit = function() { 
      
    };



}

const albumComponent = {
    controller: AlbumController,
    template:
    `
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </div>
      </div>
    </div>
    `
  };
  
  mainModule.component('album', albumComponent);
  