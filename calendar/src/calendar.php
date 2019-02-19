<?php

$json_file = file_get_contents('calendar.json');
$json_arr = json_decode($json_file, true);

// Сохранить данные
if(isset($_POST['save'])) {
    $save_json = $_POST['save'];
    file_put_contents('calendar.json', json_encode($save_json));
    exit();
}

// Отправить данные
if(isset($_POST['get'])) {
    exit(json_encode($json_arr));
}