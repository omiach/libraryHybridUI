import { booksModule } from "./books.module";

  const booksState = {
    parent:'shell',
    name: 'books',
    url:'/books',
    component: 'bookList'
  }

  booksModule.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state(booksState);
}]);
