<?php
header('Content-Type: application/json');
$email = $_POST['email'];
if(empty($email)){
    echo json_encode([]);
    exit();
}
$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$filter = ['email' => $email];
$options = ['sort' => ['_id' => -1]];
$query = new MongoDB\Driver\Query($filter, $options);
$cursor = $manager->executeQuery('guvi.profile', $query);
$results = [];
foreach($cursor as $doc){
    $results[] = [
        'age' => $doc->age,
        'dob' => $doc->dob,
        'contact' => $doc->contact,
        'updated_at' => isset($doc->updated_at) ? $doc->updated_at : 'N/A'
    ];
}
echo json_encode($results);
?>
