<?php
$isLoggedIn = false;
$id = '';//todo add user id on login
//$sql = mysqli_query(mysqli_connect("projectfritid.com", "Skole", "Skole123", "discordbot"), "SELECT is_dev FROM user WHERE id = {$id}");
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
    <table style="border-spacing: 4px; background-color: lightgreen; float: right">
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
        $sql = mysqli_query(mysqli_connect("projectfritid.com", "Skole", "Skole123", "discordbot"), "SELECT * FROM log ORDER BY id LIMIT 10");
        $i = 0;
        // Establish the output variable

        while ($row = mysqli_fetch_array($sql)) {
            $styling = ($i % 2) ? 'background-color: darkgrey;' : 'background-color: grey;';

            echo "<tr>";
            echo "<td style='padding: 5px; {$styling}'>" . $row['id'] . "</td>";
            echo "<td style='padding: 5px; {$styling}'>" . $row['command'] . "</td>";
            echo "<td style='padding: 5px; {$styling}'>" . $row['caster'] . "</td>";
            echo "<td style='padding: 5px; {$styling}'>" . $row['target'] . "</td>";
            echo "<td style='padding: 5px; {$styling}'>" . $row['timestamp'] . "</td>";
            echo "</tr>";
            $i++;
        }
        ?>
    </table>
    <div style="margin: 10px; float: left; background-color: lightgray; width: 250px; height: 350px;">
        <form style="display: table-caption" action="logging.php">
            <label for="caster" style="margin-left: 95px;">Caster
                <input id="caster" type="text" style="margin-left: 25px;">
            </label>
            <div style="margin:15px;"></div>
            <label for="target" style="margin-left: 95px;">Target
                <input id="target" type="text" style="margin-left: 25px;">
            </label>
            <div style="margin:15px;"></div>
            <label for="message" style="margin-left: 95px;">Message
                <input id="message" type="text" style="margin-left: 25px;">
            </label>
            <input type="submit" value="submit" style="margin-left: 90px;margin-top: 15px;">
        </form>
    </div>
</section>
</body>
</html>