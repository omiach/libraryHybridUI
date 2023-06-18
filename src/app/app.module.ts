import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';

import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import { UIRouterModule } from '@uirouter/angular';
import { appjs } from './app.angularjs.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store';


@NgModule({
  imports: [
    BrowserModule,

    UpgradeModule,
    UIRouterUpgradeModule,

    //UIRouterModule.forChild({ states: [contactsFutureState] }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
  ],
  providers: [
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [appjs.name], { strictDi: true });
  }
}
