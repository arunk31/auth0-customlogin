(function () {

  'use strict';

  angular
    .module('app')
    .run(run);
	
  run.$inject = ['$rootScope', 'authService', 'authManager'];
  
  function run($rootScope, authService, authManager) {
	// Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = authService;

      // Process the auth token if it exists and fetch the profile
      authService.authenticateAndGetProfile();
	  
	  // Use the authManager from angular-jwt to check for
	  // the user's authentication state when the page is
      // refreshed and maintain authentication
	  authManager.checkAuthOnRefresh();
  }
})();