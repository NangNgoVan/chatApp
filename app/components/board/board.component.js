angular.module('board', ['ngCookies'])
  .component('board',{
  	templateUrl: 'components/board/board.template.html',
  	controller: function($window, $http, $cookies, $scope){
  	  // if(!isAuthenticate(token)) $window.location.href = '#!/login';
  	  // else load dư liệu người dùng
  	  // alert('Trang chủ');
  	  // kiểm tra xem token.
  	  // nếu chưa có token hoặc token ko hợp lệ trả về lỗi
  	  // lấy dữ liệu của người dùng hiện tại và hiển thị
  	  var config = {
  	  	headers: {
  	  	  token: $cookies.get('token')
  	  	}
  	  }
  	  $http.get('/api/user', config).then(function(res){
        if(!res.data.success){
          $window.location.href = "#!/login";
          //alert(res.data.message);
        }
        else {
          $scope.username = res.data.data.email;
          //alert('Thành công');
        }
  	  });
  	}
  });