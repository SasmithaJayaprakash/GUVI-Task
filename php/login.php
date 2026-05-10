<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'config.php';
$email = $_POST['email'];
$password = $_POST['password'];
if(empty($email) || empty($password)){
    echo "not_found";
    exit();
}
$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();
if($res->num_rows == 0){
    echo "not_found";
    exit();
}
$user = $res->fetch_assoc();
if(password_verify($password, $user['password'])){
    $redis = new Redis();
    $redis->connect('127.0.0.1', 6379);
    $sessionId = bin2hex(random_bytes(32));
    $redis->setex('session:' . $sessionId, 3600, $email);
    echo "success:" . $sessionId;
} else {
    echo "wrong_password";
}
