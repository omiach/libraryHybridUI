import { mainModule } from './main.module';

class AppController {
    constructor() {}
  }

const appComponent = {
    controller: AppController,
    template:
    `
    <p>APP</p>
    <ui-view></ui-view>
    `
  };
  
  mainModule.component('app', appComponent);
  