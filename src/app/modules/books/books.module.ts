import * as angular from 'angular';
import { BooksService } from './resources/services/books.service';

export const booksModule = angular
.module('books', [])
.service('booksService',BooksService);;
