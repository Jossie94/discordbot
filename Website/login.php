<?php
$isLoggedIn = false;
include("Website/src/config.php");
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>P4 Discord Website</title>
    <link rel="stylesheet" href="dist/style/style.css">
</head>
<body>
<nav>
    <ul>
        <li><a href="index.php">RPS Leaderboard</a></li>
        <?php if ($isLoggedIn) { ?>
            <li><a href="logging.php">Logging</a></li>
        <?php } ?>
        <li><a href="login.php">Login</a></li>
    </ul>
</nav>
<section>
    <?php
    $username = $_POST("username");
    $password = $_POST("password");

    if ($username || $password !== null) {

    }

    ?>
    <div class="login">
        <form action="" method="post">
            <label for="username">Username</label>
            <input type="text" id="username" class="username" placeholder="Username" name="username">
            <label for="password">Password</label>
            <input type="password" id="password" class="password" placeholder="password" name="password">
            <input type="submit" value="Login" class="login-btn">
        </form>
    </div>
</section>
</body>
</html>