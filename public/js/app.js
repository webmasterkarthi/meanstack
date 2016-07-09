var app=angular.module('CrudApp',[]);

app.controller('mainController',['$scope','$http',function($scope,$http){
	$http({
		method  : 'GET',
		url     : '/listUsers',
		headers : {'Content-Type': 'application/json'}
	}).success(function(data) {
			if (data.errors) {
				// Showing errors.
				$scope.errorName = data.errors.name;
			} else {
				$scope.users = data.users;
			}
		});
	$scope.submit= function() {
		// check to make sure the form is completely valid
		if ($scope.registerform.$valid && $scope.operation!=1) {
			$http({
				method  : 'POST',
				url     : '/saveuser',
				data    : $scope.user, //forms user object
				headers : {'Content-Type': 'application/json'} 
			}).success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });
		}else if($scope.registerform.$valid && $scope.operation==1){
			$http({
				method  : 'POST',
				url     : '/updateUser',
				data    : $scope.user, //forms user object
				headers : {'Content-Type': 'application/json'}
			}).success(function(data) {
				if (data.errors) {
					// Showing errors.
					$scope.errorName = data.errors.name;
					$scope.errorUserName = data.errors.username;
					$scope.errorEmail = data.errors.email;
				} else {
					$scope.message = data.message;
				}
			});

		}

	};

	$scope.edit=function(uid){
		$http({
			method  : 'POST',
			url     : '/getUser',
			data    : {"uid":uid}, //forms user object
			headers : {'Content-Type': 'application/json'}
		}).success(function(data){
			$scope.user=data;
			$scope.operation=1;
		});
	}
	$scope.delete=function(uid){
		$http({
			method  : 'POST',
			url     : '/deleteUser',
			data    : {"uid":uid}, //forms user object
			headers : {'Content-Type': 'application/json'}
		}).success(function(data){
			console.log(data);
		});
	}
	
}]);

/*app.controller('ListController',['$scope','$http',function($scope,$http){

}]);*/


