angular.module('users')
  .service('userService', ['$http', function($http){
  	this.loadUsers = function(uid){
      	return $http.get('api/users').then(function(res){
      	  var users = [];
          for(x in res.data){
            users.push({
              active: false,
              messages: [],
              unread_messages: 0, // số lượng tin nhắn chưa đọc.
              user: res.data[x]
            });
          }
          return users;
        });
      }
  }])