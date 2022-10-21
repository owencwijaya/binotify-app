<?php
    include("../connect.php");

    $name = $_POST["name"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE username = '$username' OR email = '$email';";    
    $data = $conn->query($query);

    // if data has existed previously, update the message inside `error-message` component
    if ($data->num_rows > 0) {
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "The username / e-mail has been registered! ",
                "data" => ""
            ]
        ));
    }

    // test if inputting data succeed or not
    $hashed_password = hash('ripemd160', $password);

    $query = "INSERT INTO user (`name`, username, email, `password`) VALUES 
            ('$name', '$username', '$email', '$hashed_password');";

    if (!($conn->query($query))) {
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Error in registering user, please try again later!",
                "data" => ""
            ]
        ));
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "User registered successfully!",
            "data" => ""
        ]
    ));
?>
