<?php
    session_start();

    if (isset($_SESSION['username'])) {
        header("Location: main.php");
    }
?>

<html lang = "en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel = "stylesheet" href = "assets/styles/index.css">
        <link rel = "stylesheet" href = "assets/styles/login-register.css">

        <title>Register | Spoox</title>
    </head>

    <body>
        <div class = "bg-image"></div>

        <div class = "centered-box">
            <h1>Register</h1>

            <form action = "v1/register.php" method = "post">
                <div class = "form-element">
                    <label for = "username">Username</label>
                    <input type = "text" name = "username" id = "username" placeholder = "Insert your username here..." required>
                </div>

                <div class = "form-element">
                    <label for = "email">E-mail</label>
                    <input type = "text" name = "email" id = "email" placeholder = "Insert your e-mail here..." required>
                </div>

                <div class = "form-element">
                    <label for = "password">Password</label>
                    <input type = "password" name = "password" id = "password" placeholder = "Insert your password here..." required>
                </div>

                <div class = "form-element">
                    <label for = "confirm-password">Confirm Password</label>
                    <input type = "password" name = "confirm-password" id = "confirm-password" placeholder = "Insert your password here..." required>
                </div>

                <button type = "submit" id = "register-selection-button" class = "inline-button">REGISTER</button>
            </form> 

            <p class = "error-message"></p>

            <p>Already have an account? <a href = "login.php">Login</a></p> 
        </div>
    </body>
</html>
