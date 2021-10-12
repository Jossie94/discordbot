<?php
session_start();
include("src/config.php");
if(!isset($_SESSION['is_logged_in'])){
    $_SESSION['is_logged_in'] = false;
}
$isLoggedIn = $_SESSION['is_logged_in'];
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
        <?php if (!$isLoggedIn) { ?>
            <li><a href="login.php">Login</a></li>
        <?php } else { ?>
            <li><a href="logout.php">Logout</a></li>
        <?php } ?>
    </ul>
</nav>
<section>
    <div class="table-center">
        <table>
            <tr>
                <th>User name</th>
                <th>Points</th>
                <th>User Server ID</th>
            </tr>
            <?php
            // SQL query to interact with info from our database
            $styling = '';
            $sql = mysqli_query($conn, "SELECT * FROM leaderboard ORDER BY id LIMIT 25");

            $i = 0;
            // Establish the output variable

            while ($row = mysqli_fetch_array($sql)) {
                $styling = ($i % 2) ? 'background-color: darkgrey;' : 'background-color: grey;';
                $row2 = mysqli_query($conn, "SELECT username FROM user WHERE usertoken ={$row['u_token']}");


                echo "<tr>";
                echo "<td style='; {$styling}'>" . $row2['username'] . "</td>";
                echo "<td style='; {$styling}'>" . $row['points'] . "</td>";
                echo "<td style='; {$styling}'>" . $row['u_server'] . "</td>";
                echo "</tr>";
                $i++;
            }
            ?>
        </table>
    </div>
    <!--  DO WORK HERE  -->
</section>
</body>
</html>