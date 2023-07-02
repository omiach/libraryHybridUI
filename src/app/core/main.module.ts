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
.factory('store',downgradeInjectable(Store))
.directive('flexFill', function(){
    return {
        link: function(scope, element){
            element.addClass('flex-fill')
        }
    }
})
.directive('dFlex', function(){
    return {
        link: function(scope, element){
            element.addClass('d-flex')
        }
    }
})
.directive('alignItemsStretch', function(){
    return {
        link: function(scope, element){
            element.addClass('align-items-stretch');
        }
    }
})
.directive('flexFillChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('flex-fill')
        }
    }
})
.directive('dFlexChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('d-flex')
        }
    }
})
.directive('alignItemsStretchChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('align-items-stretch');
        }
    }
});
//.run(authHookRunBlock);
