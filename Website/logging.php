<?php
$isLoggedIn = false;
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
        <?php if ($isLoggedIn){?>
            <li><a href="logging.php">Logging</a></li>
        <?php } ?>
        <li><a href="login.php">Login</a></li>
    </ul>
</nav>
<section>
    <table>
        <!--  DO WORK HERE  -->
        <tr>
            <th>ID</th>
            <th>Command</th>
            <th>Caster</th>
            <th>Target</th>
            <th>Date</th>
        </tr>
        <?php
        // SQL query to interact with info from our database
        $sql = mysqli_query(mysqli_connect("projectfritid.com","Skole","Skole123","discordbot"),"SELECT * FROM log ORDER BY id DESC LIMIT 10");
        $i = 0;
        // Establish the output variable

        while($row = mysqli_fetch_array($sql)){
            echo "<tr>";
            echo "<td>".$row['id']."</td>";
            echo "<td>".$row['command']."</td>";
            echo "<td>".$row['caster']."</td>";
            echo "<td>".$row['target']."</td>";
            echo "<td>".$row['timestamp']."</td>";
            echo "</tr>";
        }
        ?>
    </table>
</section>
</body>
</html>