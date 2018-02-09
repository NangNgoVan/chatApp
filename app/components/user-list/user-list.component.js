angular.module('userList')
  .component('userList', {
    templateUrl: 'components/user-list/user-list.template.html',
    controller: function UserListController($scope, $http) {
      //$scope.names = [{email: "Ngô"}, {email: "Văn"}, {email: "Năng"}];
      $http.get('api/users').then(function(res){
       	$scope.users = res.data;
       	//console.log(res.data);
       });
    }
  });