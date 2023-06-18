import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  tap,
} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.logIn(action.authRequest).pipe(
          map((authResult) => {
            if (authResult.succeeded){
              this.authService.setTokens(authResult);
              return AuthActions.loginSuccess({authResult:authResult});
            }else{
              return AuthActions.loginFailure({ error: authResult.errors.toString()});
            }
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ error: error?.error?.errors  ?? {}}))
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      concatMap(() => of(AuthActions.getCurrentUserInfo()))  
    )
  });

  loginFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        concatMap((action) => {
          this.authService.logOut();
          return of(AuthActions.getCurrentUserInfoFailure({error:action.error}))
        })
      );
  });

  logout$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        concatMap(() => {
          this.authService.logOut();
          return of(AuthActions.clearCurrentUserInfo())
        }),
      );
    }
  );

  getCurrentUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getCurrentUserInfo),
      concatMap(() => 
        this.authService.getCurrentUserInfo().pipe(
          map((user) => AuthActions.getCurrentUserInfoSuccess({user:user})),
          catchError((error) => {
            return of(AuthActions.getCurrentUserInfoFailure({ error: error?.error?.errors  ?? {}}))
          })
        )  
      )
    )
  });


  constructor(private actions$: Actions, private authService: AuthService) {}
}
