<?php
require_once './database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

file_put_contents('debug_log.txt', $raw); // Logs raw JSON
file_put_contents('decoded_log.txt', print_r($data, true)); // Logs decoded array

if (!$data || !isset($data['user_id']) || !isset($data['bookmarks']) || !is_array($data['bookmarks'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid or missing data']);
    exit;
}

$user_id = $conn->real_escape_string($data['user_id']);
$bookmarks = $data['bookmarks'];

if (empty($bookmarks)) {
    echo json_encode(['status' => 'error', 'message' => 'No bookmarks received']);
    exit;
}

$saved_ids = [];

foreach ($bookmarks as $tweet) {
    if (!isset($tweet['tweet_id']) || !isset($tweet['tweet_text']) || !isset($tweet['category'])) {
        file_put_contents('sql_errors.txt', "Missing required fields for tweet: " . print_r($tweet, true) . "\n", FILE_APPEND);
        continue;
    }

    $tweet_id    = $conn->real_escape_string($tweet['tweet_id']);
    $tweet_text  = $conn->real_escape_string($tweet['tweet_text']);
    $category    = $conn->real_escape_string($tweet['category']);
    $username    = isset($tweet['username']) ? $conn->real_escape_string($tweet['username']) : '';
    $profile_pic = isset($tweet['profilePic']) ? $conn->real_escape_string($tweet['profilePic']) : '';
    $media       = isset($tweet['media']) ? $conn->real_escape_string(json_encode($tweet['media'])) : '';
    $video       = isset($tweet['video']) ? $conn->real_escape_string($tweet['video']) : '';
    $comments    = isset($tweet['comments']) ? $conn->real_escape_string($tweet['comments']) : '';
    $retweets    = isset($tweet['retweets']) ? $conn->real_escape_string($tweet['retweets']) : '';
    $likes       = isset($tweet['likes']) ? $conn->real_escape_string($tweet['likes']) : '';
    $views       = isset($tweet['views']) ? $conn->real_escape_string($tweet['views']) : '';
    $is_verified = isset($tweet['is_verified']) ? (int) $tweet['is_verified'] : 0;
    $stickers    = isset($tweet['stickers']) ? $conn->real_escape_string(json_encode($tweet['stickers'])) : '';
    $timestamp   = date("Y-m-d H:i:s");

    $sql = "INSERT INTO bookmarks (
            user_id, tweet_id, username, profile_pic, tweet_text,
            media, video, comments, retweets, likes, views,
            category, is_verified, stickers, created_at, updated_at
        ) VALUES (
            '$user_id', '$tweet_id', '$username', '$profile_pic', '$tweet_text',
            '$media', '$video', '$comments', '$retweets', '$likes', '$views',
            '$category', '$is_verified', '$stickers', '$timestamp', '$timestamp'
        )
        ON DUPLICATE KEY UPDATE
            tweet_text = '$tweet_text',
            username = '$username',
            profile_pic = '$profile_pic',
            media = '$media',
            video = '$video',
            comments = '$comments',
            retweets = '$retweets',
            likes = '$likes',
            views = '$views',
            category = '$category',
            is_verified = '$is_verified',
            stickers = '$stickers',
            updated_at = '$timestamp';";

    $insert = $conn->query($sql);

    if ($insert) {
        $saved_ids[] = $tweet_id;
    } else {
        file_put_contents('sql_errors.txt', "Insert failed for $tweet_id: " . $conn->error . "\nSQL: $sql\n", FILE_APPEND);
    }
}

echo json_encode([
    'status' => 'success',
    'message' => 'Bookmarks saved successfully',
    'saved_count' => count($saved_ids),
    'saved_ids' => $saved_ids,
    'timestamp' => date("Y-m-d H:i:s")
]);
?>