<?php

$host = 'sql308.infinityfree.com';
$dbname = 'if0_40694885_axion';
$username = 'if0_40694885';
$password = 'Joshua65676';


$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

?>