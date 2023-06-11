import { mainModule } from '../../../core/main.module';

class LoginController {
    constructor() {}
}

const loginComponent = {
    controller: LoginController,
    template:
    `
    <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="border border-3 border-primary"></div>
          <div class="card bg-white shadow-lg">
            <div class="card-body p-5">
              <form class="mb-3 mt-md-4">
                <h2 class="fw-bold mb-2 text-uppercase ">Library</h2>
                <p class=" mb-5">Please enter your login and password!</p>
                <div class="mb-3">
                  <label for="name" class="form-label ">Name</label>
                  <input type="name" class="form-control" id="name" placeholder="user">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label ">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="*******">
                </div>
                <div class="d-grid">
                  <button class="btn btn-outline-dark" type="submit">Login</button>
                </div>
              </form>
 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  };
  
  mainModule.component('login', loginComponent);
  