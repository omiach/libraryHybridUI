import * as angular from "angular";
import uiRouter from "@uirouter/angularjs";
import { upgradeModule } from "@uirouter/angular-hybrid";

// Feature Modules
/* import { globalModule } from "./global/index";
import { homeModule } from "./home/index";
import { mymessagesModule } from './mymessages/index'; */
import { mainModule } from './core/index';

export const appjs = angular.module("appjs", [
  uiRouter,
  upgradeModule.name,
  mainModule.name
  //homeModule.name,
  //globalModule.name,
  //mymessagesModule.name,
]);

const otherwiseConfigBlock = ['$urlRouterProvider', '$locationProvider', ($urlRouterProvider, $locationProvider) => {
  $locationProvider.html5Mode({
    enabled:     true,
    requireBase: false
  });
  $locationProvider.hashPrefix('');
  $urlRouterProvider.otherwise("/");
}];
appjs.config(otherwiseConfigBlock);

const traceRunBlock = ['$trace', $trace => { $trace.enable(1); }];
appjs.run(traceRunBlock);
