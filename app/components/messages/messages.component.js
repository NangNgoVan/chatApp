angular.module('messages')
  .component('messages', {
  	templateUrl: 'components/messages/messages.template.html',
  	controller: function($scope, messageService, authService, asyncService){
      $scope.messages = [
        // {
        //   type: 'send',
        //   avatar: 'http://emilcarlsson.se/assets/mikeross.png',
        //   content: 'How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!'
        // },
        // {
        //   type: 'replies',
        //   avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
        //   content: "When you're backed against the wall, break the god damn thing down.",
        // },
        // {
        // 	type: 'send',
        // 	avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
        // 	content: 'Oh yeah, did Michael Jordan tell you that?'
        // }
      ];

      $scope.message = '';
      $scope.chatUser = null;

      $scope.sendMessage = function(msg){
      	//alert(msg);
      	if(msg == '') return;
        if(authService.token == null) {
          //
          return;
        }
        if($scope.chatUser == null) return;

        asyncService.emit('deliver_message', {uid: authService.uid,
          rid: $scope.chatUser._id, msg: msg});

        // $scope.messages.push({
        //   type: 'replies',
        //   avatar:  'http://emilcarlsson.se/assets/harveyspecter.png',
        //   content: msg
        // });
      	$scope.message = '';
      }

      $scope.keyPressSendMessage = function($event, msg){
      	var keyCode = $event.which || $event.keyCode;
      	if(keyCode == 13){
      	  $scope.sendMessage(msg);
      	}
      }

      // tải tin nhắn
      $scope.$on('loadMessage', function(events, args){
        $scope.chatUser = args;
      	$scope.messages = messageService.loadMessages(args._id);
      });
      
      // kết nối lỗi
      asyncService.on('connect_error', function(error){
        console.log(error);
      });
      
      // nhận một tin nhắn mới
      asyncService.on('receive_message', function(data){
        $scope.messages.push({
          type:'sent',
          avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
          content: data.msg
        });
        $scope.$apply();
      });
      
      // khi gửi tin nhắn thành công!
      asyncService.on('send_message', function(data){
        // 
        $scope.messages.push({
          type:'replies',
          avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
          content: data.msg
        });
        $scope.$apply();
      });
  	}
  });