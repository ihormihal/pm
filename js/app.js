var data_object;
var data_object_old;
var myApp = angular.module('myApp', []);

var on_page = 2;

var current_page = 1;
var events_lenght = 0;
var from = 0;
var to = on_page;
var pages = 1;

myApp.controller('MatchesCtrl', ['$scope', function ($scope, $http) {

  $scope.matchList = [];

  //Иницыализация
  $scope.loadMathes = function () {
    data_object = JSON.parse($('#json').text());
    //количество матчей
    events_lenght = data_object.events.length;
    pages = events_lenght/on_page;
    pages = Math.ceil(pages);

    $scope.iniLoad = "block";
    $scope.page = current_page+"/"+pages+" ["+(from+1)+"-"+to+" из "+events_lenght+"]";
    //$scope.page = to;
    $scope.matchList = data_object.events.slice(from,to);
    //$scope.matchList = data_object.events;
    $scope.resultList = rusultExplode(data_object.Results);
    dataConvert(data_object.events);
    data_object_old = data_object;
  };

  $scope.reloadData = function (show_changes) {
    //перелистываем страницу только по таймеру, а не при обновлении данных
    if(show_changes == true){
      data_object = JSON.parse($('#json').text());
      //Обновляем данные для листинга, т.к. количество могло обновится
      events_lenght = data_object.events.length;
      pages = events_lenght/on_page;
      pages = Math.ceil(pages);
    }

    
    if(show_changes == false){
      from = from + on_page;
      to = to + on_page;

      if(to > events_lenght){
        to = events_lenght;
      }
      current_page+=1;
    }

    $scope.$apply(function(){
      if(show_changes == true){
        dataConvert(data_object.events, data_object_old.events);
      }
      $scope.iniLoad = "none";
      $scope.page = current_page+"/"+pages+" ["+(from+1)+"-"+to+" из "+events_lenght+"]";
      //$scope.page = to;
      $scope.matchList = data_object.events.slice(from,to);
      //$scope.matchList = data_object.events;
      $scope.resultList = rusultExplode(data_object.Results);
    });
    if(show_changes == false){
      if(pages==current_page){
        current_page = 0;
        from = 0;
        to = on_page;
      }
    }
    data_object_old = data_object;
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

  //Скрываем, если менше двух значений или если таблица тайма не существует
  $scope.hideOne = function (length,time) {
    if(!time || length == '1' || length == ''){
      return true;
    }
  }

  //Показываем, чья подача
  $scope.serveTeam = function (serve, team) {
    if(parseInt(serve) > 0 && team == 'any'){
      return true;
    }
    if(serve == team){
      return 'serve';
    }
  }

  //Проверка статуса времени матча
  $scope.showTime = function (time,skind,status) {
    var status = status+'';
    var time = parseInt(time);
    if(time>0 && skind !=='2'){
      return time+' мин';
    }
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

  $scope.loadHBar=function(skind,time) {
    var template = 'views/header/events_bar.html';
    var template_selector = 'tplBar_'+skind;  
    if(template_selector in templates && parseInt(time)>0) {
      template = 'views/header/'+templates[template_selector];
      return template;
    }
  }

  $scope.loadHTable=function(skind) {
    var template = 'views/header/events_table.html';
    var template_selector = 'skind_'+skind;
    if(template_selector in periods_table){
      template = 'views/header/events_table_t_'+periods_table[template_selector]+'.html';
    }
    return template;
  }

  $scope.loadMainTable=function() {
    return 'views/markets/main_marketsNew.html';
  }

  //Скрываем Двойной Шанс для остальных видов спорта
  $scope.hideDCmarket=function(skind) {
    if(skind == 7 || skind == 9 || skind == 21 || skind == 23 || skind == 24 || skind == 30){
      return true;
    }
  }
  
  //Переводим только названия периода
  $scope.trPeriod = function (skind, time) {
    var time = time+'';
    var period = time.substring(4,5);
    var period_name = "-й период"; //По дефолту
    var period_selector = 'skind_'+skind;
    if(period_selector in time_periods) {
      period_name = time_periods[period_selector];
    }
    return period+period_name;
  }

  //Перевод кодов
  $scope.translate = function (a,team1,team2) {
    if(a in translations) {
      var str = translations[a];
      str = str.replace("1К",team1);
      str = str.replace("2К",team2);
      return str;
    }else{
      return a;
    }
  }

  //Перевод периодов в именах таблиц
  $scope.tablename = function (tablename,skind) {
    var table_name = tablename+'';
    if(table_name.indexOf("bcg_Period") !== -1){
      var period = table_name.substring(10,11); //Номер периода
      var market = table_name.substring(12,13); //Имя таблицы (маркета)
      market = translations['market_'+market]; //Переведенное таблицы (маркета)
      var period_selector = 'period_name_'+skind; //Селектор имя периода для перевода
      var period_name = "-й период"; //По дефолту
      if(period_selector in time_periods) {
        period_name = time_periods[period_selector];
      }
      return market+' ('+period+period_name+')';
    }
    //Если таблица не с периодами
    if(table_name in translations) {  
      var str = translations[table_name];
      return str;
    }else{
      return table_name;
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
    var sc = score.split('-'); 
    return sc[parseInt(team)-1];
  }

}]);

myApp.controller('TablesCtrl', ['$scope', function ($scope) {

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

    $scope.table_total_eo = dataOut[index].table_eo;//Чет-не чет
    $scope.table_goal = dataOut[index].table_goal;//Забьют обе?
    $scope.table_score = dataOut[index].table_score;//Счет матча

    $scope.tables = dataOut[index].tables;//Другие маркеты
  };

  function reloadTables() {
    $scope.$apply();
  }


}]); //end of Tables controller