<?php
    include("connect.php");


    function runAlertScript($message) {
        echo "<script type = 'text/javascript'>
            alert('$message');
        </script>";
        echo "<script>location.href = '../register.php'</script>";
    }


    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm-password"];

    // check if the confirmed password matches inputted password
    if ($password != $confirm_password) {
        runAlertScript("Passwords do not match!");
        exit;
    }
    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE username = '$username' OR email = '$email'";
    echo "<script>alert($query);</script>";
    $data = $conn->query($query);
    echo "<script>alert('$data->num_rows');</script>";
    // if data has existed previously, update the message inside `error-message` component
    if ($data->num_rows > 0){
        runAlertScript("This e-mail / username has already been taken!");
        exit;
    }

    // test if inputting data succeed or not
    $hashed_password = hash('ripemd160', $password);
    echo "<script>alert('$hashed_password');</script>";
    echo "<script>alert('$password');</script>";
    
    $query = "INSERT INTO `user` (`username`, `email`, `password`) VALUES ('$username', '$email', '$hashed_password')";

    if ($conn->query($query) === FALSE) {
        runAlertScript("Registering data failed, please try again later :(");
        exit;
    }

    // redirect to main here
    runAlertScript("Data registered successfully!")
?>
