angular.module('ChatApp')
  .config(['$locationProvider', '$routeProvider',
  	function config($locationProvider, $routeProvider) {
  	  $locationProvider.hashPrefix('!');

  	  $routeProvider
  	  .when('/users',{
  	  	template: '<user-list></user-list>'
  	  })
  	  .when('/login',{
        template: '<login></login>'
  	  })
  	  .when('/signup',{
  	  	template: '<signup></signup>'
  	  })
      .when('/logout',{
        template: '',
        controller: function(authService){
          authService.logOut();
        }
      })
  	  .when('/board',{
  	  	template: '<board></board>'
  	  })
  	  .otherwise('/board');
  }]);