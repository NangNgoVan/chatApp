angular.module('contactsList')
  .service('contactService', ['$http', 'authService', function($http, authService){
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

      this.loadMessages = function(rid){
        var config = {
          headers: {
            token: authService.token
          }
        }
        return $http.get('/api/messages/'+rid, config).then(function(res){
          var messages = [];
          //console.log(res.data.messages);
          if(res.data.success){
            messages = res.data.messages;
          }
          console.log(messages);
          return messages;
        });
      }   

      this.loadContacts = function(uid){
       // tải liên hệ.
      }
  }])