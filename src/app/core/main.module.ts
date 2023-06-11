import * as angular from 'angular';
import { authModule } from '../modules/auth/auth.module';
import { AuthService } from '../modules/auth/services/auth.service'
import { authHookRunBlock } from './hooks/requiresAuth.hook'

export const mainModule = angular.module('main', [
    'ui.router',
    authModule.name
])
//.service('authService',AuthService)
.run(authHookRunBlock);
