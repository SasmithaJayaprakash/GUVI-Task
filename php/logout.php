<?php
$sessionId = $_POST['sessionId'];
if(!empty($sessionId)){
    $redis = new Redis();
    $redis->connect('127.0.0.1', 6379);
    $redis->del('session:' . $sessionId);
}
echo "logged_out";
