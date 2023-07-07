import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as BooksReduser from './books.reducer';
import { Book } from '../models/book';

export const selectBooksState = createFeatureSelector<BooksReduser.State>(
    BooksReduser.booksFeatureKey
);

export const selectBooks = createSelector(
    selectBooksState,
    (state): Book[] | null => state.books
);

export const selectCurrentBook = createSelector(
    selectBooksState,
    (state): Book | null => state.currentBook
);


