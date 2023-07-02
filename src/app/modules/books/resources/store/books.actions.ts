import { createAction, props } from "@ngrx/store";
import { Book } from "../models/book";


export const getBooks = createAction(
  '[Books component] Get books',
  //props<{authRequest:AuthRequest}>()
);

export const getBooksSuccess = createAction(
  '[Books component] Get books success',
  props<{books:Book[]}>()
);

export const getBooksFailure = createAction(
  '[Books component] Get books failure',
  props<{error:string[]}>()
);
