<?php
require "vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

$consumerKey = $_ENV['CONSUMER_KEY'];
$consumerSecret = $_ENV['CONSUMER_SECRET'];

// Validate session tokens
if (!isset($_SESSION['oauth_token']) || !isset($_SESSION['oauth_token_secret'])) {
  die('Session expired or invalid. Please start the login flow again.');
}

// Validate returned oauth_token
if (!isset($_REQUEST['oauth_token']) || $_REQUEST['oauth_token'] !== $_SESSION['oauth_token']) {
  die('Invalid token');
}

// Create Twitter connection with request token
$connection = new TwitterOAuth(
  $consumerKey,
  $consumerSecret,
  $_SESSION['oauth_token'],
  $_SESSION['oauth_token_secret']
);

// Exchange for access token
$access_token = $connection->oauth("oauth/access_token", [
  "oauth_verifier" => $_REQUEST['oauth_verifier']
]);

// Extract minimal user info
$user_id = $access_token['user_id'];
$screen_name = $access_token['screen_name'];
$token = $access_token['oauth_token'];
$secret = $access_token['oauth_token_secret'];

// OPTIONAL: Fetch full user profile (requires paid tier)
// $userConnection = new TwitterOAuth(
//   $consumerKey,
//   $consumerSecret,
//   $token,
//   $secret
// );

// $user = $userConnection->get("account/verify_credentials", [
//   "include_email" => "true",
//   "skip_status" => "true"
// ]);

// OPTIONAL: Extract full profile fields
// $name = $user->name;
// $profile_image = $user->profile_image_url_https;
// $email = isset($user->email) ? $user->email : null;

// Connect to MySQL
$conn = new mysqli("localhost", "root", "", "axion_bookmarks");

// Save to database (minimal version)
$sql = "INSERT INTO users (user_id, screen_name, token, secret)
        VALUES ('$user_id', '$screen_name', '$token', '$secret')
        ON DUPLICATE KEY UPDATE screen_name='$screen_name'";

// OPTIONAL: Save full profile fields once available
/*
$sql = "INSERT INTO users (user_id, name, screen_name, profile_image, email, token, secret)
        VALUES ('$user_id', '$name', '$screen_name', '$profile_image', '$email', '$token', '$secret')
        ON DUPLICATE KEY UPDATE 
          name='$name', 
          screen_name='$screen_name', 
          profile_image='$profile_image', 
          email='$email'";
*/

if (!$conn->query($sql)) {
  echo "SQL Error: " . $conn->error;
  exit;
}

// Store user in session
$_SESSION['user_id'] = $user_id;
$_SESSION['screen_name'] = $screen_name;

// OPTIONAL: Store full profile in session
// $_SESSION['name'] = $name;
// $_SESSION['profile_image'] = $profile_image;
// $_SESSION['email'] = $email;

// Redirect to React dashboard
header('Location: http://localhost:5173/home');
exit;