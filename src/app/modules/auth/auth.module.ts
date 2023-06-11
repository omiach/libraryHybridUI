import * as angular from 'angular';
import { AuthService } from './services/auth.service';

export const authModule = angular
.module('auth', [])
.service('authService',AuthService);
