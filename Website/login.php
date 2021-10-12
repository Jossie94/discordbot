<?php /** @noinspection PhpUndefinedVariableInspection */
session_start();
include("src/config.php");
$error = "";
if (!isset($_SESSION['is_logged_in'])) {
    $_SESSION['is_logged_in'] = false;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);


    $query = "SELECT login_name, login_password FROM user WHERE login_name = '$username' AND login_password = '$password'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    $count = mysqli_num_rows($result);

    if ($count == 1) {

        $_SESSION['login_user'] = $username;
        $_SESSION['is_logged_in'] = true;

        header("location: logging.php");
    } else {
        $error = "Your Login Name or Password is invalid";
    }
}
$isLoggedIn = $_SESSION['is_logged_in'];
?>
<html lang="en-US">
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
        <?php if (!$isLoggedIn): ?>
            <li><a href="login.php">Login</a></li>
        <?php else: ?>
            <li><a href="logout.php">Logout</a></li>
        <?php endif; ?>
    </ul>
</nav>
<section>
    <div class="login">
        <div class="error"><?= $error ?></div>
        <form action="" method="post">
            <label for="username">Username</label>
            <input type="text" id="username" class="username" placeholder="Username" name="username">
            <label for="password">Password</label>
            <input type="password" id="password" class="password" placeholder="Password" name="password">
            <input type="submit" value="Login" class="login-btn">
        </form>
    </div>
</section>
</body>
</html>