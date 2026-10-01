<?php
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json");
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/session.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "Not logged in"]);
  exit();
}

$user_id = $_SESSION['user_id'];

try {
  $category = $_GET['category'] ?? null;

  if ($category) {
    $stmt = $conn->prepare("SELECT tweet_id, tweet_text, username, profile_pic, tweet_url, media, video, likes, retweets, comments, views, stickers, is_verified, category, created_at, updated_at
      FROM bookmark
      WHERE user_id = ? AND category = ?");
    $stmt->bind_param("ss", $user_id, $category);
  } else {
    $stmt = $conn->prepare("SELECT tweet_id, tweet_text, username, profile_pic, tweet_url, media, video, likes, retweets, comments, views, stickers, is_verified, category, created_at, updated_at
      FROM bookmark
      WHERE user_id = ?");
    $stmt->bind_param("s", $user_id);
  }

  $stmt->execute();
  $result = $stmt->get_result();
  $bookmarks = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode(["bookmark" => $bookmarks]);
  $stmt->close();
  $conn->close();
} catch (mysqli_sql_exception $e) {
  error_log('Bookmark query failed: ' . $e->getMessage());
  http_response_code(500);
  echo json_encode(["error" => "Database error"]);
}
