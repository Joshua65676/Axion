<?php

require_once __DIR__ . '/vendor/autoload.php';
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();

$host = $_ENV['DB_HOST'] ?? getenv('DB_HOST');
$dbname = $_ENV['DB_NAME'] ?? getenv('DB_NAME');
$username = $_ENV['DB_USER'] ?? getenv('DB_USER');
$password = $_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD');

if (!$host || !$dbname || !$username || $password === false || $password === null) {
    http_response_code(500);
    error_log('Database configuration is incomplete');
    die(json_encode(['status' => 'error', 'message' => 'Database configuration error']));
}

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    error_log('Database connection failed: ' . $conn->connect_error);
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}
