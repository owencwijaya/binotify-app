<?php
    session_start();

    if (isset($_SESSION['username'])) {
        header("Location: main.php");
    }
?>

<?php

?>

<!DOCTYPE html>

<html lang = "en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel = "stylesheet" href = "assets/styles/index.css">
        <link rel = "stylesheet" href = "assets/styles/login-register.css">

        <title>Login | Spoox</title>
    </head>

    <body>
        <div class = "bg-image"></div>

        <div class = "centered-box">
            <h1>Login</h1>

            <form action = "register.php" method = "post">
                <div class = "form-element">
                    <label for = "username">Username / Email</label>
                    <input type = "text" name = "username" id = "username" placeholder = "Insert your username here..." required>
                </div>
                <div class = "form-element">
                    <label for = "password">Password</label>
                    <input type = "password" name = "password" id = "password" placeholder = "Insert your password here..." required>
                </div>

                <button type = "submit" id = "login-selection-button" class = "inline-button">LOGIN</button>
            </form> 

            <p class = "error-message"></p>

            <p>Don't have an account? <a href = "register.php">Register</a></p> 
        </div>
    </body>
</html>
