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

$query = "SELECT album_id, judul FROM (SELECT penyanyi FROM song WHERE song_id='$song_id') AS X JOIN album ON X.penyanyi = album.penyanyi";
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
            "message" => "No albums found!",
            "data" => ""
        ]
    ));
}

$albums = [];
while ($row = $data->fetch_assoc()) {
    $albums[] = $row;
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