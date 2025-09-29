<?php
session_start();

if (isset($_SESSION['user_id']) && isset($_SESSION['screen_name'])) {
  echo json_encode([
    "loggedIn" => true,
    "screen_name" => $_SESSION['screen_name']
  ]);
} else {
  echo json_encode(["loggedIn" => false]);
}
