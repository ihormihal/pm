﻿var translate = {};

translate.main = {

    match : "მატჩი",
    t : "ტ",
    m : "მ",
    l : "ნ",
    total : "ტოტალი",
    more : "მეტი",
    less : "ნაკლები",
    odds : "ფორა",
    rate : "კოეფ.",
    score : "ანგარიში",
    game_code : "თამაშის კოდი",
    win : "მოგება"
};

translate.markets = {

bcg_Odds : "ფორა",
market_B : "თამაშის შედეგი",
market_O : "ფორა",
market_T : "ტოტალი",
bcg_Basic : "თამაშის შედეგი",
bcg_Total : "ტოტალი",
bcg_Team1_Total : "1 გუნდის ინდ. ტოტალი",
bcg_Team2_Total : "2 –ე გუნდის ინდ. ტოტალი",
bcg_Team12_Goal : "ორივე გუნდი გაიტანს?",
bcg_Total_EO : "მატჩის ტოტალი",
bc_T_Even : "ლუწი",
bc_T_Odd : "კენტი",
bc_T_V : "ტოტალი",
bc_T_L : "მეტი",
bc_T_G : "ნაკლები",
bc_HT_T_V : "ტოტალი",
bc_HT_T_L : "მეტი",
bc_HT_T_G : "ნაკლები",

bc_HT_1O : "ფ. 1",
bc_HT_1O_V : "კოეფ.1",
bc_HT_2O : "ფ. 2",
bc_HT_2O_V : "კოეფ.2",

bc_T_01 : "0-1 გოლი",
bc_T_23 : "2-3 გოლი",
bc_T_4P : "4 და მეტი გოლი",
bcg_NHL : "ოვერტაიმითა და ბულეტებით",
bc_1OT : "1 გუნდის გამარჯვება ოვერტაიმში",
bc_XOT : "ფრე ოვერტაიმში",
bc_2OT : "მე–2გუნდის გამარჯვება ოვერტაიმში",
bc_1P : "1გუნდის გამარჯვება ბულეტებით",
bc_2P : "მე–2 გუნდის გამარჯვება ბულეტებით",
bcg_HalfFullTime : "ტაიმი/მატჩი",
bc_hf11 : "П1П1",
bc_hf1X : "П1Н",
bc_hf12 : "П1П2",
bc_hfX1 : "НП1",
bc_hfXX : "НН",
bc_hfX2 : "НП2",
bc_hf21 : "П2П1",
bc_hf2X : "П2Н",
bc_hf22 : "П2П2",
bc_HT_1 : "П1",
bc_HT_X : "Х",
bc_HT_2 : "П2",
bcg_Team12_Goal : "ორივე გუნდი გაიტანს?",
bc_T12_Goal_Y : "ორივე გაიტანს",
bc_T12_Goal_N : "ერთი მათგანი მაინც ვერ გაიტანს",
bcg_P12_T1_Goal_YN : "გაიტანს 1 გუნდი თითოეულ ტაიმში?",
bcg_P12_T2_Goal_YN : "გაიტანს მე–2 გუნდი თითოეულ ტაიმში?",
bcg_AwayOff : "მოედნიდან მოთამაშის გაძევება",
bcg_Pass : "გასვლა",
bc_Pass_1 : "1 გუნდის გასვლა",
bc_Pass_X : "ვერავინ გავა",
bc_Pass_2 : "მე–2 გუნდის გასვლა",
bcg_Next_Goal : "ვინ გაიტანს შემდეგ გოლს?",
bc_P12_T1_Goal_Y : "დიახ",
bc_P12_T1_Goal_N : "არა",
bc_P12_T2_Goal_Y : "დიახ",
bc_P12_T2_Goal_N : "არა",
bc_G1_1 : "1 გოლს გაიტანს 1გ.",
bc_G2_1 : "2–ე გოლს გაიტანს 1გ.",
bc_G3_1 : "3–ე გოლს გაიტანს 1გ.",
bc_G4_1 : "4–ე გოლს გაიტანს 1გ.",
bc_G5_1 : "5–ე გოლს გაიტანს 1გ.",
bc_G6_1 : "6–ე გოლს გაიტანს 1გ.",
bc_G7_1 : "7–ე გოლს გაიტანს 1გ.",
bc_G8_1 : "8–ე გოლს გაიტანს 1გ.",
bc_G9_1 : "9–ე გოლს გაიტანს 1გ.",
bc_G1_2 : "1 გოლს გაიტანს მე–2 გ.",
bc_G2_2 : "მე–2 გოლს გაიტანს მე–2 გ.",
bc_G3_2 : "მე–3 გოლს გაიტანს მე–2 გ.",
bc_G4_2 : "მე–4 გოლს გაიტანს მე–2 გ.",
bc_G5_2 : "მე–5 გოლს გაიტანს მე–2 გ.",
bc_G6_2 : "მე–6 გოლს გაიტანს მე–2 გ.",
bc_G7_2 : "მე–7 გოლს გაიტანს მე–2 გ.",
bc_G8_2 : "მე–8 გოლს გაიტანს მე–2 გ.",
bc_G9_2 : "მე–9 გოლს გაიტანს მე–2 გ.",
bc_G1_X : "1 გოლი არ გავა",
bc_G2_X : "2 გოლი არ გავა",
bc_G3_X : "3 გოლი არ გავა",
bc_G4_X : "4 გოლი არ გავა",
bc_G5_X : "5 გოლი არ გავა",
bc_G6_X : "6 გოლი არ გავა",
bc_G7_X : "7 გოლი არ გავა",
bc_G8_X : "8 გოლი არ გავა",
bc_G9_X : "9 გოლი არ გავა",
bc_ss00 : "0:0",
bc_ss01 : "0:1",
bc_ss02 : "0:2",
bc_ss03 : "0:3",
bc_ss10 : "1:0",
bc_ss11 : "1:1",
bc_ss12 : "1:2",
bc_ss13 : "1:3",
bc_ss20 : "2:0",
bc_ss21 : "2:1",
bc_ss22 : "2:2",
bc_ss23 : "2:3",
bc_ss30 : "3:0",
bc_ss31 : "3:1",
bc_ss32 : "3:2",
bc_ss33 : "3:3",
bc_cs00 : "0:0",
bc_cs01 : "0:1",
bc_cs02 : "0:2",
bc_cs03 : "0:3",
bc_cs10 : "1:0",
bc_cs11 : "1:1",
bc_cs12 : "1:2",
bc_cs13 : "1:3",
bc_cs20 : "2:0",
bc_cs21 : "2:1",
bc_cs22 : "2:2",
bc_cs23 : "2:3",
bc_cs30 : "3:0",
bc_cs31 : "3:1",
bc_cs32 : "3:2",
bc_cs33 : "3:3",
bcg_SeriesScore1 : "1 პერიოდის ანგარიში",
bcg_SeriesScore2 : "მე–2 პერიოდის ანგარიში",
bcg_SeriesScore3 : "მე–3 პერიოდის ანგარიში",
bcg_SeriesScore4 : "მე–4 პერიოდის ანგარიში",
bcg_P1_T1_Goal : "გაიტანს 1 გ. პირველ ტაიმში?",
bcg_P2_T1_Goal : "გაიტანს 1 გ. მეორე ტაიმში?",
bcg_P1_T2_Goal : "გაიტანს მე–2 გ. პირველ ტაიმში?",
bcg_P2_T2_Goal : "გაიტანს მე–2 გ. მეორე ტაიმში?",
bcg_P1_T12_Goal_YN : " გავა გოლი პირველ ტაიმში?",
bc_P1_T12_Goal_Y : "დიახ",
bc_P1_T12_Goal_N : "არა",
bcg_P1_T12_Goal_YN : "გავა გოლი მეორე ტაიმში?",
bc_P2_T12_Goal_Y : "დიახ",
bc_P2_T12_Goal_N : "არა",
bc_P1_T1_Goal_Y : "დიახ",
bc_P2_T1_Goal_Y : "დიახ",
bc_P1_T1_Goal_N : "არა",
bc_P2_T1_Goal_N : "არა",
bc_P1_T2_Goal_Y : "დიახ",
bc_P2_T2_Goal_Y : "დიახ",
bc_P1_T2_Goal_N : "არა",
bc_P2_T2_Goal_N : "არა",
bcg_Unknown : "უცნობია"

};

