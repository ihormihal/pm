var update = function(){};

var myApp = angular.module('myApp',['filters']);

myApp.directive('onLastRepeat', function() {
  return function(scope, element, attrs) {
		if (scope.$last) setTimeout(function(){
		  scope.$emit('onRepeatLast', element, attrs);
		},1);
  };
});

myApp.controller('matchesController', ['$scope', function($scope){

	$scope.legends = [];
	$scope.load = function(){
		$scope.data = JSON.parse(document.getElementById('json').innerHTML);
		for(var i = 0; i < $scope.data.events.length; i++){
			$scope.legends.push({'id' : $scope.data.events[i].id});
			$scope.data.events[i].markets = dataConvert($scope.data.events[i].id, $scope.data.events[i].markets);
		}
	};

	$scope.load();

	update = function(){
		if(document.getElementById('ready').value == 1){
			$scope.load();
			$scope.$apply();
			scroll();
		}
	};

	//Хелперы

	//Проверка статуса времени матча
	$scope.showTime = function (value) {
		var namespace = "time";
		if(value in translate[namespace]){
			return translate[namespace][value];
		}else{
			return value+' '+translate[namespace]['min'];
		}
	};

	$scope.icoTime = function (value) {
		if(value == 'HT'){
			return "icoPause"
		}else{
			return "";
		}
	};

	$scope.getScore = function (score) {
		return score.replace('-',':');
	};

	$scope.loadHBar=function(skind) {
		var template = 'views/header/events_bar.html';
		if(skind in bar_templates){
			return 'views/header/'+bar_templates[skind];
		}
	};

	$scope.showHBar = function(mins,stats) {
		if(mins !== '' && 'goals' in stats ){
			return true;
		}else{
			return false;
		}
	};

	//Скрываем Двойной Шанс для остальных видов спорта
  $scope.hideDC = function(skind) {
    if(skind == 7 || skind == 9 || skind == 21 || skind == 23 || skind == 24 || skind == 30){
      return true;
    }
  };

  //Скрываем ничью
  $scope.hideX = function(skind) {
    if(skind == 3 || skind == 8 || skind == 18 || skind ==  28 || skind ==  29 || skind ==  30){
      return true;
    }
  };


  //Сдвиг или подолжительность события в тайм-баре в процентах от общего времени
  $scope.timefix = function (time, game_time) {
    var time = parseInt(time);
    var game_time = parseInt(game_time);
    if(time <= game_time){ // иначе овертайм
      var ratio = time * 100 / game_time;
      return ratio.toPrecision(3)+'%';
    }else{
      //Овертайм
      return '100%; background: #f00;';
    }
  };

  $scope.timefixBasket = function (time, status) {
    var time = parseInt(time);
    var status = status+'';
    if(status.substring(0,1) == 'P' && parseInt(status.substring(1,2)) > 0){
      time = (parseInt(status.substring(1,2))-1)*10 + parseInt(time);
    }
    if(time <= 40){ // иначе овертайм
      var ratio = time * 100 / 40;
      return ratio.toPrecision(3)+'%';
    }else{
      //Овертайм
      return '100%; background: #f00;';
    }
  };

  $scope.getDate = function (datestr) {
    var year = datestr.substring(0,4);
    var month = datestr.substring(4,6);
    var day = datestr.substring(6,8);
    var time = datestr.substring(9,13);
    var hh = time.substring(0,2);
    var mm = time.substring(2,4);
    return hh+':'+mm;
  };

  //Подсчет количество голов, забитых каждой из комманд
  $scope.getPoints = function (team, score) {
    var score = score+"";
    var sc = score.split('-'); 
    return sc[parseInt(team)-1];
  };

  //Подсчет количество очков, в теннисе
  $scope.getTPoints = function (team, score) {
    var score = score+"";
    var sc = score.split(':'); 
    return sc[parseInt(team)-1];
  };

  //таблицы в несколько колонок
  $scope.multicol = function (length) {
    var classname = "";
    if(parseInt(length+"") > 7){
      classname = "multicol two-coll";
    }
    if(parseInt(length+"") > 11){
      classname = "multicol three-coll";
    }
    return classname;
  }; 

}]);

//truncate filter
angular.module('filters', [])
.filter('truncate', function () {
	return function(text, length, end){
		if(isNaN(length))
			length = 10;
		if(end === undefined)
			end = "...";

		if(text.length <= length || text.length - end.length <= length) {
			return text;
		}
		else{
			return String(text).substring(0, length-end.length) + end;
		}
	};
})
.filter('translate', function () {
	return function(text, namespace, def){
		if(namespace === undefined){
			namespace = "main";
		}

		if(text in translate[namespace]){
			return translate[namespace][text];
		}else{
			if(def === undefined){
				return text;
			}else{
				return def;
			}
			
		}
	}
});