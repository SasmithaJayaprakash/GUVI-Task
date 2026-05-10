<?php
$sessionId = $_POST['sessionId'];
if(empty($sessionId)){
    echo "invalid";
    exit();
}
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$email = $redis->get('session:' . $sessionId);
if($email){
    echo "valid";
} else {
    echo "invalid";
}
