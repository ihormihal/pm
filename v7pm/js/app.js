var data_object;
var myApp = angular.module('myApp', []);

myApp.controller('MatchesCtrl', ['$scope', function ($scope, $http) {

  //$scope.matchList = [];


  //Иницыализация
  $scope.loadMathes = function () {
    data_object = JSON.parse($('#json').text());
    var Events = {};
    data_object.events.forEach(function (item) {
      Events[item.id] = item;
    });
    //dataConvert(Events);
    data_object.events = '';

    $scope.matchList = Events;
    if(data_object.Results){
      $scope.resultList = rusultExplode(data_object.Results);
    }
  };

  $scope.reloadData = function () {
    data_object = JSON.parse($('#json').text());
    $scope.$apply(function(){

      var Events = {};
      data_object.events.forEach(function (item) {
        Events[item.id] = item;
      });
      dataConvert(Events);
      data_object.events = '';

      $scope.matchList = Events;
      if(data_object.Results){
        $scope.resultList = rusultExplode(data_object.Results);
      }
    });
  }

  //Functions
  function rusultExplode (string) {
    return string.split(';');
  }

  /*helpers--------------------------*/


  $scope.cropStr = function (str,count) {
    var str = str+'';
    var count = parseInt(count);
    if(str.length >count){
      return str.substring(0,count) + '...';
    }else{
      return str;
    }
  }

  //Скрываем основные коеф. в маркетах
  $scope.hideFirst = function (index) {
    if(parseInt(index) == 0){
      return true;
    }
  }


  //Показываем, чья подача
  /*$scope.serveTeam = function (serve, team) {
    if(parseInt(serve) > 0 && team == 'any'){
      return true;
    }
    if(serve == team){
      return 'serve';
    }
  }*/

  $scope.getScore = function (score) {
    return score.replace('-',':');
  }

  //Проверка статуса времени матча
  $scope.showTime = function (value) {
    if(value == 'HT'){
      return "Перерыв"
    }else if(value == 'FT'){
      return "Матч завершен"
    }else{
      return value+" мин.";
    }
  }

  $scope.icoTime = function (value) {
    if(value == 'HT'){
      return "icoPause"
    }else{
      return "";
    }
  }

  //Проверка статуса времени матча
  $scope.showTimeOLD = function (time,skind,status) {
    var status = status+'';
    var time = parseInt(time);
    if(time>0 && skind !=='2'){
      return time+' мин';
    }
    //Для баскетболла
    if(time>0 && skind =='2'){
      if(status.substring(0,1) == 'P'){
        return status.substring(1,2)+'-я четверть, '+time+' мин';
      }
      if(status == 'OT'){
        return time+' мин';
      }
    }
  }

  $scope.showHT = function (time) {
    if(time=='HT'){
      return 'show';
    }
  }
  $scope.showFT = function (time) {
    if(time=='FT'){
      return 'show';
    }
  }

  //Возвращаем перевод статуса матча
  $scope.showStatus=function (status,selector) {
    var stat = selector+'_'+status;
    if(stat in translations){
      return translations[stat];
    }
  }

  $scope.loadHBar=function(skind) {
    var template = 'views/header/events_bar.html';
    var template_selector = 'tplBar_'+skind;  
    if(template_selector in templates) {
      template = 'views/header/'+templates[template_selector];
      return template;
    }
  }

  $scope.showHBar=function(mins,stats) {
    if(mins!=='' && 'goals' in stats ){
      return true;
    }else{
      return false;
    }
  }

  /*$scope.loadHTable=function(skind) {
    var template = 'views/header/events_table.html';
    var template_selector = 'skind_'+skind;
    if(template_selector in periods_table){
      template = 'views/header/events_table_'+periods_table[template_selector]+'.html';
    }
    return template;
  }*/

  $scope.loadMainTable=function() {
    return 'views/markets/main_marketsNew.html';
  }

  //Скрываем Двойной Шанс для остальных видов спорта
  $scope.hideDC=function(skind) {
    if(skind == 7 || skind == 9 || skind == 21 || skind == 23 || skind == 24 || skind == 30){
      return true;
    }
  }

  //Скрываем ничью
  $scope.hideX=function(skind) {
    if(skind == 3 || skind == 8 || skind == 18 || skind ==  28 || skind ==  29 || skind ==  30){
      return true;
    }
  }
  

  //Перевод кодов
  $scope.translate = function (a) {
    if(a in translations) {
      var str = translations[a];
      return str;
    }else{
      return a;
    }
  }

  //Перевод периодов в именах таблиц
  $scope.tablename = function (tablename,skind) {
    var tablename = tablename+'';
    var period = parseInt(tablename.replace(/\D+/g,""));
    var period_name = "-й период";
    var skind = 'skind_'+skind;
    if(skind in periods_names) {
      var str = periods_names[skind];
      return period+str;
    }else{
      return period+period_name;
    }
  }


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
  }

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
  }    

  $scope.getDate = function (datestr) {
    var year = datestr.substring(0,4);
    var month = datestr.substring(4,6);
    var day = datestr.substring(6,8);
    var time = datestr.substring(9,13);
    var hh = time.substring(0,2);
    var mm = time.substring(2,4);
    return hh+':'+mm;
  }
  //Подсчет количество голов, забитых каждой из комманд
  $scope.getPoints = function (team, score) {
    var score = score+"";
    var sc = score.split('-'); 
    return sc[parseInt(team)-1];
  }

  //Подсчет количество очков, в теннисе
  $scope.getTPoints = function (team, score) {
    var score = score+"";
    var sc = score.split(':'); 
    return sc[parseInt(team)-1];
  }

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
  }

}]);

myApp.controller('TablesCtrl', ['$scope', function ($scope) {
  if(dataOut.length > 0){
    $scope.loadTable = function (index) {
      $scope.table_data = dataOut[index].table_data;//Главная таблица
      $scope.table_data_time = dataOut[index].table_data_time;//Главная таблица-периоды

      $scope.table_main = dataOut[index].table_main;//Основной
      $scope.table_main_time = dataOut[index].table_main_time;//Основной по таймам
      $scope.table_odds = dataOut[index].table_odds;//Фора
      $scope.table_odds_time = dataOut[index].table_odds_time;//Фора по таймам

      $scope.table_total = dataOut[index].table_total;//Тотал
      $scope.table_total_team1 = dataOut[index].table_total_team1;//Тотал 1-й комманды
      $scope.table_total_team2 = dataOut[index].table_total_team2;//Тотал 2-й комманды
      $scope.table_total_time = dataOut[index].table_total_time;//Тотал по таймам

      //$scope.table_total_eo = dataOut[index].table_eo;//Чет-не чет
      $scope.table_goal = dataOut[index].table_goal;//Забьют обе?
      //$scope.table_score = dataOut[index].table_score;//Счет матча

      $scope.tables = dataOut[index].tables;//Другие маркеты
      $scope.multiTables = dataOut[index].multiTables;//Другие маркеты 3collum
    };
  }
  

  function reloadTables() {
    $scope.$apply();
  }


}]); //end of Tables controller