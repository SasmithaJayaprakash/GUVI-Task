<?php

$redis = new Redis();

try{

    $redis->connect(
        '127.0.0.1',
        6379
    );

}
catch(Exception $e){

    die("Redis connection failed");

}

?>
