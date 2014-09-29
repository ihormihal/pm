var dataOut = [];
var idArray = [];
var idArray_old = []; //Здесь храним массив id матчей для их выбоки

function dataTable(title) { //Конструктор (класс) стандартной таблицы
  this.tableName = 'title';
  this.tableName = title;
  this.lock = 'none';
  this.th = [];
}

function dataTableMulti(title) { //Конструктор (класс) стандартной мультиколоночной таблицы
  this.tableName = 'title';
  this.tableName = title;
  this.lock = 'none';
  this.Rows = [];
}

function dataTableScore(title) { //Конструктор (класс) стандартной таблицы
  this.tableName = 'title';
  this.tableName = title;
  this.tableTitle = "Счет";
  this.lock = 'none';
  this.th1 = [];
  this.th2 = [];
  this.th3 = [];
}

function dataMain(title) { //Конструктор (класс) нестандартной таблицы
  this.tableName = 'title';
  this.tableName = title;
  this.bc_1 = {value: "-", dir: "none"};
  this.bc_X = {value: "-", dir: "none"};
  this.bc_2 = {value: "-", dir: "none"};
  this.bc_1X = {value: "-", dir: "none"};
  this.bc_12 = {value: "-", dir: "none"};
  this.bc_X2 = {value: "-", dir: "none"};
  this.bc_f1 = {value: "-", dir: "none"};
  this.bc_fk1 = {value: "-", dir: "none"};
  this.bc_f2 = {value: "-", dir: "none"};
  this.bc_fk2 = {value: "-", dir: "none"};
  this.bc_T_V = {value: "-", dir: "none"};
  this.bc_T_G = {value: "-", dir: "none"};
  this.bc_T_L = {value: "-", dir: "none"};
}

function Match(){ //Конструктор (класс) матча
  this.table_total = new dataTable('bcg_Total');
  this.table_total_team1 = new dataTable('bcg_Team1_Total');
  this.table_total_team2 = new dataTable('bcg_Team2_Total');
  this.table_odds = new dataTable('bcg_Odds');
  this.table_goal = new dataTable('bcg_Team12_Goal');
  this.table_score = new dataTableScore('bcg_Score');

  this.table_data = new dataMain('table_data');
  this.table_data_time = [];
  this.table_data_time1 = new dataMain('time1');
  this.table_data_time2 = new dataMain('time2');
  this.table_data_time3 = new dataMain('time3');
  this.table_data_time4 = new dataMain('time4');

  this.table_total_time = [];
  this.table_odds_time = [];

  this.tables = [];
  this.multiTables = [];

  this.table_total_time1 = new dataTable('bcg_Period1_T');
  this.table_total_time2 = new dataTable('bcg_Period2_T');
  this.table_total_time3 = new dataTable('bcg_Period3_T');
  this.table_total_time4 = new dataTable('bcg_Period4_T');

  this.table_odds_time1 = new dataTable('bcg_Period1_O');
  this.table_odds_time2 = new dataTable('bcg_Period2_O');
  this.table_odds_time3 = new dataTable('bcg_Period3_O');
  this.table_odds_time4 = new dataTable('bcg_Period4_O');
}

function isInteger(num) {
  return (num ^ 0) === num;
}


