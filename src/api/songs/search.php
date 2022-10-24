<?php
    include('../connect.php');
    
    $page = $_POST["page_number"];

    $limit = 10;

    $query = "SELECT COUNT(*) as `count` FROM `" . $_POST["table"] . "`";
    
    $data = $conn->query($query);

    $table_count = $data->fetch_array(MYSQLI_ASSOC)["count"];

    $lower_limit = ($page  - 1) * $limit;

    $query = "SELECT `" . $_POST["table"] ."_id`,`judul`, `penyanyi`, YEAR(`tanggal_terbit`) as `year`,`genre`,`image_path` 
    FROM " . $_POST["table"];



    if ($_POST["query"] !== "") {
        $query .= " WHERE `judul` LIKE ". "'%" . $_POST["query"] . "%' ";
    }

    if ($_POST["genre"] !== "") {
        $query .= " AND `genre` LIKE ". "'%" . $_POST["genre"] . "%' ";
    }

    if ($_POST["sort_order"] !== "" && $_POST["sort_by"] !== "") {
        $sort_by = "judul";
        if ($_POST["sort_by"] === "name"){
            $sort_by = "`judul`";
        }

        if ($_POST["sort_by"] === "year"){
            $sort_by = "`year`";
        }
        $query .= " ORDER BY " . $sort_by . " " . $_POST["sort_order"];
    } else {
        $query .= " ORDER BY `judul` DESC";
    }

    $query .= " LIMIT $limit OFFSET $lower_limit;";

    $data = $conn->query($query);
    //echo $query;
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
                    "rows" => $returned_data,
                    "table" => $_POST["table"]
                ]
            )
        ]
    ));

?>