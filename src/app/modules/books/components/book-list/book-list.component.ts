import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { Book } from '../../resources/models/book';
import * as BooksSelectors from '../../resources/store/books.selectors';
import * as BooksActions from '../../resources/store/books.actions';
import { BooksServiceInterface } from '../../resources/services/books.service';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';


class BookListController {
    static $inject = ['store','$state','booksService'];
    store:Store;
    $state:StateService;
    booksService:BooksServiceInterface;
    books$:Observable<Book[]>;
    user$:Observable<User>;
    isLoggenIn$:Observable<boolean>;
    currentBook$:Observable<Book>;


    constructor( store, $state,booksService) {
      this.store = store;
      this.$state = $state;
      this.booksService = booksService;
    }

    $onInit = function() { 
      this.getBooks().subscribe();
      this.books$ = this.store.select(BooksSelectors.selectBooks);
      this.user$ = this.store.select(AuthSelectors.selectUser);
      this.isLoggenIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
      this.currentBook$ = this.store.select(BooksSelectors.selectCurrentBook);
    };

    getBooks():Observable<null>{ 

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
    <div class="album py-5 flex-fill">
      <div class="container">
        <div ng-if="$ctrl.isLoggenIn$ | async:this"
          class="col">
          <book-info book="($ctrl.currentBook$ | async:this)"></book-info>
        </div>
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xl-4 g-3">
          <book-card ng-repeat="book in $ctrl.books$ | async:this" book="book"></book-card>
        </div>
      </div>
    </div>
    `
  };
  
  booksModule.component('bookList', bookListComponent);
  