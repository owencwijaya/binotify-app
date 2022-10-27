<?php
include "../connect.php";

$album_id = $_POST["album_id"];

$query = "SELECT * FROM album WHERE album_id = '$album_id';";
$data = $conn->query($query);
if(!$data){
    http_response_code(500);
    exit(json_encode(
        [
            "status" => 500,
            "message" => "Internal server error: ".$conn->error,
            "data" => $conn->error
        ]
    ));
}

if ($data->num_rows == 0) {
    http_response_code(503);
    exit(json_encode(
        [
            "status" => 503,
            "message" => "Album songs found!",
            "data" => $query
        ]
    ));
}

if ($data->num_rows > 1) {
    http_response_code(501);
    exit(json_encode(
        [
            "status" => 501,
            "message" => "Duplicate data detected!",
            "data" => ""
        ]
    ));
}

if ($data->num_rows == 1) {
    $song = $data->fetch_assoc();
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $song
        ]
    ));
}
?>