translate.others = {
    
898 : ['Какая команда наберет первой (.*) очков', 'რომელი გუნდი დააგროვებს %1 ქულას პირველი'],
901 : ['Кто выиграет гейм № (.*)', 'ვინ მოიგებს № %1 გეიმს'],
902 : ['Тотал угловых', 'მატჩში კუთხურების ტოტალი'],
903 : ['Какая команда наберет первой (.*) очков', 'რომელი გუნდი დააგროვებს %1 ქულას პირველი'],
904 : ['Какая команда наберет первой (.*) очков', 'რომელი გუნდი დააგროვებს %1 ქულას პირველი'],
905 : ['Будет ли удаление в матче?', 'იქნება თუ არა მატჩში გაძევება?'],
906 : ['Обе команды забьют', 'გაიტანს ორივე გუნდი'],
908 : ['Какая команда подаст (.*) угловой', 'რომელი გუნდი ჩააწოდებს (.*) კუთხურს'],
909 : ['Какая команда подаст (.*) угловой (нет (.*) углового-возврат)', 'რომელი გუნდი ჩააწოდებს %1 კუთხურს  %2 კუთხური არ არის'],
910 : ['Счет сета №(.*)', '№%1 სეტის ანგარიში'],
911 : [' Первым выиграет 2 гейма в сете №(.*)', ' №%1 სეტში 2 გეიმს პირველი მოიგებს'],
912 : ['Первым выиграет 3 гейма в сете №(.*)', ' №%1 სეტში 3 გეიმს პირველი მოიგებს'],
913 : ['Первым выиграет 4 гейма в сете №(.*)', ' №%1 სეტში 4 გეიმს პირვეი მოიგებს'],
914 : [' Первым выиграет 5 геймов в сете №(.*)', ' №%1 სეტში 5 გეიმს პირველი მოიგებს'],
916 : [' Сет (.*) гейм (.*)', ' %1 სეტი  %2 გეიმი'],
917 : [' Сет (.*) гейм (.*) очко (.*)', ' %1 სეტი  %2 გეიმი  %3 ქულა'],
918 : ['Сет (.*) гейм (.*). Счет гейма', ' %1 სეტი %2 გეიმი. გეიმის ანგარიში'],
919 : ['Сет (.*) гейм (.*). Счет 40:40', ' %1 სეტი %2 გეიმი. ანგარიში 40:40'],
920 : ['Сет (.*) гейм (.*). Первое очко выиграет', ' %1 სეტი  %2 გეიმი.  პირველ ქულას მოიგებს'],
922 : ['Кто победит в матче', 'ვინ გაიმარჯვებს მატჩში'],
924 : ['В матче победит (.*)', 'მატჩში გაიმარჯვებს %1'],
968 : ['победа (.*) с учётом овертайма', ' %1 –ის მოგება ოვერტაიმის ჩათვლით'],
971 : ['Сет (.*) очко (.*)', ' %1 სეტი %2 ქულა'],
972 : ['Тотал (.*)-го сета', ' %1 სეტის ტოტალი'],
973 : ['Первым 5 очков в сете (.*) наберет', '%1 სეტში 5 ქულას პირველი მოაგროვებს'],
974 : ['Первым 10 очков в сете (.*) наберет', '%1 სეტში 10 ქულას პირველი მოაგროვებს'],
975 : ['Первым 15 очков в сете (.*) наберет', '%1 სეტში 15 ქულას პირველი მოაგროვებს'],
976 : ['Первым 20 очков в сете (.*) наберет', '%1 სეტში 20 ქულას პირველი მოაგროვებს'],
977 : ['(.*) выиграет сет (.*) с разницей', '%1 მოიგებს სეტს %2 ქულის სხვაობით'],
978 : ['(.*) выиграет сет (.*) с разницей', '%1 მოიგებს სეტს %2 ქულის სხვაობით'],
979 : ['Будут ли дополнительные очки в сете (.*)', 'იქნება თუ არა დამატებითი ქულები %1 სეტში'],
981 : ['обе команды забьют', 'გაიტანს ორივე გუნდი'],
991 : ['штрафное время', 'საჯარიმო დრო'],
992 : ['Сет (.*)', ' %1 სეტი'],
993 : ['Сет (.*)', ' %1 სეტი'],
994 : ['Сет (.*)', ' %1 სეტი'],
995 : ['Сет (.*)', ' %1 სეტი'],
996 : ['Сет (.*). Первой наберет 3 очка', ' %1 სეტი. 3 ქულას პირველი დააგროვებს'],
997 : ['Сет (.*). Первой наберет 5 очков', ' %1 სეტი. 5 ქულას პირველი დააგროვებს'],
998 : ['Победа с учетом овертайма', 'მოგება ოვერტაიმის ჩათვლით', '0.03'],

1000 : ['(.*)-й тайм. Инд. тотал (.*)', '%1 -й ტაიმი. ინდ. ტოტალი %2'],
1001 : ['(.*)-й тайм. Инд. тотал (.*)', '%1 ტაიმი. ინდ. ტოტალი'],
1003 : ['Встретятся на групповом этапе', ' გუნდურ ეტაპზე შეხვდებიან'],
1016 : ['Победа 1 и тотал бол. (.*)', 'მოგება 1 და ტოტალი %1 მეტი'],
1017 : ['Ничья и тотал бол. (.*)', 'ფრე და ტოტალი %1 მეტი'],
1018 : ['Победа 2 и тотал бол. (.*)', ' მოგება 2 და ტოტალი %1 მეტი'],
1019 : ['(.*) не проиграет и тотал бол. (.*)', ' %1 არ წააგებს და ტოტალი %2 მეტი'],
1020 : ['(.*) не проиграет и тотал бол. (.*)', ' %1 არ წააგებს და ტოტალი %2 მეტი'],
1021 : ['Победа 1 и тотал мен. (.*)', 'მოგება 1 და ტოტალი %1 ნაკლები'],
1022 : ['Ничья и тотал мен. (.*)', 'ფრე და ტოტალი %1 ნაკლები'],
1023 : ['Победа 2 и тотал мен. (.*)', ' მოგება 2 და ტოტალი %1 ნაკლები'],
1024 : ['(.*) не проиграет и тотал мен. (.*)', ' %1 არ წააგებს და ტოტალი  %2 ნაკლები'],
1025 : ['(.*) не проиграет и тотал мен. (.*)', ' %1 არ წააგებს და ტოტალი  %2 ნაკლები'],
1026 : ['В промежутке с (.*) по (.*) мин.', ' %1 წთ–სა და %2 –წთ–ს შორის შუალედში.'],
1027 : ['В промежутке с (.*) по (.*) мин. тотал ', ' ტოტალი %1 წთ–სა და %2 –წთ–ს შორის შუალედში.'],
1028 : ['Счет матча 1', 'მატჩის შედეგია 1 '],
1029 : ['Счет матча  X', 'მატჩის შედეგია X'],
1030 : ['Счет матча 2', 'მატჩის შედეგია 2 '],
1031 : ['Будет забито ровно', 'გატანილი იქნება ზუსტად'],
1032 : ['(.*) забьет ровно', ' %1 გაიტანს ზუსტად'],
1033 : ['(.*) забьет ровно', ' %1 გაიტანს ზუსტად'],
1035 : ['Период (.*). Инд. тотал (.*)', ' %1 პერიოდი. ინდ. ტოტალი %2'],
1036 : ['Период (.*). Инд. тотал (.*)', 'მე – %1.  ინდ. ტოტალი %2'],
1037 : ['Период (.*). Счет периода', ' %1 პერიოდი. პერიოდის ანგარიში'],
1041 : ['Какая команда наберет первой (.*) очков', 'რომელი გუნდი დააგროვებს %1 ქულას პირველი'],
1042 : ['Какая команда наберет первой (.*) очков', 'რომელი გუნდი დააგროვებს %1 ქულას პირველი'],
1047 : ['Какая команда забъёт первой (.*) голов', 'რომელი გუნდი გაიტანს %1 გოლს პირველი '],
1048 : ['Какая команда забъёт первой (.*) голов', ' რომელი გუნდი გაიტანს %1 გოლს პირველი'],
1049 : ['Какая команда забъёт первой (.*) голов', 'რომელი გუნდი გაიტანს %1 გოლს პირველი'],
1050 : ['Какая команда забъёт первой (.*) голов', 'რომელი გუნდი გაიტანს %1 გოლს პირველი'],
1051 : ['1-й тайм тотал', '. პირველი ტაიმის ტოტალი'],
1052 : ['количество удалений в матче', 'მატჩში გაძევებების რაოდენობა'],
1058 : ['Результат дополнительного времени', 'დამატებითი დროის შედეგი'],
1059 : ['Результат дополнительного времени', 'დამატებითი დროის შედეგი'],
1060 : ['Результат дополнительного времени', 'დამატებითი დროის შედეგი'],
1061 : ['Тотал дополнительного времени', 'დამატებითი დროის ტოტალი'],
1062 : [' Угловой №(.*) подаст', ' № %1 კუთხურს ჩააწოდებს'],
1063 : ['Предупреждение №(.*) получит', ' № %1 გაფრთხილებას მიიღებს'],
1064 : ['Фол №(.*) заработает', ' № %1 foul-ს მიიღებს'],
1065 : ['Победа с учетом пенальти', 'მოგება პენალტების ჩათვლით'],
1066 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1067 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1068 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1069 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1070 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1071 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1072 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1073 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1074 : ['Выиграет золотую медаль', 'ოქროს მედალს მოიგებს'],
1075 : ['Четверть (.*). Инд. тотал (.*)', ' %1 მეოთხედი. ინდ. ტოტალი %2 '],
1076 : ['Четверть (.*). Инд. тотал (.*)', ' %1 მეოთხედი. ინდ. ტოტალი %2 '],
1077 : ['Победа (.*) с разницей в', 'მოიგება %1 –იანი სხვაობით '],
1078 : ['Победа (.*) с разницей в', 'მოგება %1 –იანი სხვაობით '],
1079 : ['Первым 5 очков в четверти (.*) наберет', ' %1 მეოთხედში 5 ქულას პირველი დააგროვებს'],
1080 : ['Первым 10 очков в четверти (.*) наберет', ' %1 მეოთხედში 10 ქულას პირველი დააგროვებს'],
1081 : ['Первым 15 очков в четверти (.*) наберет', ' %1 მეოთხედში 15 ქულას პირველი დააგროვებს'],
1082 : ['Первым 20 очков в четверти (.*) наберет', ' %1 მეოთხედში 20 ქულას პირველი დააგროვებს'],
1083 : ['Первым 25 очков в четверти (.*) наберет', ' %1 მეოთხედში 25 ქულას პირველი დააგროვებს'],
1084 : ['Первым 30 очков в четверти (.*) наберет', ' %1 მეოთხედში 30 ქულას პირველი დააგროვებს'],
1086 : ['Встретятся в 1/8 финала', ' შეხვდებიან 1/8 ფინალში'],
1087 : ['Встретятся в 1/16 финала', ' შეხვდებიან 1/16 ფინალში '],
1096 : ['Счет матча', 'მატჩის ანგარიში'],
1097 : ['Победа (.*) с разницей', ' %1 –ის მოგება ? –იანი სხვაობით'],
1098 : ['Победа (.*) с разницей', ' %1 –ის მოგება ? –იანი სხვაობით'],
1099 : ['Гол №(.*) забьет', '№%1 გოლს გაიტანს'],
1100 : ['Первым 5 очков в тайме (.*) наберет', ' %1 ტაიმში 5 ქულას პირველი დააგროვებს'],
1101 : ['Первым 7 очков в тайме (.*) наберет', ' %1 ტაიმში 7 ქულას პირველი დააგროვებს'],
1102 : ['Первым 10 очков в тайме (.*) наберет', ' %1 ტაიმში 10 ქულას პირველი დააგროვებს'],
1103 : ['Первым 12 очков в тайме (.*) наберет', ' %1 ტაიმში 12 ქულას პირველი დააგროვებს'],
1104 : ['Первым 15 очков в тайме (.*) наберет', ' %1 ტაიმში 15 ქულას პირველი დააგროვებს'],
1105 : ['Первым 17 очков в тайме (.*) наберет', ' %1 ტაიმში 17 ქულას პირველი დააგროვებს'],
1106 : ['Первым 3 очка в тайме (.*) наберет', ' %1 ტაიმში 3 ქულას პირველი დააგროვებს'],
1107 : ['Четверть (.*)', '%1 მეოთხედი'],
1111 : ['Встретятся в 1/2 финала', ' 1/2 ფინალში შეხვდებიან'],
1114 : ['количество ходов в партии', 'პარტიაში სვლების რაოდენობა'],
1117 : ['Встретятся в 1/2 финала', '1/2 ფინალში შეხვდებიან'],

1119 : ['Период (.*)', ' %1 პერიოდი'],
1125 : ['Тотал хитов', 'ჰიტების ტოტალი'],
1126 : ['Иннинг № (.*)', ' № %1 ინინგი'],
1127 : ['Иннинг №(.*)', ' № %1 ინინგი'],
1128 : ['Иннинг №(.*)', ' № %1 ინინგი'],
1129 : ['Иннинг №(.*)', ' № %1 ინინგი'],
1130 : ['Иннинг №(.*)', ' № %1 ინინგი'],
1131 : ['Иннинг № (.*)', '№ %1 ინინგი'],
1132 : ['Иннинг №(.*)', '№ %1 ინინგი'],
1133 : ['Иннинг №(.*)', '№ %1 ინინგი'],
1134 : ['Иннинг №(.*)', '№ %1 ინინგი'],
1135 : ['Дополнительные иннинги', 'დამტებითი ინინგები'],
1136 : ['Победа (.*) с разницей', ' %1 –ის გამარჯვება ? –ის სხვაობით'],
1137 : ['Победа (.*) с разницей', ' %1 –ის გამარჯვება ? –ის სხვაობით'],
1138 : ['Первой наберет 4 очка', '4 ქულას პირველი დააგროვებს'],
1139 : ['Первой наберет 5 очков', '5 ქულას პირველი დააგროვებს'],
1140 : ['Первой наберет 6 очков', '6 ქულას პირველი დააგროვებს'],
1141 : ['Первой наберет 7 очков', '7 ქულას პირველი დააგროვებს'],
1142 : ['Кто будет выигрывать после иннинга №(.*)', ' № %1 ინინგის შემდეგ ვინ მოიპოვებს უპირატესობას'],
1150 : ['Количество промахов', 'აცდენების რაოდენობა'],
1151 : ['Количество штрафных кругов', 'საჯარიმო წრეების რაოდენობა'],
1152 : ['Промахи (.*)', 'აცდენები %1 '],
1153 : ['Промахи (.*)', ' აცდენები %1 '],
1154 : ['Штрафные круги (.*)', 'საჯარიმო წრეები %1 '],
1155 : ['Штрафные круги (.*)', 'საჯარიმო წრეები %1 '],
1156 : ['Количество доп. патронов', 'დამატებითი ვაზნების რაოდენობა'],
1157 : ['Доп. патроны (.*)', 'დამატებითი ვაზნები %1 '],
1158 : ['Доп. патроны (.*)', 'დამატებითი ვაზნები %1 '],
1160 : ['Досрочная победа', 'ვადამდელი გამარჯვება'],
1161 : ['Тотал раундов', 'რაუნდების ტოტალი'],
1162 : ['Тотал раундов', 'რაუნდების ტოტალი'],
1163 : ['Тотал раундов', 'რაუნდების ტოტალი'],
1164 : ['Кто забьет (.*)-й гол', 'ვინ გაიტანს %1 -й გოლს'],
1165 : ['Половина (.*). Инд. тотал (.*)', ' %1 ნახევარი. ინდ. ტოტალი %2 '],
1166 : ['Половина (.*). Инд. тотал (.*)', '%1 ნახევარი. ინდ. ტოტალი %2 '],
1352 : ['Удаления', 'გაძევებები'],
1353 : ['Пенальти', 'პენალტები'],
1354 : ['Кто забьет (.*)-й гол в доп. время', 'ვინ გაიტანს %1 გოლს დამატებით დროში'],
1355 : ['Кто получит (.*)-й угловой в доп. время', 'ვინ მიიღებს %1 კუთხურს დამატებით დროში'],
1356 : ['Двойной шанс в доп. время', 'ორმაგი შანსი დამატებით დროში'],
1398 : ['Период (.*). Первый до 3', ' %1 პერიოდი. პირველი 3–მდე'],
1399 : ['Период (.*). Первый до 4', ' %1 პერიოდი. პირველი 4–მდე'],
1400 : ['Период (.*). Первый до 5', ' %1 პერიოდი. პირველი 5–მდე'],
1401 : ['Период (.*). Первый до 6', ' %1 პერიოდი. პირველი 6–მდე'],
1402 : ['Период (.*). Первый до 7', ' %1 პერიოდი. პირველი 7–მდე'],
1403 : ['Период (.*). Первый до 8', ' %1 პერიოდი. პირველი 8–მდე'],
1404 : ['Период (.*). Первый до 9', ' %1 პერიოდი. პირველი 9–მდე'],
1405 : ['Период (.*). Первый до 10', ' %1 პერიოდი. პირველი 10–მდე'],
1419 : ['Победа в овертайме', 'ოვერტაიმში გამარჯვება'],
1420 : ['Первый до 2', 'პირველი 2–მდე'],
1421 : ['Первый до 3', 'პირველი 3–მდე'],
1422 : ['Первый до 4', 'პირველი 4–მდე'],
1423 : ['Первый до 5', 'პირველი 5–მდე'],
1424 : ['Первый до 6', 'პირველი 6–მდე'],
1425 : ['Победа с разницей', 'მოგება სხვაობით'],
1426 : ['Период 3', 'პერიოდი 3']

};


