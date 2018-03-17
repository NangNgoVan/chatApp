angular.module('messages')
  .service('messageService', function($http){
  	 this.messages = [
  	   {
          type: 'send',
          avatar: 'http://emilcarlsson.se/assets/mikeross.png',
          content: 'How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!'
        },
        {
          type: 'replies',
          avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
          content: "When you're backed against the wall, break the god damn thing down.",
        },
        {
        	type: 'send',
        	avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
        	content: 'Oh yeah, did Michael Jordan tell you that?'
        }
  	 ];

  	 this.loadMessages = function(id){
  	   this.messages = [];
       this.messages.push({
          type: 'send',
          avatar: 'http://emilcarlsson.se/assets/mikeross.png',
          content: id
        });
       return this.messages;
  	 },

  	 this.sendMessage = function(msg){
  	 	// gửi email
  	 	//alert('send message!');
  	 }
  });