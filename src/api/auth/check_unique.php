<?php
    include("../connect.php");

    $key = $_POST["key"];
    $column = $_POST["column"];

    // check if data with corresponding username / email has existed previously
    $query = "SELECT * FROM user WHERE $column = '$key'";    
    $data = $conn->query($query);

    // if data has existed previously, update the message inside `error-message` component and border color to red
    if ($data->num_rows > 0) {
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "This $column is unavailable.",
                "data" => "$column"
            ]
        ));
    }

    // else, return success
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "This $column is available",
            "data" => "$column"
        ]
    ));
?>
