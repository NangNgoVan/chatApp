angular.module('ChatApp')
  .config(['$locationProvider', '$routeProvider',
  	function config($locationProvider, $routeProvider) {
  	  $locationProvider.hashPrefix('!');

  	  $routeProvider
  	  .when('/login',{
        template: '<auth></auth>'
  	  })
  	  .when('/signup',{
  	  	template: '<signup></signup>'
  	  })
      .when('/logout',{
        template: '',
        controller: function(authService, asyncService){
          authService.logOut();
          asyncService.close();
        }
      })
  	  .when('/board',{
  	  	template: '<board></board>'
  	  })
  	  .otherwise('/board');
  }]);
