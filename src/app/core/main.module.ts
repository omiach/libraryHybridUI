import * as angular from 'angular';
import { authModule } from '../modules/auth/auth.module';

export const mainModule = angular.module('main', [
    'ui.router',
    authModule.name
]);
