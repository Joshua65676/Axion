<?php
// Connect to MySQL
require_once './database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

file_put_contents('debug.txt', file_get_contents('php://input'));

// Get JSON data from extension
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['user_id']) || !isset($data['bookmarks'])) {
    echo json_encode(['status' => 'waiting', 'message' => 'No data received yet']);
    exit;
}

$user_id = $conn->real_escape_string($data['user_id']);
$bookmarks = $data['bookmarks'];


foreach ($bookmarks as $tweet) {
    file_put_contents('log.txt', print_r($tweet, true), FILE_APPEND);
    $tweet_id = $conn->real_escape_string($tweet['id']);
    $text = $conn->real_escape_string($tweet['text']);
    $category = $conn->real_escape_string($tweet['category']);

    $check = $conn->query("SELECT * FROM bookmarks WHERE tweet_id = '$tweet_id' AND user_id = '$user_id'");
    if ($check->num_rows === 0) {
        $conn->query("INSERT INTO bookmarks (user_id, tweet_id, tweet_text, category) VALUES ('$user_id', '$tweet_id', '$text', '$category')");
    }
    if (empty($bookmarks)) {
       echo json_encode(['status' => 'error', 'message' => 'No bookmarks received']);
    exit;
    } else {
      echo json_encode(['status' => 'success', 'message' => 'Bookmarks saved successfully']);
  }

}


echo json_encode(['status' => 'success']);
?>
