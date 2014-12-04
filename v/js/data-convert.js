var dataOut = [];

var Events = Events_Old = {};

var firstload = true;

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
  //this.table_score = new dataTableScore('bcg_Score');

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

function dataConvert (Events){
  //Форматируем ячейки значений
  function getValue (id,i,p) {
    var new_value = parseFloat(Events[id].markets[i].p[p].k.replace(',', '.'));
    //console.log(new_value);
    var old_value;
    var dif = 'none';

    //Проверяем, совпадают ли исходы
    if(Events_Old.hasOwnProperty(id)){
      if(Events_Old[id].markets[i] && Events_Old[id].markets[i].p[p]){
        if(Events[id].markets[i].p[p].c == Events_Old[id].markets[i].p[p].c){
          old_value = parseFloat(Events_Old[id].markets[i].p[p].k.replace(',', '.'));
          dif = (new_value > old_value) ? 'up' : (new_value < old_value) ? 'down' : 'none';
        }
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

  //Форматируем ячейки значений форы
  function getValueOdd (id,i,p) {

    var new_value = parseFloat(Events[id].markets[i].p[p].k.replace(',', '.'));
    var old_value;
    var dif = 'none';

    //Проверяем, совпадают ли исходы
    if(Events_Old.hasOwnProperty(id)){
      if(Events_Old[id].markets[i] && Events_Old[id].markets[i].p[p]){
        if(Events[id].markets[i].p[p].c == Events_Old[id].markets[i].p[p].c){
          old_value = parseFloat(Events_Old[id].markets[i].p[p].k.replace(',', '.'));
          dif = (new_value > old_value) ? 'up' : (new_value < old_value) ? 'down' : 'none';
        }
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

  ///////////////////////////////////
  var tables_counter = 1;
  function createGeneralTable (id,i){
    var tab_name = 'table_' + tables_counter;
    var arrl = Events[id].markets[i].p.length;

    if(arrl >= 6 && arrl < 12){
      match[tab_name] = new dataTableMulti(Events[id].markets[i].н);

      var rows = Math.ceil(arrl/2);
      var col1 = {show: false};
      var col2 = {show: false};
      for(var r = 0; r < rows; r++){
        var k1 = r;
        var k2 = r+rows;

        if(k1 < (rows-1)){
          col1 = {show: true, field : Events[id].markets[i].p[k1].c, index : getValue(id,i,k1)};
        }

        if(k2 > (rows-1) && r < (2*rows-1) && k2 < arrl){
          col2 = {show: true, field : Events[id].markets[i].p[k2].c, index : getValue(id,i,k2)};
        }else{
          col2 = {show: true, field : "-", index : {value : "-", dir : "none"}};
        }
        row = {col1 : col1, col2 : col2};
        match[tab_name].Rows.push(row);
      }
      match.multiTables.push(match[tab_name]);

    }else if(arrl >= 12){
      match[tab_name] = new dataTableMulti(Events[id].markets[i].н);

      var rows = Math.ceil(arrl/3);
      var col1 = {show: false};
      var col2 = {show: false};
      var col3 = {show: false};

      for(var r = 0; r < rows; r++){
        var k1 = r;
        var k2 = r+rows;
        var k3 = r+rows+rows;

        if(k1 < (rows-1)){
          col1 = {show: true, field : Events[id].markets[i].p[k1].c, index : getValue(id,i,k1)};
        }
        if(k2 > (rows-1) && r < (2*rows-1)){
          col2 = {show: true, field : Events[id].markets[i].p[k1].c, index : getValue(id,i,k2)};
        }
        if(k3 > (2*rows-1) && k3 < arrl){
          col3 = {show: true, field : Events[id].markets[i].p[k1].c, index : getValue(id,i,k3)};
        }else{
          col3 = {show: true, field : "-", index : {value : "-", dir : "none"}};
        }
        row = {col1 : col1, col2 : col2, col3 : col3};
        match[tab_name].Rows.push(row);
      }
      match.multiTables.push(match[tab_name]);

    }else{
      match[tab_name] = new dataTable(Events[id].markets[i].н);
      for (var k in Events[id].markets[i].p) {
        match[tab_name].th.push({field : Events[id].markets[i].p[k].c, index : getValue(id,i,k)});
      } 
      match.tables.push(match[tab_name]);
    }
    tables_counter++;
  }
  ///////////////////////////////////

  /*function getScore (str){
    var score = str.split("");
    return score[5]+':'+score[6];
  }*/

  var tables = 0; //Счетчик других таблиц
  
  for (var id in Events) {
    var match = new Match(); //Обьект одного матча, который будет хранить только конвертированные таблицы

    Events[id].markets.forEach(function(market,i){

      var market_name_rus = market.н;
      var market_name = market.c;

      if(market_name == 'bcg_Odds'){
        //Фора основная
        match.table_data.bc_f1 = getValueOdd(id,i,1);
        match.table_data.bc_fk1 = getValue(id,i,0);
        match.table_data.bc_f2 = getValueOdd(id,i,3);
        match.table_data.bc_fk2 = getValue(id,i,2);
      }

      else if(market_name.indexOf('bcg_Odds_') !== -1){
        //Форы дополнительные
        match.table_odds.th.push({f1 : getValueOdd(id,i,1), fk1 : getValue(id,i,0), f2 : getValueOdd(id,i,3), fk2 : getValue(id,i,2)});
      }

      else if(market_name.indexOf('bcg_Basic') !== -1){
        //Основной
        for (var k in market.p) {
          switch (market.p[k].c) {
            case 'bc_1':
              match.table_data.bc_1 = getValue(id,i,k);
              break;
            case 'bc_X':
              match.table_data.bc_X = getValue(id,i,k);
              break;
            case 'bc_2':
              match.table_data.bc_2 = getValue(id,i,k);
              break;
            default:
              console.log('undefined title: ' + market_name);
          }
        }
      }

      else if(market_name.indexOf('bcg_Double') !== -1){
        //Двойной шанс
        for (var k in market.p) {
          switch (market.p[k].c) {
            case 'bc_1X':
              match.table_data.bc_1X = getValue(id,i,k);
              break;
            case 'bc_12':
              match.table_data.bc_12 = getValue(id,i,k);
              break;
            case 'bc_X2':
              match.table_data.bc_X2 = getValue(id,i,k);
              break;
            default:
              console.log('undefined title: ' + market_name);
          }
        }
      }

      else if(market_name == 'bcg_Total'){
        if(market_name_rus.indexOf('Сет') !== -1){
          //для тенниса
          var period = parseInt(market_name_rus.match(/\d+/)[0]);
          match['table_total_time'+period].th.push({rate : getValue(id,i,0), b: getValue(id,i,2), m : getValue(id,i,1)});
          match.table_total_time[period-1] = match['table_total_time'+period];
        }else{
          //Обычные тоталлы
          match.table_data.bc_T_V = getValue(id,i,1);
          match.table_data.bc_T_G = getValue(id,i,2);
          match.table_data.bc_T_L = getValue(id,i,0);
        }
      }


      else if(market_name.indexOf('bcg_Total_') !== -1){
        if(market_name == 'bcg_Total_EO'){
          //Чет-нечет
        }
        /*else if(market_name == 'bcg_Total_Groups'){
          //Groups тотал матча
          //2-3 гола или 4 и больше голов
        }
        else if(market_name_rus.indexOf('Инд. тотал') !== -1){
          var period = parseInt(market_name_rus.match(/\d+/)[0]);
          //инд-тотал четверти
        }else if(market_name_rus.indexOf('Иннинг') !== -1){
          //Тотал ининга
        }*/
        else if(market_name.length == 11){
          //Тоталлы дополнительные
          match.table_total.th.push({rate : getValue(id,i,1), b: getValue(id,i,2), m : getValue(id,i,0)});
        }
        else{
          createGeneralTable(id,i);
        }
      }

      else if(market_name.indexOf('bcg_Pass') !== -1){
        //Проход
      }

      else if(market_name.indexOf('bcg_Team1_Total') !== -1){
        //Все тоталлы 1К
        match.table_total_team1.th.push({rate : getValue(id,i,1), b: getValue(id,i,2), m : getValue(id,i,0)});
      }

      else if(market_name.indexOf('bcg_Team2_Total') !== -1){
        //Все тоталлы 2К
        match.table_total_team2.th.push({rate : getValue(id,i,1), b: getValue(id,i,2), m : getValue(id,i,0)});
      }

      else if(market_name.indexOf('bcg_Team12_Goal') !== -1){
        //Забют обе?
        match.table_goal.tableName = market.c;
        for (var k in market.p) {
          match.table_goal.th.push({field : market.p[k].c, index : getValue(id,i,k)});
        }
      }

      /*else if(market_name.indexOf('bcg_HalfFullTime') !== -1){
        //Тайм/Матч
      }*/

      /*else if(market_name.indexOf('bcg_SeriesScore') !== -1){
        //Счет серии
        var period = parseInt(market_name.match(/\d+/)[0]);
      }*/

      /*else if(market_name.indexOf('сета №') !== -1){
        //Счет сета
        var period = parseInt(market_name.match(/\d+/)[0]);
      }*/

      else if(market_name.indexOf('bcg_Period') !== -1){
        var period = parseInt(market_name.match(/\d+/)[0]);
        if(market_name.indexOf('_B') !== -1){
          var tab = 'table_data_time'+period;
          for (var k in market.p) {
            switch (market.p[k].c) {
              case 'bc_P'+period+'_1':
                match[tab].bc_1 = getValue(id,i,k);
                break;
              case 'bc_P'+period+'_X':
                match[tab].bc_X = getValue(id,i,k);
                break;
              case 'bc_P'+period+'_2':
                match[tab].bc_2 = getValue(id,i,k);
                break;
              default:
                console.log('undefined prop: ' + market.p[k].c);
            }
          }
        }

        else if(market_name.indexOf('_O') !== -1){
          //форы
          var tab = 'table_data_time'+period;
          match[tab].bc_f1 = getValueOdd(id,i,1);
          match[tab].bc_fk1 = getValue(id,i,0);
          match[tab].bc_f2 = getValueOdd(id,i,3);
          match[tab].bc_fk2 = getValue(id,i,2);
        }

        else if(market_name.indexOf('_T') !== -1){
          //тоталлы
          var tab = 'table_data_time'+period;
          match[tab].bc_T_V = getValue(id,i,1);
          match[tab].bc_T_G = getValue(id,i,2);
          match[tab].bc_T_L = getValue(id,i,0);
        }

        /*else if(market_name.indexOf('_DC') !== -1){
          //двойной выбор
        }*/

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
        //Тотал без указания периода
        if(market_name_rus.indexOf('Счет 40:401') !== -1){
          //Счет гейма 40:40
          var period = parseInt(market_name_rus.match(/\d+/)[0]);
        }else{
          //другие
          //Все остальные таблицы
          createGeneralTable(id,i);
        }
      }

    });//Конец итерации маркетов

    dataOut[id] = match;



  }//Конец итерации
  //console.log(JSON.stringify(dataOut));

  Events_Old = Events;
  Events = {};
}
