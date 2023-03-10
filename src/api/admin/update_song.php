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
// $penyanyi = $_POST["penyanyi"];
$tanggal_terbit = $_POST["tanggal_terbit"];
$genre = $_POST["genre"];
$audio = $_FILES["audio"];
$image = $_FILES["image"];
$album_id = $_POST["album_id"];
$duration = $_POST["duration"];

$targetDir = $_SERVER["DOCUMENT_ROOT"] . "/assets/";
$baseFilename = time() . "-";

if ($album_id == "0") {
    $album_id = "NULL";
}
$query = "SELECT duration, album_id FROM song WHERE song_id = '$song_id';";

$data = $conn -> query ($query);

if(!$data){
    http_response_code(504);
    exit(json_encode(
        [
            "status" => 504,
            "message" => "Failed to get duration and album_id song",
            "data" => $query . " " . $conn->error
        ]
    ));
}

$song = $data -> fetch_assoc();

if($album_id != $song["album_id"] && $song["album_id"] != "0"){
    $albumLama = $song["album_id"];
    $query = "SELECT total_duration FROM album WHERE album_id = '$albumLama';";
    $data = $conn -> query($query);

    if(!$data){
        http_response_code(505);
        exit(json_encode(
            [
                "status" => 505,
                "message" => "Failed to get duration and album_id song",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    $durtot =  $data -> fetch_assoc()["total_duration"];

    $newDur = ((int)$durtot) - ((int) $song["duration"]);

    $query = "UPDATE album SET total_duration = '$newDur' WHERE album_id = '$albumLama';";

    $data = $conn -> query($query);

    if(!$data){
        http_response_code(506);
        exit(json_encode(
            [
                "status" => 506,
                "message" => "Failed to update  total_duration on old album",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    $query = "SELECT total_duration FROM album WHERE album_id = '$album_id';";
    $data = $conn -> query($query);

    if(!$data){
        http_response_code(507);
        exit(json_encode(
            [
                "status" => 507,
                "message" => "Failed to get duration and album_id song",
                "data" => $query . " " . $conn->error
            ]
        ));
    }

    $durtotAB =  $data -> fetch_assoc()["total_duration"];

    $newDurAB = ((int)$durtotAB) + ((int) $song["duration"]);
    $query = "UPDATE album SET total_duration = '$newDurAB' WHERE album_id = '$album_id';";

    $data = $conn -> query($query);

    if(!$data){
        http_response_code(508);
        exit(json_encode(
            [
                "status" => 508,
                "message" => "Failed to update  total_duration on new album",
                "data" => $query . " " . $conn->error
            ]
        ));
    }


}

$query = "UPDATE song SET judul = '$judul', tanggal_terbit = '$tanggal_terbit', genre = '$genre', album_id = $album_id";

// save file audio
if (!is_null($audio)) {
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

    $query = $query . ", audio_path = '$audio_path'" . ", duration = $duration";
} 

// save file image
if (!is_null($image)) {
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

    $query = $query . ", image_path = '$image_path'";
}

$query = $query . " WHERE song_id = '$song_id'";
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
            "data" => $query . " " . $conn->error
        ]
    ));
}

?>