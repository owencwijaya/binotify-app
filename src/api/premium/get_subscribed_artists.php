<?php
    session_start();
    include("../connect.php");

    $session_id = $_POST["session_id"];

    $current_id = session_id();

    if ($session_id != $current_id || $session_id == "") {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are unauthorized to access this endpoint!",
                "data" => ""
            ]
        ));
    }

    $user_id = intval($_SESSION["user_id"]);

    $query = "SELECT creator_id FROM subscription WHERE subscriber_id = $user_id AND status = 'ACCEPTED'";
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

    $artists = [];

    if ($data->num_rows == 0) {
        http_response_code(200);
        exit(json_encode(
            [
                "status" => 200,
                "message" => "Success",
                "data" => []
            ]
        ));
    }



    while ($row = $data->fetch_assoc()) {
        $artists[] = $row["creator_id"];
    }
    
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $artists
        ]
    ));

