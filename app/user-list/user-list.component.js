angular.module('userList')
  .component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: function ($scope, $http, $rootScope) {
      //$scope.names = [{email: "Ngô"}, {email: "Văn"}, {email: "Năng"}];
      $scope.users = [
        {
        	_id: '121212112',
        	status: 'online',
        	avatar: 'http://emilcarlsson.se/assets/harveyspecter.png',
        	name: 'Harvey Specter',
        	preview: 'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.'
        },
        {
        	_id: '121212113',
        	status: 'busy',
        	avatar: 'http://emilcarlsson.se/assets/rachelzane.png',
        	name: 'Rachel Zane',
        	preview: 'I was thinking that we could have chicken tonight, sounds good?'
        },
        {
        	_id: '121212114',
        	status: 'busy',
        	avatar: 'http://emilcarlsson.se/assets/louislitt.png',
        	name: 'Louis Litt',
        	preview: 'You just got LITT up, Mike.'
        }
      ]



      $scope.loadMessages = function(id){
        //alert(id);
        $rootScope.$broadcast('loadMessage', id);
      }
      // $http.get('api/users').then(function(res){
      //  	$scope.users = res.data;
      //  });
    }
  });