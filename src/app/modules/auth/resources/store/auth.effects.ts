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
              return AuthActions.loginSuccess({authResult:authResult});
            }else{
              return AuthActions.loginFailure({ error: authResult.errors.toString() });
            }
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ error: error?.error?.errors  ?? {}}))
          }
          )
        )
      )
    );
  });

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => this.authService.logOut())
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() => this.authService.deleteRefreshToken()),
        tap(() => {
          this.authService.logOut();
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
