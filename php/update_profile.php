<?php
$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$email = $_POST['email'];
$age = $_POST['age'];
$dob = $_POST['dob'];
$contact = $_POST['contact'];
if(empty($email) || empty($age) || empty($dob) || empty($contact)){
    echo "All fields required";
    exit();
}
$data = [
    'email' => $email,
    'age' => $age,
    'dob' => $dob,
    'contact' => $contact,
    'updated_at' => date('Y-m-d H:i:s')
];
$bulk = new MongoDB\Driver\BulkWrite;
$bulk->insert($data);
$manager->executeBulkWrite('guvi.profile', $bulk);
echo "Profile updated successfully";
?>
