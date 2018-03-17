angular.module('messages')
  .component('messages', {
  	templateUrl: 'messages/messages.template.html',
  	controller: function($scope, messageService){
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

      $scope.sendMessage = function(msg){
      	//alert(msg);
      	if(msg == '') return;

      	messageService.sendMessage(msg);

        $scope.messages.push({
          type: 'send',
          avatar:  'http://emilcarlsson.se/assets/harveyspecter.png',
          content: msg
        });
      	$scope.message = '';
      }

      $scope.keyPressSendMessage = function($event, msg){
      	var keyCode = $event.which || $event.keyCode;
      	if(keyCode == 13){
      	  $scope.sendMessage(msg);
      	}
      }

      $scope.$on('loadMessage', function(events, args){
      	$scope.messages = messageService.loadMessages(args);
      });
  	}
  });