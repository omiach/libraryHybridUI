authHookRunBlock.$inject = ['$transitions', 'authService'];
export function authHookRunBlock($transitions, authService) {

  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresAuth
  };

  let redirectToLogin = (transition) => {
    let $state = transition.router.stateService;
    if (!authService.isAuthenticated()) {
      return $state.target('login', undefined, { location: false });
    }
  };

  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
}
