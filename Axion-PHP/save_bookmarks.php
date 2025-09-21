<?php
// Connect to MySQL
require_once './database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");


// Get JSON data from extension
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['user_id']) || !isset($data['bookmarks'])) {
    echo json_encode(['status' => 'waiting', 'message' => 'No data received yet']);
    exit;
}

$user_id = $conn->real_escape_string($data['user_id']);
$bookmarks = $data['bookmarks'];


foreach ($bookmarks as $tweet) {
    $tweet_id = $conn->real_escape_string($tweet['id']);
    $text = $conn->real_escape_string($tweet['text']);
    $category = $conn->real_escape_string($tweet['category']);

    $check = $conn->query("SELECT * FROM bookmarks WHERE tweet_id = '$tweet_id' AND user_id = '$user_id'");
    if ($check->num_rows === 0) {
        $conn->query("INSERT INTO bookmarks (user_id, tweet_id, tweet_text, category) VALUES ('$user_id', '$tweet_id', '$text', '$category')");
    }
}


echo json_encode(['status' => 'success']);
?>
