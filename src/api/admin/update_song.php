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
$judul = $_POST["judul"];
$penyanyi = $_POST["penyanyi"];
$tanggal_terbit = $_POST["tanggal_terbit"];
$genre = $_POST["genre"];
$audio = $_FILES["audio"];
$image = $_FILES["image"];
$album_id = $_POST["album_id"];
$duration = $_POST["duration"];

$targetDir = $_SERVER["DOCUMENT_ROOT"] . "/assets/";
$baseFilename = time() . "-";

// save file audio
$audio_path = "assets/songs/" . $baseFilename . basename($audio["name"]);
$target_audio_path = $targetDir ."songs/" . $baseFilename . basename($audio["name"]);
$type_audio = strtolower(pathinfo($target_audio_path, PATHINFO_EXTENSION));
$type_audio_allowed = array("mp3", "wav", "ogg");

// cek tipe audio
if (!in_array($type_audio, $type_audio_allowed)) {
    http_response_code(400);
    exit(json_encode(
        [
            "status" => 400,
            "message" => "Audio file must be mp3, wav, or ogg",
            "data" => $audio, $type_audio, $type_audio_allowed
        ]
    ));
}

// move upload file
if (!move_uploaded_file($_FILES["audio"]["tmp_name"], $target_audio_path)) {
    http_response_code(501);
    exit(json_encode(
        [
            "status" => 501,
            "message" => "Failed to upload audio file!",
            "data" => ["audio" => $_FILES["audio"], "target" => $target_audio_path]
        ]
    ));
}


// save file image
$image_path = "assets/images/" . $baseFilename  . basename($image["name"]);
$target_image_path = $targetDir . "images/" . $baseFilename  . basename($image["name"]);
$type_image = strtolower(pathinfo($target_image_path, PATHINFO_EXTENSION));
$type_image_allowed = array("jpg", "jpeg", "png");

if ($image["size"] <= 0 || !in_array($type_image, $type_image_allowed)) {
    http_response_code(400);
    exit(json_encode(
        [
            "status" => 400,
            "message" => "Image file must be jpg, jpeg, or png",
            "data" => ""
        ]
    ));
}


if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_image_path)) {
    http_response_code(501);
    exit(json_encode(
        [
            "status" => 501,
            "message" => "Failed to upload image file!",
            "data" => ""
        ]
    ));
}

if ($album_id == "0") {
    $album_id = "NULL";
}

$query = "UPDATE song SET judul = '$judul', penyanyi = '$penyanyi', tanggal_terbit = '$tanggal_terbit', genre = '$genre', audio_path = '$audio_path', image_path = '$image_path', album_id = $album_id, duration = '$duration' WHERE song_id = '$song_id'";
$data = $conn->query($query);

if ($data) {
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Song updated successfully",
            "data" => $data
        ]
    ));
} else {
    http_response_code(500);
    exit(json_encode(
        [
            "status" => 500,
            "message" => "Failed to update song",
            "data" => $query
        ]
    ));
}

?>