import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as fromAuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
    user: User | null;
    error: any;
    isLoggedIn: boolean | null;
  }

export const initialState: State = {
    user: null,
    error: null,
    isLoggedIn:null,
};

export const reducer = createReducer(
    initialState,

    on(fromAuthActions.loginSuccess, (state, action) => {
        return {
          ...state,
          error: null,
          isLoggedIn:true,
        };
      }),
      on(fromAuthActions.loginFailure, (state, action) => {
        return {
          ...state,
          user: null,
          error: action.error,
          isLoggedIn:false,
        };
      }),
      on(fromAuthActions.logout, (state) => {
        return {
          ...state,
          user: null,
          error: null,
          isLoggedIn: false
        };
      }),
      on(fromAuthActions.getCurrentUserInfoSuccess, (state, action) => {
        return {
          ...state,
          user: action.user,
          error: null,
          isLoggedIn: true
        };
      }),
      on(fromAuthActions.getCurrentUserInfoFailure, (state, action) => {
        return {
          ...state,
          user: null,
          error: action.error,
          isLoggedIn: false
        };
      }),
      on(fromAuthActions.clearCurrentUserInfo, (state, action) => {
        return {
          ...state,
          user: null,
          error: null,
          isLoggedIn: false
        };
      }),
);
