angular.module('contactsList')
  .component('contactsList', {
    templateUrl: 'components/contacts/contacts.template.html',
    controller: function (asyncService, contactService, $mdToast, $http, $scope, $rootScope, $q) {
      var self = this;

      $scope.users = []; // người dùng

      $scope.currentChatUser = null; // người chat hiện tại.

      $scope.contactsOnline = []; // danh bạ

      this.loadUsers = function(uid){
        return contactService.loadUsers(uid).then((data) => {
          console.log(data);
          $scope.users = data;
          if($scope.users.length > 0) {
            $scope.currentChatUser = $scope.users[0];
            $scope.load($scope.currentChatUser);
          }
          //console.log($scope.users);
          self.showContactsOnline(true);
        }).catch((err)=>{
          // xảy ra lỗi.
        });
      }

      $scope.load = function(currentChatUser){
        if($scope.currentChatUser != null)
          $scope.currentChatUser.active = false;
        $scope.currentChatUser = currentChatUser;
        $scope.currentChatUser.active = true;

        contactService.loadMessages($scope.currentChatUser.user._id)
          .then(function(data){
            $scope.currentChatUser.messages = data;
            $rootScope.$broadcast('loadMessages', $scope.currentChatUser);
          });
      }

      // nhận tin nhắn mới
      asyncService.on('receive_message', function(data){
        //alert('nhan tin nhan moi')
        //console.log(data);
        for(x in $scope.users){
          // chuyển các tin nhắn ở trạng thái read sang seen
          if($scope.users[x].user._id == data.sid){
            $scope.users[x].messages.push(data);
          }
        }
        
        $scope.$apply();
      });

      // khi gửi tin nhắn mới
      asyncService.on('send_message', function(data){
        //console.log(data);
        for(x in $scope.users){
          if($scope.users[x].user._id == data.rid){
            $scope.users[x].messages.push(data);
          };
        }
        $scope.$apply();
      });

      // sự kiện ai đó đã đọc
      asyncService.on('seen_event', function(uid){
        //alert(uid + ' Đã đọc!');
        // chuyển các tin nhắn ở trạng thái sent sang read.
        for(x in $scope.users){
          // if($scope.users[x].user._id == uid){
          //   for(mIndex in $scope.users[x].messages){
          //     var message = $scope.users[x].messages[mIndex];
          //     if(message.status == 'sent'){
          //       message.status = 'read';
          //     }
          //   };
          // }
        }
        $scope.$apply();
      });

       // kết nối lỗi
      asyncService.on('connect_error', function(error){
        console.log('Lỗi kết nối tới máy chủ!');
        $mdToast.show({
          hideDelay   : 3000,
          position    : 'top right',
          controller : function($scope){
            $scope.msg = "Lỗi kết nối! Đang chờ mạng."
          },
          templateUrl : 'components/toast/toast.template.html'
        });
      });

      // kết nối thành công!
      asyncService.on('connect', function(){
        console.log('Đã kết nối thành công!');
        $mdToast.show({
          hideDelay   : 3000,
          position    : 'top right',
          controller : function($scope){
            $scope.msg = "Kết nối thành công!"
          },
          templateUrl : 'components/toast/toast.template.html'
        })
      });

      // khi người dùng đang online
      asyncService.on('user_online', function(data){
        // alert('có người online!');
        console.log(data);
        $scope.contactsOnline = data;
        self.showContactsOnline(true);
        $scope.$apply();
      });

      //khi có người dùng offline
      asyncService.on('user_offline', function(data){
        //alert('có người offline');
        for(i in $scope.contactsOnline){
          var found = false;
          found = data.find(x=>{
            if(x === $scope.contactsOnline[i]) return true;
          });
          if(found) $scope.contactsOnline.splice(i, 1);
        }
        //$scope.contactsOnline = data;
        console.log($scope.contactsOnline);
        self.showContactsOnline(true);
        $scope.$apply();
      });

      // tin nhắn chưa đọc.
      $scope.unreadMessages = function(currentChatUser){
        var unread_messages = [];
        currentChatUser.messages.find(x=>{
          if(x.status === 'saved') unread_messages.push(x._id);
        });
        return unread_messages;
      }

      // đếm tin nhắn chờ của tất cả các liên hệ.
      //

      this.loadContacts = function(){
        // tải liên hệ
        $scope.users = contactService.loadContacts();
      }

      this.showContactsOnline = function(status){
        if($scope.contactsOnline.length <= 0) return;
        for(i in $scope.users){
          var found = false;
          found = $scope.contactsOnline.find(x=>{
            if(x === $scope.users[i].user._id) return true;
          });
          if(found) $scope.users[i].online = status;
          else $scope.users[i].online = !status;
        }
      }

      this.$onInit = function(){
        this.loadUsers('current');  //
      }
      //
    }
  });