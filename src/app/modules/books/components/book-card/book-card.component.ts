//import { mainModule } from '../../../../core/main.module';
import { booksModule } from '../../books.module';
import { Store } from '@ngrx/store';
import { StateService } from '@uirouter/core';
import { Book } from '../../resources/models/book';
import { Observable } from 'rxjs';
import { User } from '../../../auth/resources/models/user';
import * as AuthSelectors from '../../../auth/resources/store/auth.selectors';


class BookCardController {
    static $inject = ['store','$state'];
    store:Store;
    $state:StateService;
    book:Book;
    user$:Observable<User>;

    constructor( store, $state) {
      this.store = store;
      this.$state = $state;
    }

    $onInit = function() { 
      this.user$ = this.store.select(AuthSelectors.selectUser);
    };

    

}

const bookCardComponent = {
    controller: BookCardController,
    bindings:{
      book: '<'
    },
    template:
    `
    <div class="col">
      <div class="card shadow-sm">
      <!--
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      -->  
        <div class="card-body">
          <p class="card-text">{{$ctrl.book.name}}</p>
          <div class="d-flex justify-content-between align-items-center">
            
            <div class="btn-group">
              <button 
                ng-if=" $ctrl.user$ | async:this && $ctrl.book.available"
                type="button" class="btn btn-sm btn-outline-secondary">
                  Reserv
              </button>
              <button 
                ng-if="$ctrl.user$ | async:this && ($ctrl.user$ | async:this).name === $ctrl.book.reservedBy"
                type="button" class="btn btn-sm btn-outline-secondary">
                  Return
              </button>
            </div>

            <button 
              ng-if="($ctrl.user$ | async:this).name === $ctrl.book.owner" 
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
  