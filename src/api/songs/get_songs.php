<?php
    session_start();
    include("../connect.php");

    $song_id = $_POST["song_id"];
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

    $query = "SELECT * FROM song ORDER BY judul ASC";
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

    if ($data->num_rows == 0) {
        http_response_code(404);
        exit(json_encode(
            [
                "status" => 404,
                "message" => "No songs found!",
                "data" => ""
            ]
        ));
    }


    $songs = [];
    while ($row = $data->fetch_assoc()) {
        $songs[] = $row;
    }
    
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $songs
        ]
    ));
?>
