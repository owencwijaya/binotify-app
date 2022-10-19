<!DOCTYPE html>

<html lang = "en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel = "stylesheet" href = "assets/styles/index.css">
        <link rel = "stylesheet" href = "assets/styles/login-register.css">

        <title>Welcome to Spoox!</title>
    </head>

    <body>
        <div class = "bg-image"></div>

        <div class = "centered-box">
            <h1>Tugas SI knp rilis lagi :(</h1>

            <button id = "login-selection-button" class = "inline-button">LOGIN</button>
            <button id = "register-selection-button" class = "inline-button">REGISTER</button>
        </div>
    </body>

    <script type = "text/javascript">
        document.getElementById("login-selection-button").onclick = () => { location.href = "login.php"; };
        document.getElementById("register-selection-button").onclick = () => { location.href = "register.php"; };
    </script>
</html>
