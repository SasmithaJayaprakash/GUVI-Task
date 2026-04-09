<?php
include 'config.php';

$email=$_POST['email'];
$password=$_POST['password'];

if(empty($email)||empty($password)){
echo "not_found";
exit();
}

$stmt=$conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$res=$stmt->get_result();

if($res->num_rows==0){
echo "not_found";
exit();
}

$user=$res->fetch_assoc();

if(password_verify($password,$user['password'])){
echo "success";
}else{
echo "wrong_password";
}
?>