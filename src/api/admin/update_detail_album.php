<?php
    include "../connect.php";


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

$judul = $_POST["judul"];
$tanggal_terbit = $_POST["tanggal_terbit"];
$genre = $_POST["genre"];
$image = $_FILES["image"];
$album_id = $_POST["album_id"];
$image = $_FILES["image"];
$tartgetDir = __DIR__.'/../../assets/';
$baseFileName = time() . "-" ;
$query = "UPDATE album SET judul = '$judul', genre= '$genre', tanggal_terbit='$tanggal_terbit'";

if(isset($image)){
    //image path
    $replacedImg  = str_replace(' ', '_', basename($image["name"]));
    $tempName = $baseFileName . $replacedImg;
    $targetImgPath = $tartgetDir . 'images/' . $tempName;
    $fileImgType = strtolower(pathinfo($targetImgPath,PATHINFO_EXTENSION));
    $imgTypesAllowed = array("jpg","jpeg", "png");


    //cek tipe image
    if(($image["size"]) <=0|| !in_array($fileImgType,$imgTypesAllowed)){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "File bukan gambar atau tipe gambar tidak sesuai",
                "data" => $_FILES["f_image"]["size"]
            ]
        ));
    }

    //move upload file
    if(!move_uploaded_file($image["tmp_name"], $targetImgPath)){
        http_response_code(502);
        exit(json_encode(
            [
                "status" => 502,
                "message" => "Gagal upload gambar",
                "data" => ""
            ]
        ));
    }

    $imgPath = '/assets/images/' . $tempName;

    $query .= ", image = '$imgPath'";
}

$query .= " WHERE album_id = $album_id;";

$data = $conn->query($query);
if(!$data){
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
