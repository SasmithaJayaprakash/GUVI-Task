<?php

include 'redis.php';

$sessionId = $_POST['sessionId'];
$age       = $_POST['age'];
$dob       = $_POST['dob'];
$contact   = $_POST['contact'];

if (empty($sessionId) || empty($age) || empty($dob) || empty($contact)) {
    echo "All fields required";
    exit();
}

$email = $redis->get("session:$sessionId");

if (!$email) {
    echo "Session expired. Please login again.";
    exit();
}

$data = [
    'email'   => $email,
    'age'     => $age,
    'dob'     => $dob,
    'contact' => $contact
];

$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$bulk    = new MongoDB\Driver\BulkWrite;

$bulk->update(
    ['email' => $email],
    ['$set'  => $data],
    ['upsert' => true]
);

$manager->executeBulkWrite('guvi.profile', $bulk);

echo "Profile updated successfully";

?>
