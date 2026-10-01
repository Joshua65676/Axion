<?php
require_once __DIR__ . '/session.php';

require "vendor/autoload.php";
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();
require_once __DIR__ . '/database.php';

use Abraham\TwitterOAuth\TwitterOAuth;


$consumerKey = $_ENV['CONSUMER_KEY'] ?? getenv('CONSUMER_KEY');
$consumerSecret = $_ENV['CONSUMER_SECRET'] ?? getenv('CONSUMER_SECRET');

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

$stmt = $conn->prepare("INSERT INTO users (user_id, screen_name, token, secret)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE screen_name = VALUES(screen_name)");
$stmt->bind_param("ssss", $user_id, $screen_name, $token, $secret);

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

if (!$stmt->execute()) {
  error_log('OAuth user save failed: ' . $stmt->error);
  http_response_code(500);
  echo "Unable to save account";
  exit;
}
$stmt->close();
$conn->close();

// Store user in session
$_SESSION['user_id'] = $user_id;
$_SESSION['screen_name'] = $screen_name;

// OPTIONAL: Store full profile in session
// $_SESSION['name'] = $name;
// $_SESSION['profile_image'] = $profile_image;
// $_SESSION['email'] = $email;

// Redirect to React dashboard
header('Location: ' . rtrim($_ENV['FRONTEND_URL'] ?? getenv('FRONTEND_URL'), '/') . '/home');
exit;
