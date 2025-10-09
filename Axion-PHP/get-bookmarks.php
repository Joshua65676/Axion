<?php
header("Access-Control-Allow-Origin: *");
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

  $stmt = $pdo->prepare("SELECT tweet_text, username, saved_at, category, media  FROM bookmarks WHERE user_id = ?");
  $stmt->execute([$user_id]);
  $bookmarks = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(["bookmarks" => $bookmarks]);
} catch (PDOException $e) {
  echo json_encode(["error" => "Database error"]);
}