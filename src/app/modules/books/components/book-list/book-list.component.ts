import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';


class BookListController {
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

const bookListComponent = {
    controller: BookListController,
    template:
    `
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xl-4 g-3">
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
          <book-card></book-card>
        </div>
      </div>
    </div>
    `
  };
  
  booksModule.component('bookList', bookListComponent);
  