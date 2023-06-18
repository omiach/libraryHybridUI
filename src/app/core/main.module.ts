import * as angular from 'angular';
import { asyncFilterModule } from './filters/async/'
import { authModule } from '../modules/auth/auth.module';
import { authHookRunBlock } from './hooks/requiresAuth.hook';
import { sharedModule } from '../shared/shared.module';
import { downgradeInjectable } from '@angular/upgrade/static';
import { Store } from '@ngrx/store';
import { AuthEffects } from '../modules/auth/resources/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';

export const mainModule = angular.module('main', [
    'ui.router',
    authModule.name,
    sharedModule.name,
    asyncFilterModule
])
.factory('storeService',downgradeInjectable(Store))
.run(authHookRunBlock);
