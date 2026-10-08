<?php
require "vendor/autoload.php";
Dotenv\Dotenv::createImmutable(__DIR__)->safeLoad();

use Abraham\TwitterOAuth\TwitterOAuth;

require_once __DIR__ . '/session.php';

$consumerKey = $_ENV['CONSUMER_KEY'] ?? getenv('CONSUMER_KEY');
$consumerSecret = $_ENV['CONSUMER_SECRET'] ?? getenv('CONSUMER_SECRET');

$callbackUrl = rtrim($_ENV['API_BASE_URL'] ?? getenv('API_BASE_URL') ?: 'https://axion-api-1ylh.onrender.com', '/') . '/twitter-callback.php';

$connection = new TwitterOAuth($consumerKey, $consumerSecret);
$request_token = $connection->oauth('oauth/request_token', ['oauth_callback' => $callbackUrl]);

$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

$url = $connection->url('oauth/authorize', ['oauth_token' => $request_token['oauth_token']]);
header('Location: ' . $url);
exit;
