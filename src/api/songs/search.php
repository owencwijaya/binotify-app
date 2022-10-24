<?php
    include('../connect.php');
    
    $page = $_POST["page_number"];

    $limit = 10;

    $query = "SELECT COUNT(*) as `count` FROM song";

    $data = $conn->query($query);

    $table_count = $data->fetch_array(MYSQLI_ASSOC)["count"];

    $lower_limit = ($page  - 1) * $limit;

    $query = "SELECT `song_id`,`judul`, `penyanyi`, `tanggal_terbit`,`genre`,`image_path` FROM song";

    if (!(is_null($_POST["query"]))){
        $query .= " WHERE `judul` LIKE ". "'%" . $_POST["query"] . "%' ";
    }

    
    $query .= " ORDER BY `judul` DESC LIMIT $limit OFFSET $lower_limit;";

    //echo $query;
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
    
    while ($row = $data->fetch_assoc()){
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