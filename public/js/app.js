<<<<<<< HEAD
var app=angular.module('CrudApp',['ngFileUpload']);

app.controller('mainController',['$scope','$http','Upload',function($scope,$http,Upload){
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
			Upload.upload({
				url: '/saveuser', //upload.php script, node.js route, etc..
				method: 'POST', //Post or Put
				headers: {'Content-Type': 'multipart/form-data'},
				//withCredentials: true,
				data: $scope.user, //from data to send along with the file
				file: $scope.file, // or list of files ($files) for html5 only
				//fileName: 'photo' // to modify the name of the file(s)
			}).then(function (resp) {

				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				$scope.progress = progressPercentage;
			});

			/*$http({
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
          });*/
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


=======
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


>>>>>>> 192d0e20fcf627d522346717de50ea9f44077216
