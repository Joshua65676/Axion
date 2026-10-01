<?php
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json");
require_once './database.php';
require_once __DIR__ . '/session.php';

$user_id = $_SESSION['user_id'] ?? null;
$tweet_id = $_POST['tweet_id'] ?? null;
$new_category = $_POST['category'] ?? '';

if (!$user_id || !$tweet_id || !$new_category) {
  echo json_encode(['success' => false]);
  exit;
}

$stmt = $conn->prepare("UPDATE bookmark SET category = ? WHERE tweet_id = ? AND user_id = ?");
$stmt->bind_param("sii", $new_category, $tweet_id, $user_id);
$success = $stmt->execute();

echo json_encode(['success' => $success]);
$stmt->close();
$conn->close();
