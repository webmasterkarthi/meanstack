angular.module('CrudApp',[])

.controller('RegisterFormController',['$scope','$http',function($scope,$http){
	$scope.submit= function() {

		// check to make sure the form is completely valid
		if ($scope.registerform.$valid) {
			$http({
				method  : 'POST',
				url     : '/saveuser',
				data    : $scope.user, //forms user object
				headers : {'Content-Type': 'application/json'} 
			})
          .success(function(data) {
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
	
}]);




