<?php
require_once '../database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Get tweet ID
$tweet_id = $_GET['id'] ?? null;
if (!$tweet_id) {
  http_response_code(400);
  echo json_encode(["error" => "Missing tweet ID"]);
  exit;
}

// Fetch tweet
$stmt = $conn->prepare("SELECT * FROM bookmark WHERE tweet_id = ?");
$stmt->bind_param("i", $tweet_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  http_response_code(404);
  echo json_encode(["error" => "Tweet not found"]);
} else {
  $tweet = $result->fetch_assoc();
  $tweet['media'] = json_decode($tweet['media']);
  echo json_encode($tweet);
}

$stmt->close();
$conn->close();