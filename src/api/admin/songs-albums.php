<?php
    include('../connect.php');
    
    $page = $_POST["page_number"];
    $limit = 10;
    $album_id = $_GET["album_id"];
    $query = "SELECT COUNT(*) as `count` FROM song WHERE album_id = '$album_id';";

    $data = $conn->query($query);

    $table_count = $data->fetch_array(MYSQLI_ASSOC)["count"];

    $lower_limit = ($page  - 1) * $limit;

    $query = "SELECT *, YEAR(`tanggal_terbit`) AS `year` FROM song WHERE album_id = '$album_id'  LIMIT $limit OFFSET $lower_limit";

    $data = $conn->query($query);

    $data_count = $data->num_rows;

    if ($data_count == 0){
        http_response_code(404);
        exit(json_encode(
            [
                "status" => 404,
                "message" => "Data not found!",
                "data" => ""
            ]
        ));
    }

    $returned_data = [];
    
    while ($row = $data->fetch_array(MYSQLI_ASSOC)){
        $returned_data[] = $row;
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Data found",
            "data" =>  json_encode(
                [
                    "data_count" => $table_count,
                    "page_total" => ceil($table_count/ $limit),
                    "page_number" => $page,
                    "rows" => $returned_data
                ]
            )
        ]
    ));

?>