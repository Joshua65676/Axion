<?php

require_once __DIR__ . '/vendor/autoload.php';
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();

$host = $_ENV['DB_HOST'] ?? getenv('DB_HOST');
$port = (int) ($_ENV['DB_PORT'] ?? $_ENV['MYSQL_PORT'] ?? getenv('DB_PORT') ?? getenv('MYSQL_PORT') ?? 3306);
$dbname = $_ENV['DB_NAME'] ?? getenv('DB_NAME');
$username = $_ENV['DB_USER'] ?? getenv('DB_USER');
$password = $_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD');
$sslCa = $_ENV['MYSQL_SSL_CA'] ?? getenv('MYSQL_SSL_CA');
$sslCert = $_ENV['MYSQL_SSL_CERT'] ?? getenv('MYSQL_SSL_CERT');
$sslKey = $_ENV['MYSQL_SSL_KEY'] ?? getenv('MYSQL_SSL_KEY');
$bundledSslCa = __DIR__ . DIRECTORY_SEPARATOR . 'certs' . DIRECTORY_SEPARATOR . 'ca.pem';

if (!empty($sslCa) && !is_readable($sslCa) && is_readable($bundledSslCa)) {
    $sslCa = $bundledSslCa;
}

if (!$host || !$dbname || !$username || $password === false || $password === null) {
    http_response_code(500);
    error_log('Database configuration is incomplete');
    die(json_encode(['status' => 'error', 'message' => 'Database configuration error']));
}

$conn = mysqli_init();
$connectionFlags = 0;

if (!empty($sslCa)) {
    $connectionFlags |= MYSQLI_CLIENT_SSL;
    if (!mysqli_ssl_set($conn, $sslKey ?: null, $sslCert ?: null, $sslCa, null, null)) {
        http_response_code(500);
        error_log('Database SSL configuration failed');
        die(json_encode(['status' => 'error', 'message' => 'Database SSL configuration failed']));
    }
}

if (!mysqli_real_connect($conn, $host, $username, $password, $dbname, $port, null, $connectionFlags)) {
    http_response_code(500);
    error_log('Database connection failed: ' . mysqli_connect_error());
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}
