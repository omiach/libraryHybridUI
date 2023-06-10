import { mainModule } from '../main.module';

class HomeController {
    constructor() {

    }

}

const homeComponent = {
    controller: HomeController,
    //templateUrl: './home.component.html'
    template:
    `
    <h1 class="text-3xl font-bold underline">
    Hello world!
    </h1>
    `
  };
  
  mainModule.component('home', homeComponent);
  