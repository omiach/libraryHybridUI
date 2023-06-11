import { mainModule } from '../../../core/main.module';

class LoginController {
    constructor() {

    }

}

const loginComponent = {
    controller: LoginController,
    template:
    `
   <div>LOGIN</div>
    `
  };
  
  mainModule.component('login', loginComponent);
  