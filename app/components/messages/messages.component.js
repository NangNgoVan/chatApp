angular.module('messages')
  .component('messages', {
  	templateUrl: 'components/messages/messages.template.html',
  	controller: function($scope, messageService, authService, asyncService){
      $scope.messages = [];
      $scope.unread_messages = []; // id của các tin nhắn chưa đọc.
      $scope.message = '';
      $scope.currentChatUser = null;
      $scope.uid = authService.uid;

      $scope.sendMessage = function(msg){
      	//alert(msg);
      	if(msg == '') return;
        if(authService.token == null) {
          //
          return;
        }
        if($scope.currentChatUser == null) return;
        //console.log($scope.currentChatUser.uid);
        asyncService.emit('deliver_message', {uid: authService.uid,
          rid: $scope.currentChatUser._id, msg: msg});

      	$scope.message = '';
      }

      $scope.keyPressSendMessage = function($event, msg){
      	var keyCode = $event.which || $event.keyCode;
      	if(keyCode == 13){
          $scope.seenEvent();
      	  $scope.sendMessage(msg);
      	}
      }

      // đã xem khi nhập tin nhắn
      $scope.seenEvent = function(){
        //console.log('bắt đầu gửi trạng thái!');
        asyncService.emit('deliver_seen_event',
          {uid: authService.uid, rid: $scope.currentChatUser._id});
      }

      // tải tin nhắn
      $scope.$on('loadMessages', function(events, args){
        $scope.currentChatUser = args;
        $scope.messages = args.messages;
        console.log(args);
      });

      $scope.$on('logged_in', function(){
        asyncService.reconnect();
      });
  	}
  });