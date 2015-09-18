<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>PariMatch Translate</title>
    <script src="../js/angular.min.js"></script>
    <script src="app_translate.js"></script>
    <link rel="stylesheet" href="animate.css">
    <link rel="stylesheet" href="style.css">
</head>
<body ng-app="myApp">
	<div class="main" ng-controller="formController">
		<div class="translate-form">
			<h2>main</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.main">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.main[label]" type="text"></td>
						<td><input ng-model="translate.ge.main[label]" type="text"></td>
						<td><input ng-model="translate.md.main[label]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>markets</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.markets">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.markets[label]" type="text"></td>
						<td><input ng-model="translate.ge.markets[label]" type="text"></td>
						<td><input ng-model="translate.md.markets[label]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>others</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.others">
						<td><label>{{label}}</label> <input ng-model="translate.ru.others[label][0]" type="text"></td>
						<td><input ng-model="translate.ru.others[label][1]" type="text"></td>
						<td><input ng-model="translate.ge.others[label][1]" type="text"></td>
						<td><input ng-model="translate.md.others[label][1]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>status</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.status">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.status[label]" type="text"></td>
						<td><input ng-model="translate.ge.status[label]" type="text"></td>
						<td><input ng-model="translate.md.status[label]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>time</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.time">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.time[label]" type="text"></td>
						<td><input ng-model="translate.ge.time[label]" type="text"></td>
						<td><input ng-model="translate.md.time[label]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>livestatus</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.livestatus">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.livestatus[label]" type="text"></td>
						<td><input ng-model="translate.ge.livestatus[label]" type="text"></td>
						<td><input ng-model="translate.md.livestatus[label]" type="text"></td>
					</tr>
				</tbody>
			</table>

			<h2>period_suffix</h2>
			<table>
				<thead>
					<th>Key/String</th>
					<th>Trnslate RU</th>
					<th>Trnslate GE</th>
					<th>Trnslate MD</th>
				</thead>
				<tbody>
					<tr ng-repeat="(label, value) in translate.ru.period_suffix">
						<td><label>{{label}}</label></td>
						<td><input ng-model="translate.ru.period_suffix[label]" type="text"></td>
						<td><input ng-model="translate.ge.period_suffix[label]" type="text"></td>
						<td><input ng-model="translate.md.period_suffix[label]" type="text"></td>
					</tr>
				</tbody>
			</table>
			<div class="save">
				<input class="btn" type="submit" ng-click="save()" value="Save">
				<div class="status error animated fadeInUp" ng-show="result.error.length" ng-repeat="msg in result.error">{{msg}}</div>
				<div class="status success animated fadeInUp" ng-show="result.success.length" ng-repeat="msg in result.success">{{msg}}</div>
			</div>
		</div>
	</div>
</body>
</html>