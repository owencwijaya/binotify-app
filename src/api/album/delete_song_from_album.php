<?php
    include "../connect.php";

    // check is admin
    session_start();
    $session_id = $_POST["session_id"];

    $current_id = session_id();

    if ($session_id != $current_id || $session_id == "") {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are unauthorized to access this endpoint!",
                "data" => $session_id, $current_id
            ]
        ));
    }

    if (!($_SESSION["isadmin"])) {
        http_response_code(403);
        exit(json_encode(
            [
                "status" => 403,
                "message" => "Forbidden; not admin user",
                "data" => ""
            ]
        ));
    }

    $song_id = $_POST["song_id"];

    $query = "SELECT duration,album_id FROM song WHERE song_id =  '$song_id';";

    $data = $conn -> query ($query);

    if(!$data){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Failed to get song",
                "data" => $query . " " . $conn->error
            ]
        ));
    }


    if ($data->num_rows == 0) {
        http_response_code(404);
        exit(json_encode(
            [
                "status" => 404,
                "message" => "No albums found!",
                "data" => ""
            ]
        ));
    }

    $song = $data->fetch_assoc();

    $album_id = $song["album_id"];

    $query = "SELECT total_duration FROM album WHERE album_id = '$album_id';";

    $data = $conn -> query($query);

    if(!$data){
        http_response_code(502);
        exit(json_encode(
            [
                "status" => 502,
                "message" => "Failed get album duration",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    $album = $data -> fetch_assoc();

    $query = "UPDATE song SET album_id = NULL WHERE song_id = '$song_id';";

    $data = $conn -> query ($query);

    if(!$data){
        http_response_code(501);
        exit(json_encode(
            [
                "status" => 501,
                "message" => "Failed to update song",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    

    $dur = ((int) $album["total_duration"]) - ((int) $song["duration"]);

    $query = "UPDATE album SET total_duration = '$dur' WHERE  album_id = '$album_id'";

    $data = $conn -> query($query);

    if(!$data){
        http_response_code(503);
        exit(json_encode(
            [
                "status" => 503,
                "message" => "Failed to update album",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $song
        ]
    ));

?>