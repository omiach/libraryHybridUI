import { booksModule } from "./books.module";

  const booksState = {
    parent:'shell',
    name: 'books',
    url:'/',
    component: 'bookList'
  }

  booksModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(booksState);
}]);
