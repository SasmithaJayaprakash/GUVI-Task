<?php

$conn = new mysqli(
    "localhost",
    "guviuser",
    "Guvi@123",
    "guvi"
);

if($conn->connect_error){

    die(
        "Connection failed: " .
        $conn->connect_error
    );

}

?>
