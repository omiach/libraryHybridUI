//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Book } from '../../resources/models/book';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';
import * as BooksActions from '../../resources/store/books.actions';
import { BooksServiceInterface } from '../../resources/services/books.service';
import { ApiResponce } from '../../../../shared/models/apiResponce';


class BookCardController {
    static $inject = ['store','$state','booksService'];
    store:Store;
    $state:StateService;
    book:Book;
    user$:Observable<User>;
    booksService:BooksServiceInterface;

    constructor( store, $state, booksService) {
      this.store = store;
      this.$state = $state;
      this.booksService = booksService;
    }

    $onInit = function() { 
      this.user$ = this.store.select(AuthSelectors.selectUser);
    }; 

    editBook(){
      this.store.dispatch(BooksActions.setCurrentBook({book:{...this.book}}));
    }

    reserveBook(){
      this.handleReserve(this.booksService.reserveBook(this.book.id));
    }

    returnBook(){
      this.handleReserve(this.booksService.reserveBook(this.book.id, false));
    }
   
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

    handleReserve(request:Observable<ApiResponce<null>>){
      request.pipe(take(1)).subscribe({
        next: (responce) => {
          if(!responce.success){
            alert('ERROR - ' + responce.errors.toString());
            return;
          }
          this.store.dispatch(BooksActions.clearCurrentBook());
          this.getBooks().subscribe();
        },
        error: (error) => {
          alert('ERROR - ' + error?.error?.errors.toString()); 
        }
      });
    }
}

const bookCardComponent = {
    controller: BookCardController,
    bindings:{
      book: '<'
    },
    template:
    `
    <div class="col">
      <div class="card shadow-sm" >
      <!--
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      -->  
        <div class="card-body">
          <div style="min-height:80px">
            <p class="card-text">{{$ctrl.book.name}}</p>
            <p class="card-text">{{$ctrl.book.author}}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center" style="min-height:31px">
            
            <div class="btn-group">

              <button 
                ng-if="($ctrl.user$ | async:this) && $ctrl.book.available"
                ng-click="$ctrl.reserveBook()"
                type="button" class="btn btn-sm btn-outline-secondary">
                  Reserve
              </button>

              <button 
                ng-if="($ctrl.user$ | async:this) && ($ctrl.user$ | async:this).name === $ctrl.book.reservedBy"
                ng-click="$ctrl.returnBook()"
                type="button" class="btn btn-sm btn-outline-secondary">
                  Return
              </button>

            </div>

            <button 
              ng-if="($ctrl.user$ | async:this).name === $ctrl.book.owner"
              ng-click="$ctrl.editBook()" 
              type="button" class="btn btn-sm btn-outline-secondary">
                Edit
            </button>

          </div>
        </div>
      </div>
    </div>
    `
  };
  
  booksModule.component('bookCard', bookCardComponent);
  