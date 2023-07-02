import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { Book } from '../../resources/models/book';
import * as BooksSelectors from '../../resources/store/books.selectors';
import * as BooksActions from '../../resources/store/books.actions';
import { BooksService, BooksServiceInterface } from '../../resources/services/books.service';


class BookListController {
    static $inject = ['store','$state','booksService'];
    store:Store;
    $state:StateService;
    booksService:BooksService;
    books$:Observable<Book[]>;


    constructor( store, $state,booksService) {
      this.store = store;
      this.$state = $state;
      this.booksService = booksService;
    }

    $onInit = function() { 
      this.books$ = this.store.select(BooksSelectors.selectBooks);
      this.initBooks().subscribe();
    };

    initBooks():Observable<never>{ 

      return this.booksService.getBooks().pipe(
        take(1),
        switchMap((responce) => {
          if(responce.success){
            this.store.dispatch(BooksActions.getBooksSuccess({books: responce.data}));
          }
          else{
            this.store.dispatch(BooksActions.getBooksFailure({error: responce.errors}));
            alert('ERROR - ' + responce.errors.toString()); 
          }
          return of();
        }),
        catchError(error => {
          this.store.dispatch(BooksActions.getBooksFailure({error: error?.error?.errors}));     
          alert('ERROR - ' + error?.error?.errors.toString()); 
          return of();
        })
      );
    }

}

const bookListComponent = {
    controller: BookListController,
    template:
    `
    <div class="album py-5 bg-light flex-fill">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xl-4 g-3">
          <book-card ng-repeat="book in $ctrl.books$ | async:this" book="book"></book-card>
        </div>
      </div>
    </div>
    `
  };
  
  booksModule.component('bookList', bookListComponent);
  