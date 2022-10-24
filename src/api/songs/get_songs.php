<?php
    include("../connect.php");

    $query = "SELECT * FROM song ORDER BY judul DESC";
    $data = $conn->query($query);

    if ($data->num_rows == 0) {
        http_response_code(404);
        exit(json_encode(
            [
                "status" => 404,
                "message" => "No songs found!",
                "data" => ""
            ]
        ));
    }


    $songs = [];
    while ($row = $data->fetch_assoc()) {
        $songs[] = $row;
    }
    
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $songs
        ]
    ));
?>
