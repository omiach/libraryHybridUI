import { createReducer, on } from '@ngrx/store';
import { Book } from '../models/book';
import * as BooksActions from './books.actions'; 

export const booksFeatureKey = 'books';

export interface State {
    books: Book[] | null;
    error: any;
    currentBook:Book | null;
  }

export const initialState: State = {
    books: null,
    error: null,
    currentBook:null
};

export const reducer = createReducer(
    initialState,

    on(BooksActions.getBooksSuccess, (state, action) => {
        return {
          ...state,
          error: null,
          books:action.books,
        };
      }),

    on(BooksActions.getBooksFailure, (state, action) => {
      return {
        ...state,
        books: null,
        error: action.error,
      };
    }),

    on(BooksActions.setCurrentBook, (state, action) => {
      return {
        ...state,
        currentBook:action.book,
      };
    }),

    on(BooksActions.clearCurrentBook, (state) => {
      return {
        ...state,
        currentBook:null,
      };
    }),
);
