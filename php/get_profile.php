<?php

include 'redis.php';

$sessionId = $_POST['sessionId'];

if (!$sessionId) {
    echo json_encode(['status' => 'error', 'msg' => 'No session']);
    exit();
}

$email = $redis->get("session:$sessionId");

if (!$email) {
    echo json_encode(['status' => 'error', 'msg' => 'Session expired']);
    exit();
}

$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

$filter = ['email' => $email];
$query  = new MongoDB\Driver\Query($filter);

$cursor = $manager->executeQuery('guvi.profile', $query);
$docs   = $cursor->toArray();

if (count($docs) > 0) {
    $profile = (array) $docs[0];

    // Convert date from any format to YYYY-MM-DD for HTML date input
    $dob = $profile['dob'] ?? '';
    if ($dob) {
        $parsed = date_create($dob);
        if ($parsed) {
            $dob = date_format($parsed, 'Y-m-d');
        }
    }

    echo json_encode([
        'status'  => 'success',
        'age'     => $profile['age']     ?? '',
        'dob'     => $dob,
        'contact' => $profile['contact'] ?? ''
    ]);
} else {
    echo json_encode(['status' => 'success', 'age' => '', 'dob' => '', 'contact' => '']);
}

?>
