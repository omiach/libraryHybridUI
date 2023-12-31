import { createAction, props } from "@ngrx/store";
import { AuthRequest } from "../models/authRequest";
import { AuthResult } from "../models/authResult";
import { User } from "../models/user";

export const login = createAction(
  '[Auth Effect] Login User',
  props<{authRequest:AuthRequest}>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ authResult: AuthResult }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth Effect] Logout'
);

export const getCurrentUserInfo = createAction(
  '[Auth Effect] Get current user info',
);

export const getCurrentUserInfoSuccess = createAction(
  '[Auth Effect] Get current user info Success',
  props<{ user: User}>()
);

export const getCurrentUserInfoFailure = createAction(
  '[Auth Effect] Get current user info Failure',
  props<{ error: any }>()
);

export const clearCurrentUserInfo = createAction(
  '[Auth Effect] Clear current user info'
);
