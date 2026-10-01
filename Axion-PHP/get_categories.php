<?php
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json");
require_once './database.php';
require_once __DIR__ . '/session.php';

$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
  echo json_encode([]);
  exit;
}

$stmt = $conn->prepare("SELECT DISTINCT category FROM bookmark WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$categories = [];
while ($row = $result->fetch_assoc()) {
  $categories[] = $row['category'];
}

echo json_encode($categories);
$stmt->close();
$conn->close();
