<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
require_once './database.php';

// Start session to get user ID
session_start();
$user_id = $_SESSION['user_id'] ?? null;

// Get search term from query
$term = $_GET['query'] ?? '';
$term = trim($term);

if (!$term) {
  echo json_encode([]);
  exit;
}

// Save search term to history (only if user is logged in)
if ($user_id) {
  $stmt = $conn->prepare("
    INSERT INTO search_historys (user_id, term)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE searched_at = CURRENT_TIMESTAMP
  ");
  $stmt->bind_param("is", $user_id, $term);
  $stmt->execute();
  $stmt->close();
}

// Search tweets by username or category
$likeTerm = '%' . $term . '%';
$stmt = $conn->prepare("
  SELECT * FROM bookmarks
  WHERE username LIKE ? OR category LIKE ?
");
$stmt->bind_param("ss", $likeTerm, $likeTerm);
$stmt->execute();
$result = $stmt->get_result();

$tweets = [];
while ($row = $result->fetch_assoc()) {
  // Decode media array if stored as JSON
  $row['media'] = json_decode($row['media']);
  $tweets[] = $row;
}

echo json_encode($tweets);
$stmt->close();
$conn->close();