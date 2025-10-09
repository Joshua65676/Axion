<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173"); // React origin
header("Access-Control-Allow-Credentials: true"); // Allow cookies
header("Content-Type: application/json");

// ✅ Check if session is active
if (!isset($_SESSION['user_id'])) {
  echo json_encode(["loggedIn" => false]);
  exit();
}

$user_id = $_SESSION['user_id'];

// ✅ Connect to database
$host = 'localhost';
$dbname = 'axion_bookmarks';
$username = 'root';
$password = '';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // ✅ Fetch username
  $stmt = $pdo->prepare("SELECT screen_name FROM users WHERE user_id = ?");
  $stmt->execute([$user_id]);
  $result = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($result) {
    echo json_encode([
      "loggedIn" => true,
      "user_id" => $user_id,
      "username" => $result['screen_name']
    ]);
  } else {
    echo json_encode(["loggedIn" => false]);
  }

} catch (PDOException $e) {
  error_log("DB Error: " . $e->getMessage());
  echo json_encode(["DB Error" => "Database error"]);
}