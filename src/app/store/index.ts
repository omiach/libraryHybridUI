import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../modules/auth/resources/store/auth.reducer'

export interface AppState {
    [fromAuth.authFeatureKey]:fromAuth.State;
  }

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]:fromAuth.reducer
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
