<?php
require "vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

$consumerKey = $_ENV['CONSUMER_KEY'];
$consumerSecret = $_ENV['CONSUMER_SECRET'];

$callbackUrl = 'https://joshdev.infinityfreeapp.com/twitter-callback.php';

$connection = new TwitterOAuth($consumerKey, $consumerSecret);
$request_token = $connection->oauth('oauth/request_token', ['oauth_callback' => $callbackUrl]);

$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

$url = $connection->url('oauth/authorize', ['oauth_token' => $request_token['oauth_token']]);
header('Location: ' . $url);
exit;