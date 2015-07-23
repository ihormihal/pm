<?php
$output = array('success' => array(), 'error' => array());
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$data = json_decode(file_get_contents('php://input'),true);
	$saved_ru = file_put_contents('data/translate_ru.json',json_encode($data['ru']));
	$saved_ge = file_put_contents('data/translate_ge.json',json_encode($data['ge']));
	if(!$saved_ru){
		$output['error'][] = 'RU translation not saved!';
	}else{
		$output['success'][] = 'RU translation successfully saved!';
	}
	if(!$saved_ge){
		$output['error'][] = 'GE translation not saved!';
	}else{
		$output['success'][] = 'GE translation successfully saved!';
	}
	echo json_encode($output);
}
?>