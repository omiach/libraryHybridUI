import { mainModule } from './main.module';

class AppController {
    constructor() {}
  }

const appComponent = {
    controller: AppController,
    template:
    ` 
      <ui-view flex-fill align-items-stretch d-flex flex-fill-child align-items-stretch-child d-flex-child></ui-view>
    `
  };
  
  mainModule.component('app', appComponent);
  