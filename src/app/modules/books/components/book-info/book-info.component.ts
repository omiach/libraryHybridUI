//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Book } from '../../resources/models/book';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';
import * as BooksActions from '../../resources/store/books.actions';
import * as BooksSelectors from '../../resources/store/books.selectors';
import { BooksServiceInterface } from '../../resources/services/books.service';
import { ApiResponce } from '../../../../shared/models/apiResponce';


class BookInfoController {
    static $inject = ['store','$state', 'booksService'];
    store:Store;
    $state:StateService;
    user$:Observable<User>;
    currentBook$:Observable<Book>;
    booksService:BooksServiceInterface;
    book:Book | null = null; 
    bookForm;

    constructor( store, $state, booksService) {
      this.store = store;
      this.$state = $state;
      this.booksService = booksService;
    }

    $onInit = function() { 
      this.user$ = this.store.select(AuthSelectors.selectUser);
      this.currentBook$ = this.store.select(BooksSelectors.selectCurrentBook);
    }; 

    saveBookChanges(){
      this.handleAddOrEdditRequest(this.booksService.editBook(this.book));
      this.clearBook();
    }

    addBook(){
      this.handleAddOrEdditRequest(this.booksService.addBook(this.book));
      this.clearBook();
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

    handleAddOrEdditRequest(request:Observable<ApiResponce<null>>){
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

    clearBook(){
      this.store.dispatch(BooksActions.clearCurrentBook());
      this.clearForm();
    }

    clearForm(){
      this.book = null;
      this.bookForm.$setPristine(true);
      this.bookForm.$setUntouched(true);
    }
}

const bookInfoComponent = {
    controller: BookInfoController,
    bindings:{
      book: '<'
    },
    template:
    `
    <div class="col mb-4">
      <div class="card shadow-sm">
        
          <div class="card-body row" ng-form="$ctrl.bookForm">
            
              <div class="col">
              
                <div class="mb-3" hidden>
                  <input type="input" class="form-control" id="id" ng-model="$ctrl.book.id">
                </div>

                <div class="mb-3 row">
                  <div class="col-3">
                    <label for="name" class="form-label">Name</label>
                  </div>
                  
                  <div class="col-9">
                    <input type="input" class="form-control col-9" id="name" name="name" ng-model="$ctrl.book.name" required
                      ng-class="{
                        'is-invalid':$ctrl.bookForm.name.$invalid && !$ctrl.bookForm.name.$pristine,
                        'is-valid':$ctrl.bookForm.name.$valid && !$ctrl.bookForm.name.$pristine
                      }"
                    >
                      <div class="d-flex justify-content-end">
                        <span ng-show="$ctrl.bookForm.name.$error.required && !$ctrl.bookForm.name.$pristine" class="text-danger">required</span>
                      </div>
                  </div>

                </div>

                <div class="mb-3 row" >
                  <div class="col-3">
                    <label for="author" class="form-label">Author</label>
                  </div>
                  <div class="col-9">
                    <input type="input" class="form-control" id="author" name="author" ng-model="$ctrl.book.author" required
                      ng-class="{
                        'is-invalid':$ctrl.bookForm.author.$invalid && !$ctrl.bookForm.author.$pristine,
                        'is-valid':$ctrl.bookForm.author.$valid && !$ctrl.bookForm.author.$pristine
                      }"
                    >
                    <div class="d-flex justify-content-end">
                      <span ng-show="$ctrl.bookForm.author.$error.required && !$ctrl.bookForm.author.$pristine" class="text-danger">required</span>
                    </div>
                  </div>
                </div>

              </div>
              
              <div class="col">

                <div class="mb-3 row">
                  <div class="col-4">
                    <label for="publishingHouse" class="form-label">Publishing house</label>
                  </div>
                  <div class="col-8">
                    <input type="input" class="form-control" id="publishingHouse" name="publishingHouse" ng-model="$ctrl.book.publishingHouse" required
                    ng-class="{
                      'is-invalid':$ctrl.bookForm.publishingHouse.$invalid && !$ctrl.bookForm.publishingHouse.$pristine,
                      'is-valid':$ctrl.bookForm.publishingHouse.$valid && !$ctrl.bookForm.publishingHouse.$pristine
                    }"
                    >
                    <div class="d-flex justify-content-end">
                      <span ng-show="$ctrl.bookForm.publishingHouse.$error.required && !$ctrl.bookForm.publishingHouse.$pristine" class="text-danger">required</span>
                    </div>
                  </div>
                </div>

                <div class="mb-3 row" >
                  <div class="col-4">
                    <label for="yearOfPublishing" class="form-label">Year of publishing</label>
                  </div>
                  <div class="col-8">
                    <input type="number" id="yearOfPublishing" name="yearOfPublishing" ng-model="$ctrl.book.yearOfPublishing" required
                      ng-class="{
                        'is-invalid':$ctrl.bookForm.yearOfPublishing.$invalid && !$ctrl.bookForm.yearOfPublishing.$pristine,
                        'is-valid':$ctrl.bookForm.yearOfPublishing.$valid && !$ctrl.bookForm.yearOfPublishing.$pristine
                      }" 
                      class="form-control"  
                      year-of-publishing>
                      <div class="d-flex justify-content-end">
                        <span ng-show="$ctrl.bookForm.yearOfPublishing.$error.yearOfPublishing && !$ctrl.bookForm.yearOfPublishing.$pristine" class="text-danger">The year must be greater than 1900 and less than the current year</span>
                      </div>
                  </div>
                  
                </div>

              </div>

              <div class="d-flex justify-content-end align-items-center">
                
                <div 
                  ng-if="($ctrl.user$ | async:this).name === $ctrl.book.owner"
                  class="btn-group">

                  <button 
                    type="button" class="btn btn-outline-secondary" ng-click="$ctrl.clearBook()">
                    Cancel
                  </button>

                  <button ng-disabled="$ctrl.bookForm.$invalid"
                    type="submit" class="btn btn-outline-secondary" ng-click="$ctrl.saveBookChanges()">
                    Save
                  </button>

                </div>

                <div class="btn-group" ng-if="!($ctrl.currentBook$ | async:this)">

                  <button 
                    type="button" class="btn btn-outline-secondary" ng-click="$ctrl.clearBook()">
                    Clear
                  </button>

                  <button ng-disabled="$ctrl.bookForm.$invalid"
                    type="submit" class="btn btn-outline-secondary" ng-click="$ctrl.addBook()">
                    Add new book
                  </button>

                </div>

              </div>

          </div>

      </div>
    </div>
    `
  };
  
  booksModule.component('bookInfo', bookInfoComponent);
  