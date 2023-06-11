import { mainModule } from './main.module';

class AppController {
    constructor() {}
  }

const appComponent = {
    controller: AppController,
    template:
    `
    <ui-view></ui-view>
    `
  };
  
  mainModule.component('app', appComponent);
  