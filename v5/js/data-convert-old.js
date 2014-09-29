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

  var tables = 0; //Счетчик других таблиц
  for (var i in idAccord) {

    if(typeof dataOld[i] === 'undefined'){
      dataOld[i] = data[i]; //Если в следующем jsone больше матчей, то определяем данные предыдущего равными теккущему.
    }

    var match = new Match(); //Обьект одного матча, который будет хранить таблицы

    if(idAccord[i] == 'new_add'){ //Если в новом наборе нет матча из старого набора - сравниваем данные сами с собой (задаем как новый)
      idAccord[i] = i;
      dataOld[i] = data[i];
    }

    for (var j in data[i].markets) {//итерация маркетов

    var markets = {};
    markets[data[i].markets[j]["c"]] = data[i].markets[j];

    console.log(markets['bcg_Odds']);
      




      var market_name_rus = data[i].markets[j].н;
      var market_name = data[i].markets[j].c;
      var market_short = market_name.substring(0, market_name.length - 1); //Отрезаем один символ в конце
      //var market_short_ = market_name.substring(0, market_name.length - 2); //Отрезаем два символа в конце

      switch (market_short) {
      
        case 'bcg_Basi': //Основной parseFloat(getValue(i,j,0));
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
              //console.log('undefined table: ' + market_name);
            }
          }
          break;

        case 'bcg_Doubl': //Двойнош шанс
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
              //console.log('undefined table: ' + market_name);
            }
          }
          break;

        case 'bcg_Tota': //Тотал основной
          //match.table_total.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          match.table_data.bc_T_V = getValue(i,j,1);
          match.table_data.bc_T_G = getValue(i,j,2);
          match.table_data.bc_T_L = getValue(i,j,0);
          break;

        case 'bcg_Total_': //Тоталы дополнительные
          match.table_total.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          break;

        case 'bcg_Team1_Tota': //Тотал первой комманды
          match.table_total_team1.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          break;

        case 'bcg_Team1_Total': //Собираем дополнительные
          match.table_total_team1.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          break;

        case 'bcg_Team2_Tota': //Тотал второй комманды
          match.table_total_team2.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          break;

        case 'bcg_Team2_Total': //Собираем дополнительные
          match.table_total_team2.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          break;

        case 'bcg_Odd': //Фора основная
          //match.table_odds.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          match.table_data.bc_f1 = getValueOdd(i,j,1);
          match.table_data.bc_fk1 = getValue(i,j,0);
          match.table_data.bc_f2 = getValueOdd(i,j,3);
          match.table_data.bc_fk2 = getValue(i,j,2);
          break;

        case 'bcg_Odds_': //Форы дополнительные
          match.table_odds.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          break;

        case 'bcg_Team12_Goa': //Забьют обе?
          match.table_goal.tableName = data[i].markets[j].c;
          for (var k in data[i].markets[j].p) {
            match.table_goal.th.push({field : data[i].markets[j].p[k].c, index : getValue(i,j,k)});
          }
          break;

        case 'bcg_Period1_': //Основные по периоду 1
              switch (market_name) {
                 
                case 'bcg_Period1_B': //основной
                  for (var k in data[i].markets[j].p) {
                    switch (data[i].markets[j].p[k].c) {
                      case 'bc_P1_1':
                        match.table_data_time1.bc_1 = getValue(i,j,k);
                        break;
                      case 'bc_P1_X':
                        match.table_data_time1.bc_X = getValue(i,j,k);
                        break;
                      case 'bc_P1_2':
                        match.table_data_time1.bc_2 = getValue(i,j,k);
                        break;
                      default:
                      //console.log('undefined table: ' + market_name);
                    }
                  }
                  
                  break;

                case 'bcg_Period1_T': //Тотал
                  match.table_data_time1.bc_T_V = getValue(i,j,1);
                  match.table_data_time1.bc_T_G = getValue(i,j,2);
                  match.table_data_time1.bc_T_L = getValue(i,j,0);
                  break;

                case 'bcg_Period1_O': //По форе
                  match.table_data_time1.bc_f1 = getValueOdd(i,j,1);
                  match.table_data_time1.bc_fk1 = getValue(i,j,0);
                  match.table_data_time1.bc_f2 = getValueOdd(i,j,3);
                  match.table_data_time1.bc_fk2 = getValue(i,j,2);
                  break;

                default:
                  console.log('undefined table: ' + market_name);
              }

              match.table_data_time[0] = match.table_data_time1;

              break; //Конец первого периода
        case 'bcg_Period2_': //Основные по периоду 2
          switch (market_name) {
             
            case 'bcg_Period2_B': //основной
             for (var k in data[i].markets[j].p) {
                switch (data[i].markets[j].p[k].c) {
                  case 'bc_P2_1':
                    match.table_data_time2.bc_1 = getValue(i,j,k);
                    break;
                  case 'bc_P2_X':
                    match.table_data_time2.bc_X = getValue(i,j,k);
                    break;
                  case 'bc_P2_2':
                    match.table_data_time2.bc_2 = getValue(i,j,k);
                    break;
                  default:
                  //console.log('undefined table: ' + market_name);
                }
              }
              break;

            case 'bcg_Period2_T': //Тотал
              match.table_data_time2.bc_T_V = getValue(i,j,1);
              match.table_data_time2.bc_T_G = getValue(i,j,2);
              match.table_data_time2.bc_T_L = getValue(i,j,0);
              break;

            case 'bcg_Period2_O': //По форе
              match.table_data_time2.bc_f1 = getValueOdd(i,j,1);
              match.table_data_time2.bc_fk1 = getValue(i,j,0);
              match.table_data_time2.bc_f2 = getValueOdd(i,j,3);
              match.table_data_time2.bc_fk2 = getValue(i,j,2);
            default:
              //console.log('undefined table: ' + market_name);
          }
          match.table_data_time[1] = match.table_data_time2;
          break; //Конец второго периода
        case 'bcg_Period3_': //Основные по периоду 3
          switch (market_name) {
           
            case 'bcg_Period3_B': //основной
              for (var k in data[i].markets[j].p) {
                switch (data[i].markets[j].p[k].c) {
                  case 'bc_P3_1':
                    match.table_data_time3.bc_1 = getValue(i,j,k);
                    break;
                  case 'bc_P3_X':
                    match.table_data_time3.bc_X = getValue(i,j,k);
                    break;
                  case 'bc_P3_2':
                    match.table_data_time3.bc_2 = getValue(i,j,k);
                    break;
                  default:
                }
              }
              break;

            case 'bcg_Period3_T': //Тотал
              match.table_data_time3.bc_T_V = getValue(i,j,1);
              match.table_data_time3.bc_T_G = getValue(i,j,2);
              match.table_data_time3.bc_T_L = getValue(i,j,0);

              break;

            case 'bcg_Period3_O': //По форе
              match.table_data_time3.bc_f1 = getValueOdd(i,j,1);
              match.table_data_time3.bc_fk1 = getValue(i,j,0);
              match.table_data_time3.bc_f2 = getValueOdd(i,j,3);
              match.table_data_time3.bc_fk2 = getValue(i,j,2);
            default:
              //console.log('undefined table: ' + market_name);
          }
          match.table_data_time[2] = match.table_data_time3;
          break; //Конец третего периода
        case 'bcg_Period4_': //Основные по периоду 4
          switch (market_name) {
             
            case 'bcg_Period4_B': //основной
              for (var k in data[i].markets[j].p) {
                switch (data[i].markets[j].p[k].c) {
                  case 'bc_P4_1':
                    match.table_data_time4.bc_1 = getValue(i,j,k);
                    break;
                  case 'bc_P4_X':
                    match.table_data_time4.bc_X = getValue(i,j,k);
                    break;
                  case 'bc_P4_2':
                    match.table_data_time4.bc_2 = getValue(i,j,k);
                    break;
                  default:
                  //console.log('undefined table: ' + market_name);
                }
              } 
              break;

            case 'bcg_Period4_T': //Тотал
              match.table_data_time4.bc_T_V = getValue(i,j,1);
              match.table_data_time4.bc_T_G = getValue(i,j,2);
              match.table_data_time4.bc_T_L = getValue(i,j,0);
              break;

            case 'bcg_Period4_O': //По форе
              match.table_data_time4.bc_f1 = getValueOdd(i,j,1);
              match.table_data_time4.bc_fk1 = getValue(i,j,0);
              match.table_data_time4.bc_f2 = getValueOdd(i,j,3);
              match.table_data_time4.bc_fk2 = getValue(i,j,2);

            default:
              //console.log('undefined table: ' + market_name);
          }
          match.table_data_time[3] = match.table_data_time4;
          break; //Конец четвертого периода

        case 'bcg_Period1_D': //двойной шанс
          for (var k in data[i].markets[j].p) {
            switch (data[i].markets[j].p[k].c) {
              case 'bc_P1_1X':
                match.table_data_time1.bc_1X = getValue(i,j,k);
                break;
              case 'bc_P1_12':
                match.table_data_time1.bc_12 = getValue(i,j,k);
                break;
              case 'bc_P1_X2':
                match.table_data_time1.bc_X2 = getValue(i,j,k);
                break;
              default:
              //console.log('undefined table: ' + market_name);
            }
          }
          match.table_data_time[0] = match.table_data_time1;

          break;
        case 'bcg_Period2_D': //двойной шанс
          for (var k in data[i].markets[j].p) {
            switch (data[i].markets[j].p[k].c) {
              case 'bc_P2_1X':
                match.table_data_time2.bc_1X = getValue(i,j,k);
                break;
              case 'bc_P2_12':
                match.table_data_time2.bc_12 = getValue(i,j,k);
                break;
              case 'bc_P2_X2':
                match.table_data_time2.bc_X2 = getValue(i,j,k);
                break;
              default:
              //console.log('undefined table: ' + market_name);
            }
          }
          match.table_data_time[1] = match.table_data_time2;
          break;
        case 'bcg_Period3_D': //двойной шанс
          for (var k in data[i].markets[j].p) {
            switch (data[i].markets[j].p[k].c) {
              case 'bc_P3_1X':
                match.table_data_time3.bc_1X = getValue(i,j,k);
                break;
              case 'bc_P3_12':
                match.table_data_time3.bc_12 = getValue(i,j,k);
                break;
              case 'bc_P3_X2':
                match.table_data_time3.bc_X2 = getValue(i,j,k);
                break;
              default:
              //console.log('undefined table: ' + market_name);
            }
          }
          match.table_data_time[2] = match.table_data_time3;
          break;
        case 'bcg_Period4_D': //двойной шанс
          for (var k in data[i].markets[j].p) {
            switch (data[i].markets[j].p[k].c) {
              case 'bc_P4_1X':
                match.table_data_time4.bc_1X = getValue(i,j,k);
                break;
              case 'bc_P4_12':
                match.table_data_time4.bc_12 = getValue(i,j,k);
                break;
              case 'bc_P4_X2':
                match.table_data_time4.bc_X2 = getValue(i,j,k);
                break;
              default:
              //console.log('undefined table: ' + market_name);
            }
          }
          match.table_data_time[3] = match.table_data_time4;
          break;

        case 'bcg_Period1_T': //Дополнительные тоталлы по периоду 1
          match.table_total_time1.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          match.table_total_time[0] = match.table_total_time1;
          break;
        case 'bcg_Period2_T': //Дополнительные тоталлы по периоду 2
          match.table_total_time2.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          match.table_total_time[1] = match.table_total_time2;
          break;
        case 'bcg_Period3_T': //Дополнительные тоталлы по периоду 3
          match.table_total_time3.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          match.table_total_time[2] = match.table_total_time3;
          break;
        case 'bcg_Period4_T': //Дополнительные тоталлы по периоду 4
          match.table_total_time4.th.push({rate : getValue(i,j,1), b: getValue(i,j,2), m : getValue(i,j,0)});
          match.table_total_time[3] = match.table_total_time4;
          break;
            
        case 'bcg_Period1_O': //Дополнительные форы по периоду 1
          match.table_odds_time1.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          match.table_odds_time[0] = match.table_odds_time1;
          break;
        case 'bcg_Period2_O': //Дополнительные форы по периоду 2
          match.table_odds_time2.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          match.table_odds_time[1] = match.table_odds_time2;
          break;
        case 'bcg_Period3_O': //Дополнительные форы по периоду 3
          match.table_odds_time3.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          match.table_odds_time[2] = match.table_odds_time3;
          break;
        case 'bcg_Period4_O': //Дополнительные форы по периоду 4
          match.table_odds_time4.th.push({f1 : getValueOdd(i,j,1), fk1 : getValue(i,j,0), f2 : getValueOdd(i,j,3), fk2 : getValue(i,j,2)});
          match.table_odds_time[3] = match.table_odds_time4;
          break;

        default:

          switch(market_name_rus){
            case 'Сет 1':
              if(market_short == 'bcg_Total_99'){
                match.table_total_time1.th.push({rate : getValue(i,j,0), b: getValue(i,j,2), m : getValue(i,j,1)});
                match.table_total_time[0] = match.table_total_time1;
              }
              break;
            case 'Сет 2':
              if(market_short == 'bcg_Total_99'){
                match.table_total_time2.th.push({rate : getValue(i,j,0), b: getValue(i,j,2), m : getValue(i,j,1)});
                match.table_total_time[1] = match.table_total_time2;
              }
              break;
            case 'Сет 3':
              if(market_short == 'bcg_Total_99'){
                match.table_total_time3.th.push({rate : getValue(i,j,0), b: getValue(i,j,2), m : getValue(i,j,1)});
                match.table_total_time[2] = match.table_total_time3;
              }
              break;
            case 'Сет 4':
              if(market_short == 'bcg_Total_99'){
                match.table_total_time4.th.push({rate : getValue(i,j,0), b: getValue(i,j,2), m : getValue(i,j,1)});
                match.table_total_time[3] = match.table_total_time4;
              }
              break;
            default:

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

      }//Main Switch END

    }//Конец итерации маркетов
    var index = data[i].id;

    dataOut[index] = match;

  }//Конец итерации

  idArray.old = idArray;

}
