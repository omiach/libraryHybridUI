//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';


class BookCardController {
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

const bookCardComponent = {
    controller: BookCardController,
    template:
    `
    <div class="col">
      <div class="card shadow-sm">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        <div class="card-body">
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">Reserv</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Return</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
        </div>
      </div>
    </div>
    `
  };
  
  booksModule.component('bookCard', bookCardComponent);
  