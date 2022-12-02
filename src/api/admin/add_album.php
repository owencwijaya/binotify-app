<?php
    include "../connect.php";
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

    $judul = $_POST["title"];
    $penyanyi = $_POST['singer'];
    $genre = $_POST['genre'];
    $tanggal_terbit = $_POST['tanggalTerbit'];

    $tartgetDir = __DIR__.'/../../assets/';
    $baseFileName = time() . "-" ;

    //image path
    $replacedImg  = str_replace(' ', '_', basename($_FILES["f_image"]["name"]));
    $tempName = $baseFileName . $replacedImg;
    $targetImgPath = $tartgetDir . 'images/' . $tempName;
    $fileImgType = strtolower(pathinfo($targetImgPath,PATHINFO_EXTENSION));
    $imgTypesAllowed = array("jpg","jpeg", "png");

    //cek tipe image
    if(!file_exists($_FILES["f_image"]["tmp_name"])|| !in_array($fileImgType,$imgTypesAllowed)){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "File bukan gambar atau tipe gambar tidak sesuai ". $fileImgType,
                "data" => $_FILES["f_image"]["size"]
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

    $imgPath = 'assets/images/' . $tempName;

    $query = "INSERT INTO album (judul, penyanyi, image_path, genre, tanggal_terbit, total_duration) 
            VALUES ('$judul', '$penyanyi', '$imgPath', '$genre', '$tanggal_terbit', 0);";
    
    
    if(!$conn->query($query)){
        http_response_code(501);
        exit(json_encode(
            [
                "status" => 501,
                "message" => "Error in adding album, please try again later!",
                "data" => $query
            ]
        ));
    }
    
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Berhasil menambahkan album",
            "data" => ""
        ]
    ));
?>