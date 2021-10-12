<?php
session_start();
$_SESSION['is_logged_in'] = false;
if (session_destroy()) {
    $_SESSION['is_logged_in'] = false;
    header("Location: login.php");
}