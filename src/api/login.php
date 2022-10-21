<?php
    include("connect.php");

    $username = $_POST["username"];
    $password = $_POST["password"];
    $hashed_password = hash('ripemd160', $password);

    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE (username = '$username' OR email = '$username') AND `password` = '$hashed_password';";    
    $data = $conn->query($query);

    // if data has existed previously, update the message inside `error-message` component
    if ($data->num_rows == 0) {
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "The username / e-mail hasn't been registered! ",
                "data" => ""
            ]
        ));
    }

    if ($data->num_rows > 1) {
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Duplicate data detected!",
                "data" => ""
            ]
        ));
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "User logged in successfully!",
            "data" => ""
        ]
    ));
?>
