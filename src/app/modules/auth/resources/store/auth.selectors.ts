import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { User } from '../models/user';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
    fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state): boolean | null => state.isLoggedIn
);

export const selectUser = createSelector(
    selectAuthState,
    (state): User | null => state.user
);


