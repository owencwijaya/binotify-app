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

//get duration and album_id
$query = "SELECT duration, album_id FROM song WHERE song_id = '$song_id';";
$data = $conn->query($query);

if(!$data){
    http_response_code(501);
    exit(json_encode(
        [
            "status" => 501,
            "message" => "Unable to get duration and album_id",
            "data" => ""
        ]
    ));
}

$song_det = $data -> fetch_assoc();

$dur = $song_det["duration"];
$ai = $song_det["album_id"];

if($dur != "NULL"){
    $query = "SELECT total_duration FROM album WHERE album_id = '$ai';";
    $data = $conn->query($query);

    if(!$data){
        http_response_code(502);
        exit(json_encode(
            [
                "status" => 502,
                "message" => "Unable to get total duration of album_id",
                "data" => ""
            ]
            ));
    }

    $album = $data -> fetch_assoc();
    $durNew =  ((int)$album["total_duration"]) - ((int)$dur);

    $query = "UPDATE album SET total_duration = '$durNew'  WHERE album_id = '$ai';";
    $data = $conn->query($query);

    if(!$data){
        http_response_code(503);
        exit(json_encode(
            [
                "status" => 503,
                "message" => "Unable to set total duration on album_id",
                "data" => ""
            ]
            ));
    }
}

// delete song
$query = "DELETE FROM song WHERE song_id = $song_id";
$data = $conn->query($query);



if ($data) {
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Song deleted successfully",
            "data" => ""
        ]
    ));
} else {
    http_response_code(500);
    exit(json_encode(
        [
            "status" => 500,
            "message" => "Internal server error",
            "data" => ""
        ]
    ));
}

?>