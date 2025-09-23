<?php
require_once './database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw = file_get_contents('php://input');
file_put_contents('debug_log.txt', $raw);

$data = json_decode($raw, true);
file_put_contents('decoded_log.txt', print_r($data, true));

if (!$data || !isset($data['user_id']) || !isset($data['bookmarks'])) {
    echo json_encode(['status' => 'waiting', 'message' => 'No data received yet']);
    exit;
}

$user_id = $conn->real_escape_string($data['user_id']);
$bookmarks = $data['bookmarks'];

if (empty($bookmarks)) {
    echo json_encode(['status' => 'error', 'message' => 'No bookmarks received']);
    exit;
}

foreach ($bookmarks as $tweet) {
    file_put_contents('log.txt', print_r($tweet, true), FILE_APPEND);

    // Validate tweet structure
    if (!isset($tweet['id'], $tweet['text'], $tweet['category'])) {
        continue; // Skip incomplete entries
    }

    // Sanitize inputs
    $tweet_id    = $conn->real_escape_string($tweet['id']);
    $text        = $conn->real_escape_string($tweet['text']);
    $category    = $conn->real_escape_string($tweet['category']);
    $username    = isset($tweet['username']) ? $conn->real_escape_string($tweet['username']) : '';
    $profile_pic = isset($tweet['profilePic']) ? $conn->real_escape_string($tweet['profilePic']) : '';
    $media       = isset($tweet['media']) ? $conn->real_escape_string(json_encode($tweet['media'])) : '';
    $video       = isset($tweet['video']) ? $conn->real_escape_string($tweet['video']) : '';
    $comments    = isset($tweet['comments']) ? $conn->real_escape_string($tweet['comments']) : '';
    $retweets    = isset($tweet['retweets']) ? $conn->real_escape_string($tweet['retweets']) : '';
    $likes       = isset($tweet['likes']) ? $conn->real_escape_string($tweet['likes']) : '';
    $views       = isset($tweet['views']) ? $conn->real_escape_string($tweet['views']) : '';

    // Check for duplicates
    $check = $conn->query("SELECT * FROM bookmarks WHERE tweet_id = '$tweet_id' AND user_id = '$user_id'");
    if ($check && $check->num_rows === 0) {
        $insert = $conn->query("
            INSERT INTO bookmarks (
                user_id, tweet_id, username, profile_pic, tweet_text,
                media, video, comments, retweets, likes, views, category
            ) VALUES (
                '$user_id', '$tweet_id', '$username', '$profile_pic', '$text',
                '$media', '$video', '$comments', '$retweets', '$likes', '$views', '$category'
            )
        ");

        if (!$insert) {
            file_put_contents('sql_errors.txt', "Insert failed: " . $conn->error . "\n", FILE_APPEND);
        }
    }
}

// Final response
echo json_encode(['status' => 'success', 'message' => 'Bookmarks saved successfully']);
?>