translate.status = {
    P1 : "",
    P2 : "",
    P3 : "",
    P4 : "",
    P5 : "",
    OT : "ოვერტაიმი",
    Pen : "პენალტი",
    Abd : "მატჩი შეწყვეტილია",
    Int : "მატჩი შეჩერებულია",
    Off : "მატჩი გადადებულია",
    Can : "მატჩი გაუქმებულია",
    EOP : "EOP",
    ND : "მონაცემები არ არის"
};

translate.time = {
    min : " წთ.",
    HT : "შესვენება",
    FT : "მატჩი დასრულდა"
};

translate.livestatus = {
    1 : "",
    2 : "ფსონების მიღება შეჩერებულია",
    3 : "ფსონების მიღება შესვენებაზე",
    4 : "შესვენებისას ფსონების მიღება შეჩერებულია"
};

translate.period_suffix = {
    2 : "მე - მეოთხედი",
    8 : "მე - სეტი",
    9 : "მე - ტაიმი",
    18 : "-ე სეტი",
    21 : "-ე ტაიმი",
    23 : "-ე პერიოდი",
    29 : "-ე სეტი"
};

/*******далее только настройки (не переводим) *******/

//Количество периодов по видам спорта
translate.period_number = {
    2 : "4",
    8 : "3",
    9 : "3",
    18 : "tenis",
    21 : "2",
    22 : "3",
    23 : "3",
    30 : "3"
};

//Подгружаем тамлайны
var bar_templates = {
    tplBar_2 : "events_bar_2.html",
    tplBar_9 : "events_bar_9.html",
    tplBar_21 : "events_bar_21.html",
    tplBar_22 : "events_bar_22.html",
    tplBar_23 : "events_bar_23.html",
    tplBar_30 : "events_bar_30.html"
};