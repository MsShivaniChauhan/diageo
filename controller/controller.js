alcApp.controller("LandingController", function($rootScope,$scope,$routeParams) {
    $rootScope.page_title ='Home';
});

alcApp.controller("postcodeController",function($rootScope,$scope,$http,GlobalSerices) {
	$scope.suggestion = function(){
		console.log($scope.postcode);
		if($scope.postcode.trim() != '' && $scope.postcode != 'undefined'){
			GlobalSerices.autoComplete($scope.postcode).then(function(res){
				var result = [];
				$(res.data).each(function(i,e){
					result.push(res.data[i].postcode);
				});
				$('#postcode').autocomplete({
			    	source: result
			    });
			});
		}
	}
});

alcApp.controller('registerController',function($rootScope,$scope,$http,GlobalSerices){
	$scope.submit=function(){
		var creds = {
			email: $scope.reg_email,
			pass: $scope.reg_password
		}
	}
});

alcApp.controller('loginController',function($rootScope,$scope,$http,GlobalSerices){
	
});