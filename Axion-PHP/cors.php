<?php

require_once __DIR__ . '/vendor/autoload.php';
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();

$frontendUrl = rtrim($_ENV['FRONTEND_URL'] ?? getenv('FRONTEND_URL') ?: 'http://localhost:5173', '/');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowedOrigins = [
    $frontendUrl,
    'http://localhost',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://x.com',
    'https://www.x.com',
    'https://twitter.com',
    'https://www.twitter.com',
];

$allowedOrigin = false;

foreach ($allowedOrigins as $allowed) {
    if ($origin !== '' && $origin === $allowed) {
        $allowedOrigin = true;
        break;
    }
}

if ($origin !== '' && (preg_match('#^chrome-extension://#', $origin) || $allowedOrigin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
