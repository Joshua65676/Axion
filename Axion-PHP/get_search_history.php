<?php
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json");
require_once './database.php';

$user_id = $_SESSION['user_id']; // Or from token

$stmt = $conn->prepare("SELECT term FROM search_historys WHERE user_id = ? ORDER BY searched_at DESC LIMIT 10");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$terms = [];
while ($row = $result->fetch_assoc()) {
  $terms[] = $row['term'];
}

echo json_encode($terms);
$stmt->close();
$conn->close();
