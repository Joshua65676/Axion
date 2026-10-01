<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/session.php';
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "User not logged in"]);
  exit();
}

echo json_encode(["user_id" => $_SESSION['user_id']]);
