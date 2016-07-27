// Landing Page Service

alcApp.service('GlobalSerices', function($http,$q) {
	this.autoComplete = function(v){
		var response = $http.get(base_api_url+'autocomplete/'+v).success(function(res){
			return res.data;
		}).error(function(err){
			return err;
		});
		return response;
	},
	this.checkUserExist = function(e){
		var response = $http.post(base_api_url+'checkUserExist',e).success(function(res){
			return res.data;
		}).error(function(err){
			return err;
		});
		return response;
	},
	this.register = function(v){
		//var response = $http.post(base_api_url+'register',)
		//return v;
	}
});