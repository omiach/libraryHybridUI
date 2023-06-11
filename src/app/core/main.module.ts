import * as angular from 'angular';
import { authModule } from '../modules/auth/auth.module';
import { authHookRunBlock } from './hooks/requiresAuth.hook';
import { sharedModule } from '../shared/shared.module';

export const mainModule = angular.module('main', [
    'ui.router',
    authModule.name,
    sharedModule.name
])
.run(authHookRunBlock);
