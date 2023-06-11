import * as angular from 'angular';
import * as constants from './constants/constants';

export const sharedModule = angular.module('shared', [
])
.constant('authConstants',constants.authConstants);

