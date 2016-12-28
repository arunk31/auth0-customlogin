(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['angularAuth0', 'authManager', '$location', '$q'];

  function authService(angularAuth0, authManager, $location, $q) {
	  
	var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login(username, password, callback) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password,
      }, callback);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
    }

    function googleLogin(callback) {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token'
      }, callback);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
	  deferredProfile = $q.defer();
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
        angularAuth0.getProfile(result.idToken, function (error, profileData) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profileData));
		  deferredProfile.resolve(profileData);
          $location.path('/');
        });
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }

	function getProfileDeferred() {
      return deferredProfile.promise;
    }
	
    return {
      login: login,
      logout: logout,
      authenticateAndGetProfile: authenticateAndGetProfile,
      signup: signup,
      googleLogin: googleLogin,
	  getProfileDeferred: getProfileDeferred
    }
  }
})();
