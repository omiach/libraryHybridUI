//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Book } from '../../resources/models/book';
import { Observable, catchError, take } from 'rxjs';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';
import { BooksServiceInterface } from '../../resources/services/books.service';
import { ApiResponce } from '../../../../shared/models/apiResponce';


class BookInfoController {
    static $inject = ['store','$state', 'booksService'];
    store:Store;
    $state:StateService;
    user$:Observable<User>;
    booksService:BooksServiceInterface;
    book:Book = {
      id:0,
      name:'',
      author:'',
      publishingHouse:'',
      yearOfPublishing:null,
      available:false,
      owner:'',
      reservedBy:''
    };

    constructor( store, $state, booksService) {
      this.store = store;
      this.$state = $state;
      this.booksService = booksService;
    }

    $onInit = function() { 
      this.user$ = this.store.select(AuthSelectors.selectUser);
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
      this.book = {
        id:0,
        name:'',
        author:'',
        publishingHouse:'',
        yearOfPublishing:null,
        available:false,
        owner:'',
        reservedBy:''
      }; 
    }
}

const bookInfoComponent = {
    controller: BookInfoController,
    bindings:{
      book: '<'
    },
    template:
    `
    <div class="col">
      <div class="card shadow-sm">

        <div class="card-body">
          <form>
         
            <div class="col">
            
              <div class="mb-3" hidden>
                <input type="input" class="form-control" id="id" ng-model="$ctrl.book.id">
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="input" class="form-control" id="name" ng-model="$ctrl.book.name">
              </div>

              <div class="mb-3" >
                <label for="author" class="form-label">Author</label>
                <input type="input" class="form-control" id="author" ng-model="$ctrl.book.author">
              </div>

            </div>
            
            <div class="col">

              <div class="mb-3" >
                <label for="publishingHouse" class="form-label">Publishing house</label>
                <input type="input" class="form-control" id="publishingHouse" ng-model="$ctrl.book.publishingHouse">
              </div>

              <div class="mb-3" >
                <label for="yearOfPublishing" class="form-label">Year of publishing</label>
                <input type="input" class="form-control" id="yearOfPublishing" ng-model="$ctrl.book.yearOfPublishing">
              </div>

            </div>

            <div class="d-flex justify-content-between align-items-center">
              
              <div class="btn-group" ng-if="($ctrl.user$ | async:this).name === $ctrl.book.owner">

                <button 
                  type="button" class="btn btn-sm btn-outline-secondary" ng-click="$ctrl.clearBook()">
                  Clear
                </button>

                <button 
                  type="button" class="btn btn-sm btn-outline-secondary" ng-click="$ctrl.saveBookChanges()">
                  Save
                </button>

              </div>

              <div class="btn-group" ng-if="!($ctrl.book).id">

                <button 
                  type="button" class="btn btn-sm btn-outline-secondary" ng-click="$ctrl.addBook()">
                  Add
                </button>

              </div>

            </div>

          <form>
        </div>

      </div>
    </div>
    `
  };
  
  booksModule.component('bookInfo', bookInfoComponent);
  