dataConvert = function (data,dataOld){

  function getValue (i,j,p) {

    var new_value = parseFloat(data[i].markets[j].p[p].k.replace(',', '.'));
    var old_value;
    var dif = 'none';

    //Проверяем, совпадают ли исходы
    if(dataOld[i].markets[j] && dataOld[i].markets[j].p[p]){
      if(data[i].markets[j].p[p].c == dataOld[i].markets[j].p[p].c) {
        old_value = parseFloat(dataOld[i].markets[j].p[p].k.replace(',', '.'));
        dif = (new_value > old_value) ? 'up' : (new_value < old_value) ? 'down' : 'none';
      }
    }
    var out = new_value.toString();
    var add='';
    if(isInteger(new_value)){
      if(out.length == 1){
        add = '.00';
      }else if(out.length == 2){
        add = '.0';
      }
    }else{
      if(out.length == 3){
        add = '0';
      }
    }
    return {value: new_value+add, dir : dif};
  }

  function getValueOdd (i,j,p) {

    var new_value = parseFloat(data[i].markets[j].p[p].k.replace(',', '.'));
    var old_value;
    var dif = 'none';

    //Проверяем, совпадают ли исходы

    if(dataOld[i].markets[j] && dataOld[i].markets[j].p[p]){
      if(data[i].markets[j].p[p].c == dataOld[i].markets[j].p[p].c) {
        old_value = parseFloat(dataOld[i].markets[j].p[p].k.replace(',', '.'));
        dif = (new_value > old_value) ? 'up' : (new_value < old_value) ? 'down' : 'none';
      }
    }
    
    if(new_value > 0){
      new_value = '+'+new_value;
    }
    var out = new_value.toString();
    var add='';
    if(isInteger(new_value)){
      if(out.length == 1){
        add = '.00';
      }else if(out.length == 2){
        add = '.0';
      }
    }else{
      if(out.length == 3){
        add = '0';
      }
    }
    return {value: new_value+add, dir : dif};
  }

  function getScore (str){
    var score = str.split("");
    return score[5]+':'+score[6];
  }

  if(typeof dataOld === 'undefined'){ //Для иницыализации
    dataOld = data;
  }

  var idArray = [];
  data.forEach(function (item) {
    idArray.push(item.id);
  });
  var idAccord = []; //массив соответствий порядка матчей в data и dataOld
  for(var key in idArray){
      idAccord[key] = 'new_add';
      for(var key_old in idArray_old){ //ищем соответствие значений для каждого key из новых данных со старими
          if(idArray[key] == idArray[key_old]){
              idAccord[key] = key_old;
              break;
          }
      }
  }
  idArray_old = idArray; //Записываем как старый
  //Итерация матчей

  var allMatches = {};

  var tables = 0; //Счетчик других таблиц
  for (var i in idAccord) {
    //var oneMatch = {};
    //oneMatch
    allMatches[data[i]['id']] = {};
    //allMatches[data[i]['id']].markets = '';
    allMatches[data[i]['id']].allMarkets = {};

    if(typeof dataOld[i] === 'undefined'){
      dataOld[i] = data[i]; //Если в следующем jsone больше матчей, то определяем данные предыдущего равными теккущему.
    }

    var match = new Match(); //Обьект одного матча, который будет хранить таблицы

    if(idAccord[i] == 'new_add'){ //Если в новом наборе нет матча из старого набора - сравниваем данные сами с собой (задаем как новый)
      idAccord[i] = i;
      dataOld[i] = data[i];
    }

    //var markets = {};
    for (var j in data[i].markets) {//итерация маркетов
      var market_name_rus = data[i].markets[j].н;
      var market_name = data[i].markets[j].c;

      //allMatches[data[i]['id']].allMarkets[market_name] = data[i].markets[j];

      if(market_name == 'bcg_Odds'){
        //Фора основная
        match.table_data.bc_f1 = getValueOdd(i,j,1);
        match.table_data.bc_fk1 = getValue(i,j,0);
        match.table_data.bc_f2 = getValueOdd(i,j,3);
        match.table_data.bc_fk2 = getValue(i,j,2);
      }

      else if(market_name.indexOf('bcg_Odds_') !== -1){
        //Форы дополнительные
        match.table_odds.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
      }

      else if(market_name.indexOf('bcg_Basic') !== -1){
        //Основной
        for (var k in data[i].markets[j].p) {
          switch (data[i].markets[j].p[k].c) {
            case 'bc_1':
              match.table_data.bc_1 = getValue(i,j,k);
              break;
            case 'bc_X':
              match.table_data.bc_X = getValue(i,j,k);
              break;
            case 'bc_2':
              match.table_data.bc_2 = getValue(i,j,k);
              break;
            default:
              console.log('undefined title: ' + market_name);
          }
        }
      }

      else if(market_name.indexOf('bcg_Double') !== -1){
        //Двойной шанс
        for (var k in data[i].markets[j].p) {
          switch (data[i].markets[j].p[k].c) {
            case 'bc_1X':
              match.table_data.bc_1X = getValue(i,j,k);
              break;
            case 'bc_12':
              match.table_data.bc_12 = getValue(i,j,k);
              break;
            case 'bc_X2':
              match.table_data.bc_X2 = getValue(i,j,k);
              break;
            default:
              console.log('undefined title: ' + market_name);
          }
        }
      }

      else if(market_name == 'bcg_Total'){
        match.table_data.bc_T_V = getValue(i,j,1);
        match.table_data.bc_T_G = getValue(i,j,2);
        match.table_data.bc_T_L = getValue(i,j,0);
      }

      else if(market_name.indexOf('bcg_Total_') !== -1){
        //Тоталлы дополнительные
        match.table_total.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
      }

      else if(market_name.indexOf('bcg_Pass') !== -1){
        //Проход
      }

      else if(market_name.indexOf('bcg_Team1_Total') !== -1){
        //Все тоталлы 1К
        match.table_total_team1.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
      }

      else if(market_name.indexOf('bcg_Team2_Total') !== -1){
        //Все тоталлы 2К
        match.table_total_team2.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
      }

      else if(market_name.indexOf('bcg_Team12_Goal') !== -1){
        //Забют обе?
        match.table_goal.tableName = data[i].markets[j].c;
        for (var k in data[i].markets[j].p) {
          match.table_goal.th.push({field : data[i].markets[j].p[k].c, index : getValue(i,j,k)});
        }
      }

      else if(market_name.indexOf('bcg_HalfFullTime') !== -1){
        //Тайм/Матч
      }

      else if(market_name.indexOf('bcg_SeriesScore') !== -1){
        //Счет серии
        var period = parseInt(market_name.match(/\d+/)[0]);
      }

      else if(market_name.indexOf('сета №') !== -1){
        //Счет сета
        var period = parseInt(market_name.match(/\d+/)[0]);
      }

      else if(market_name.indexOf('bcg_Period') !== -1){
        var period = parseInt(market_name.match(/\d+/)[0]);
        if(market_name.indexOf('_B') !== -1){
          var tab = 'table_data_time'+period;
          for (var k in data[i].markets[j].p) {
          switch (data[i].markets[j].p[k].c) {
            case 'bc_P1_1':
              match[tab].bc_1 = getValue(i,j,k);
              break;
            case 'bc_P1_X':
              match[tab].bc_X = getValue(i,j,k);
              break;
            case 'bc_P1_2':
              match[tab].bc_2 = getValue(i,j,k);
              break;
            default:
              console.log('undefined title: ' + market_name);
          }
        }

        else if(market_name.indexOf('_O') !== -1){
          //форы
          var tab = 'table_data_time'+period;
          match[tab].bc_f1 = getValueOdd(i,j,1);
          match[tab].bc_fk1 = getValue(i,j,0);
          match[tab].bc_f2 = getValueOdd(i,j,3);
          match[tab].bc_fk2 = getValue(i,j,2);
        }

        else if(market_name.indexOf('_T') !== -1){
          //тоталлы
          var tab = 'table_data_time'+period;
          match[tab].bc_T_V = getValue(i,j,1);
          match[tab].bc_T_G = getValue(i,j,2);
          match[tab].bc_T_L = getValue(i,j,0);
        }

        else if(market_name.indexOf('_DC') !== -1){
          //двойной выбор
        }

        else{
          //другие по периодам
        }
        match.table_data_time[period-1] = match['table_data_time'+period];
        //это под вопросом
      }

      else if(market_name.indexOf('bcg_P12_T1_Goal_YN') !== -1){
        //Забьет 1-я в каждом тайме
      }

      else if(market_name.indexOf('bcg_P12_T2_Goal_YN') !== -1){
        //Забьет 2-я в каждом тайме
      }

      else if(market_name.indexOf('bcg_Next_Goal') !== -1){
        //Кто забьет следующий гол 
      }

      else if(market_name.indexOf('bcg_NHL') !== -1){
        //С овертаймом и буллитами
      }

      else if(market_name.indexOf('bcg_AwayOff') !== -1){
        //Удаление
      }
      
      else{
        //другие
        if(market_name_rus.indexOf('Сет') !== -1){
          var period = parseInt(market_name_rus.match(/\d+/)[0]);
          match['table_total_time'+period].th.push({rate : getValue(i,j,0), b: getValue(i,j,2), m : getValue(i,j,1)});
          match.table_total_time[period-1] = match['table_total_time'+period];
        }else{
          //другие
          //Все остальные таблицы
          var tab_name = 'table_' + tables;
          var arrl = data[i].markets[j].p.length;
          //Если количество исходов больше 3, то разбиваем в 2 колонки
          if(arrl > 3){
            match[tab_name] = new dataTableMulti(data[i].markets[j].н);
            var rows = Math.ceil(arrl/2);
            var col1 = "";
            var col2 = "";
            for(var r = 0; r < rows; r++){
              var k1 = r;
              var k2 = r+rows;

              col1 = {field : data[i].markets[j].p[k1].c, index : getValue(i,j,k1)};

              if(k2 < arrl){
                col2 = {field : data[i].markets[j].p[k2].c, index : getValue(i,j,k2)};
              }else{
                col2 = {field : "-", index : {value : "-", dir : "none"}};
              }

              row = {col1 : col1, col2 : col2};
              match[tab_name].Rows.push(row);
            }
            match.multiTables.push(match[tab_name]);

          }else{
            match[tab_name] = new dataTable(data[i].markets[j].н);
            for (var k in data[i].markets[j].p) {
              match[tab_name].th.push({field : data[i].markets[j].p[k].c, index : getValue(i,j,k)});
            } 
            match.tables.push(match[tab_name]);
          }
          tables+=1;
        }
      }

    }//Конец итерации маркетов
    var index = data[i].id;

    dataOut[index] = match;

    //allMatches[data[i]['id']].allMarkets = {sfdsf:'dfadfaf'};

  }//Конец итерации

  idArray.old = idArray;

  console.log(allMatches);

}
