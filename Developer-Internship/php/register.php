<?php
include 'config.php';

$username=$_POST['username'];
$email=$_POST['email'];
$password=$_POST['password'];

if(empty($username)||empty($email)||empty($password)){
echo "<div class='error-box'>All fields required</div>";
exit();
}

$password=password_hash($password,PASSWORD_DEFAULT);

$check=$conn->prepare("SELECT * FROM users WHERE email=?");
$check->bind_param("s",$email);
$check->execute();
$res=$check->get_result();

if($res->num_rows>0){
echo "<div class='error-box'>Email already exists</div>";
exit();
}

$stmt=$conn->prepare("INSERT INTO users(username,email,password) VALUES(?,?,?)");
$stmt->bind_param("sss",$username,$email,$password);

if($stmt->execute()){
echo "<div class='alert alert-success'>Registered successfully</div>";
}
?>