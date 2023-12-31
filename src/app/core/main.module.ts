import * as angular from 'angular';
import { asyncFilterModule } from './filters/async/'
import { authModule } from '../modules/auth/auth.module';
import { booksModule } from '../modules/books';
import { authHookRunBlock } from './hooks/requiresAuth.hook';
import { sharedModule } from '../shared/shared.module';
import { downgradeInjectable } from '@angular/upgrade/static';
import { Store } from '@ngrx/store';
import uiMask from 'angular-ui-mask';

export const mainModule = angular.module('main', [
    'ui.router',
    uiMask,
    authModule.name,
    booksModule.name,
    sharedModule.name,
    asyncFilterModule
])
.factory('store',downgradeInjectable(Store));
//.run(authHookRunBlock);
