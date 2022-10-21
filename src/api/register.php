<?php
    include("connect.php");


    function runAlert($message) {
        echo "<script type = 'text/javascript'>
            alert('$message');
        </script>";
        // header("Location: ../register.php");
    }


    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm-password"];

    // check if the confirmed password matches inputted password
    if ($password != $confirm_password) {
        runAlert ("Passwords do not match!");
        exit;
    }
    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM USER WHERE `Username` = '$username' OR email = '$email';";    
    $data = $conn->query($query);

    // if data has existed previously, update the message inside `error-message` component
    if ($data->num_rows > 0) {
        // output data of each row
        runAlert("This username/email has been registered!");
        exit;
    }

    // test if inputting data succeed or not
    $hashed_password = hash('ripemd160', $password);

    
    $query = "INSERT INTO USER (`Username`, email, `password`) VALUES ('$username', '$email', '$hashed_password');";


    if (!($conn->query($query))) {
        runAlert("Registering data failed, please try again later :(");
        exit;
    }

    // redirect to main here
    echo("<script>alert('Data registered successfully!');</script>");
    header("Location: ../login.");
?>
