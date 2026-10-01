<?php
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json");

require_once __DIR__ . '/session.php';
session_unset();
session_destroy();

echo json_encode(["message" => "Logged out"]);
