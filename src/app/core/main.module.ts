import * as angular from 'angular';
import { authModule } from '../modules/auth/auth.module';
import { authHookRunBlock } from './hooks/requiresAuth.hook';
import { sharedModule } from '../shared/shared.module';
import { downgradeInjectable } from '@angular/upgrade/static';
import { Store } from '@ngrx/store';

export const mainModule = angular.module('main', [
    'ui.router',
    authModule.name,
    sharedModule.name
])
.factory('storeService',downgradeInjectable(Store))
.run(authHookRunBlock);
