<?php
    session_start();
    include "../connect.php";
    
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

    $query = "SELECT song.song_id, song.album_id, song.judul AS judul, song.penyanyi, song.tanggal_terbit, song.audio_path, song.image_path, song.duration, song.genre, album.judul AS album FROM song JOIN album ON album.album_id = song.album_id WHERE song_id = '$song_id'";
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
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "No songs found!",
                "data" => ""
            ]
        ));
    }

    if ($data->num_rows > 1) {
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
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