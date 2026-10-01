<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/session.php';
header("Content-Type: application/json");

// ✅ Check if session is active
if (!isset($_SESSION['user_id'])) {
  echo json_encode(["loggedIn" => false]);
  exit();
}

$user_id = $_SESSION['user_id'];

require_once __DIR__ . '/database.php';

try {
  $stmt = $conn->prepare("SELECT screen_name FROM users WHERE user_id = ?");
  $stmt->bind_param("s", $user_id);
  $stmt->execute();
  $result = $stmt->get_result()->fetch_assoc();

  if ($result) {
    echo json_encode([
      "loggedIn" => true,
      "user_id" => $user_id,
      "username" => $result['screen_name']
    ]);
  } else {
    echo json_encode(["loggedIn" => false]);
  }

  $stmt->close();
  $conn->close();
} catch (mysqli_sql_exception $e) {
  error_log("DB Error: " . $e->getMessage());
  http_response_code(500);
  echo json_encode(["DB Error" => "Database error"]);
}
