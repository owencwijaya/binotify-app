<?php
    include("../connect.php");

    $key = $_POST["key"];
    $column = $_POST["column"];
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
    if (!(isset($_POST["column"])) || !(isset($_POST["key"]))) {
        exit(json_encode(
            [
                "status" => 400,
                "message" => "Bad request",
                "data" => ""
            ]
        ));
    }

    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE $column = '$key'";    
    $data = $conn->query($query);

    if ($conn->error){
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error",
                "data" => $conn->error
            ]
        ));
    }

    // if data has existed previously, update the message inside `error-message` component and border color to red
    if ($data->num_rows > 0) {
        exit(json_encode(
            [
                "status" => 400,
                "message" => "This $column is unavailable.",
                "data" => "$column"
            ]
        ));
    }

    // else, return success
    exit(json_encode(
        [
            "status" => 200,
            "message" => "This $column is available",
            "data" => "$column"
        ]
    ));
?>
