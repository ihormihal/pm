var myApp = angular.module('myApp',[]);

myApp.controller('formController', ['$scope','$http', function($scope,$http){

	$scope.translate = {};
	$scope.result = {success: [], error: []};

	$http.get('data/translate_ru.json',{})
	.success(function(data, status, headers, config){
		$scope.translate.ru = data;
	});

	$http.get('data/translate_ge.json',{})
	.success(function(data, status, headers, config){
		$scope.translate.ge = data;
	});

	$scope.save = function(e){
		$http.post('save.php',$scope.translate)
		.success(function(data, status, headers, config){
			$scope.result = data;
			setTimeout($scope.hideResult, 2500);
			
		});
	};

	$scope.hideResult = function(){
		$scope.result = {success: [], error: []};
		$scope.$apply();
	};
}]);