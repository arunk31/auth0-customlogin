(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['authService'];

  function homeController(authService) {

    var vm = this;
    vm.authService = authService;

	authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
    });
	
  }

})();
