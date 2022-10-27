<?php
    include "../connect.php";
    //session check
    session_start();

    if (!(isset($_SESSION["username"]))) {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are not logged in!",
                "data" => ""
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

    //get post
    $title = $_POST['title']; //
    $singer= $_POST['singer']; //
    $genre = $_POST['genre'];
    $duration = $_POST['f_dur']; //
    $genre = $_POST['genre']; //
    $tanggalTerbit = $_POST['tanggalTerbit'];

    $replacedAudio = str_replace(' ', '_', basename($_FILES["f_audio"]["name"]) );
    $replacedImg  = str_replace(' ', '_', basename($_FILES["f_image"]["name"]));
    //base path
    $tartgetDir = __DIR__.'/../../assets/';
    $baseFileName = time() . "-" ;

    //image path
    $targetImgPath = $tartgetDir . 'images/' . $baseFileName . $replacedImg;
    $fileImgType = strtolower(pathinfo($targetImgPath,PATHINFO_EXTENSION));
    $imgTypesAllowed = array("jpg","jpeg", "png");

    //audio path
    $targetAudioPath = $tartgetDir . 'songs/'. $baseFileName .  $replacedAudio;
    $fileAudioType = strtolower(pathinfo($targetAudioPath,PATHINFO_EXTENSION));
    $audioTypesAllowed = array("mp3", "wav");

    //cek tipe image
    if(!getimagesize($_FILES["f_image"]["tmp_name"]) || !in_array($fileImgType,$imgTypesAllowed)){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "File bukan gambar atau tipe gambar tidak sesuai",
                "data" => ""
            ]
        ));
    }
    
    //cek tipe audio
    if(!in_array($fileAudioType,$audioTypesAllowed)){
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "File audio terlalu kecil atau tipe audio tidak sesuai",
                "data" => ""
            ]
        ));
    }
    //move upload file
    if(!move_uploaded_file($_FILES["f_image"]["tmp_name"], $targetImgPath)){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Gagal upload gambar",
                "data" => ""
            ]
        ));
    }
    
    if(!move_uploaded_file($_FILES["f_audio"]["tmp_name"], $targetAudioPath)){
        http_response_code(501);
        exit(json_encode(
            [
                "status" => 501,
                "message" => "Gagal upload audio : " . $_FILES["f_audio"]["error"],
            ]
        ));
    }
    
    $imgPath = 'assets/images/' . $baseFileName . $replacedImg;
    $audioPath = 'assets/songs/' . $baseFileName . $replacedAudio;

    $query = "INSERT INTO `song` 
<<<<<<< HEAD:src/api/admin/fetchMusic.php
                (`judul`, `penyanyi`, `tanggal_terbit`, `duration`,  `image_path`, `audio_path`, `genre`) 
                VALUES 
                ('$title', '$singer', '$tanggalTerbit', '$duration', '$imgPath', '$audioPath', '$genre');"; 
=======
                (`judul`, `penyanyi`, `tanggal_terbit`, `genre`, `duration`,  `image_path`, `audio_path`) 
                VALUES 
                ('$title', '$singer', '$tanggalTerbit', '$genre', '$duration', '$imgPath', '$audioPath');"; 
>>>>>>> main:src/api/admin/add_song.php
    

    if (!($conn->query($query))) {
        http_response_code(502);
        exit(json_encode(
            [
                "status" => 502,
                "message" => "Error in adding song, please try again later! $conn->error",
                "data" => ""
            ]
        ));
    }   

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Song added successfully!",
            "data" => ""
        ]
    ));

?>