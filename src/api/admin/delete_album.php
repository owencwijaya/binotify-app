<?php
    include('../connect.php');
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

    $album_id = $_POST["album_id"];

    $query = "DELETE FROM album WHERE album_id = '$album_id';";

    $data = $conn->query($query);

    if (!$data){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error",
                "data" => $conn->error
            ]
        ));
    }

    http_response_code(200);
    exit(json_encode(
    [
        "status" => 200,
        "message" => "Success",
        "data" => $albums
    ]
    ));

?>