import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../modules/auth/resources/store/auth.reducer';
import * as fromBooks from '../modules/books/resources/store/books.reducer';

export interface AppState {
    [fromAuth.authFeatureKey]:fromAuth.State;
    [fromBooks.booksFeatureKey]:fromBooks.State;
  }

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]:fromAuth.reducer,
  [fromBooks.booksFeatureKey]:fromBooks.reducer,
  };

  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
       console.log('state', state);
       console.log('action', action);

      return reducer(state, action);
    };
  }
  
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [debug]
  : [];
