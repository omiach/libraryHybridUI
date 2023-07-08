//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Book } from '../../resources/models/book';
import { Observable, take } from 'rxjs';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';
import * as BookActions from '../../resources/store/books.actions';
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
      this.handleSimpleResquest(this.booksService.editBook(this.book));
    }

    addBook(){
      this.handleSimpleResquest(this.booksService.addBook(this.book));
    }

    handleSimpleResquest(request:Observable<ApiResponce<null>>){
      request.pipe(take(1)).subscribe({
        next: (responce) => {
          if(!responce.success){
            alert('ERROR - ' + responce.errors.toString());
          }
        },
        error: (error) => {
          alert('ERROR - ' + error?.error?.errors.toString()); 
        }
      });
    }

    clearBook(){
      this.store.dispatch(BookActions.clearCurrentBook());
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
                    <input type="input" class="form-control col-9 d-block" id="name" ng-model="$ctrl.book.name">
                  </div>
                </div>

                <div class="mb-3 row" >
                  <div class="col-3">
                    <label for="author" class="form-label">Author</label>
                  </div>
                  <div class="col-9">
                    <input type="input" class="form-control" id="author" ng-model="$ctrl.book.author">
                  </div>
                </div>

              </div>
              
              <div class="col">

                <div class="mb-3 row">
                  <div class="col-4">
                    <label for="publishingHouse" class="form-label">Publishing house</label>
                  </div>
                  <div class="col-8">
                    <input type="input" class="form-control" id="publishingHouse" ng-model="$ctrl.book.publishingHouse">
                  </div>
                </div>

                <div class="mb-3 row" >
                  <div class="col-4">
                    <label for="yearOfPublishing" class="form-label">Year of publishing</label>
                  </div>
                  <div class="col-8">
                    <input type="number" id="yearOfPublishing" name="yearOfPublishing"
                      ng-class="{'is-invalid':$ctrl.bookForm.yearOfPublishing.$error.yearOfPublishing,'is-valid':!$ctrl.bookForm.yearOfPublishing.$error.yearOfPublishing && !$ctrl.bookForm.yearOfPublishing.$pristine}" 
                      class="form-control"  
                      ng-model="$ctrl.book.yearOfPublishing" 
                      year-of-publishing>
                      <div class="d-flex justify-content-end">
                        <span ng-show="$ctrl.bookForm.yearOfPublishing.$error.yearOfPublishing" class="text-danger">The year must be greater than 1900 and less than the current year</span>
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
                    Clear
                  </button>

                  <button 
                    type="submit" class="btn btn-outline-secondary" ng-click="$ctrl.saveBookChanges()">
                    Save
                  </button>

                </div>

                <div class="btn-group" ng-if="!($ctrl.currentBook$ | async:this)">

                  <button 
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
  