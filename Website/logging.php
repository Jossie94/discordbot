<?php
if(!isset($_SESSION['is_logged_in'])){
    $_SESSION['is_logged_in'] = false;
}
include("src/config.php");
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
                <th>ID</th>
                <th>Command</th>
                <th>Caster</th>
                <th>Target</th>
                <th>Date</th>
            </tr>
            <?php
            // SQL query to interact with info from our database
            $styling = '';
            $sql = mysqli_query($conn, "SELECT * FROM log ORDER BY id LIMIT 10");
            $i = 0;
            // Establish the output variable

            while ($row = mysqli_fetch_array($sql)) {
                //could've been done front end with nth element, but I want to show of my back end not front end
                $styling = ($i % 2) ? 'background-color: darkgrey;' : 'background-color: grey;';

                echo "<tr>";
                echo "<td style='{$styling}'>" . $row['id'] . "</td>";
                echo "<td style='{$styling}'>" . $row['command'] . "</td>";
                echo "<td style='{$styling}'>" . $row['caster'] . "</td>";
                echo "<td style='{$styling}'>" . $row['target'] . "</td>";
                echo "<td style='{$styling}'>" . $row['timestamp'] . "</td>";
                echo "</tr>";
                $i++;
            }
            //todo fix search for post get
            ?>
        </table>
        <div class="search-div">
            <form action="logging.php">
                <label for="caster">Caster
                    <input id="caster" type="text">
                </label>
                <div></div>
                <label for="target">Target
                    <input id="target" type="text" >
                </label>
                <div ></div>
                <label for="message">Message
                    <input id="message" type="text" >
                </label>
                <input type="submit" value="submit" style="">
            </form>
        </div>
    </div>
</section>
</body>
</html>