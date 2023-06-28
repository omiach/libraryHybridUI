//import { mainModule } from '../../../../core/main.module';
import { albumModule } from '../../album.module';
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
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xl-4 g-3">
          <div class="col text-light"> <div class="bg-black" m-2>1</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>2</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>3</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>4</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>5</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>6</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>7</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>8</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>9</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>10</div>  </div>
          <div class="col text-light"> <div class="bg-black" m-2>11</div>  </div>
        </div>
      </div>
    </div>
    `
  };
  
  albumModule.component('album', albumComponent);
  