alcApp.config(['$routeProvider','$locationProvider',
	function($routeProvider,$locationProvider,$rootScope) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'LandingController'
        }).
        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);