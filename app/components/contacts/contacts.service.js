angular.module('contactsList')
  .service('contactService', ['$http', 'authService', function($http, authService){
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

      this.loadContacts = function(){
       // tải liên hệ.
       var config = {
         headers: {
          token: authService.token
         }
       }
       return $http.get('/api/contacts', config).then(function(res){
         var contacts = [];
         if(res.data.success){
           contacts = res.data.users;
         }
         return contacts;
       });
      }
  }])