<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "Not logged in"]);
  exit();
}

$user_id = $_SESSION['user_id'];

try {
  $pdo = new PDO("mysql:host=localhost;dbname=axion_bookmarks", "root", "");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $pdo->prepare("SELECT tweet_id, tweet_text, username, profile_pic, media, video, likes, retweets, comments, views, stickers, is_verified, category, created_at, updated_at
  FROM bookmarks
  WHERE user_id = ?");
  $stmt->execute([$user_id]);
  $bookmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(["bookmarks" => $bookmarks]);
} catch (PDOException $e) {
  echo json_encode(["error" => "Database error"]);
}
