<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "User not logged in"]);
  exit();
}

echo json_encode(["user_id" => $_SESSION['user_id']]);
