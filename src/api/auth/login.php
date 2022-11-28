<?php
    include("../connect.php");

    $username = $_POST["username"];
    $password = $_POST["password"];
    $hashed_password = hash('ripemd160', $password);
    $session_id = $_POST["session_id"];

    session_start();

    if ($session_id != session_id() || $session_id == "") {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are unauthorized to access this endpoint!",
                "data" => ""
            ]
        ));
    }


    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE (username = '$username' OR email = '$username');";    
    $data = $conn->query($query);

    if ($conn->error){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error",
                "data" => $conn->error
            ]
        ));
    }

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

    $user_data = $data->fetch_array(MYSQLI_ASSOC);

    if ($user_data["password"] != $hashed_password){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "Wrong username / password",
                "data" => ""
            ]
        ));
    }

    session_regenerate_id();
    $session_id = session_id();
    $_SESSION["username"] = $username;
    $_SESSION["user_id"] = $user_data["user_id"];
    $_SESSION["isadmin"] = $user_data["isadmin"];

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "User logged in successfully!",
            "data" => json_encode(
                [
                    "username" => $username,
                    "session_id" => $session_id,
                    "isadmin" => $user_data["isadmin"],
                    "user_id" => $user_data["user_id"]
                ]
            )
        ]
    ));
?>
