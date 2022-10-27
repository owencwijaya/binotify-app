<?php
    session_start();
    include('../connect.php');
    
    $page = $_POST["page_number"];
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

    $limit = 10;

    $query = "SELECT COUNT(*) as `count` FROM `" . $_POST["table"] . "`";
    
    $data = $conn->query($query);

    if ($conn->error){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error",
                "data" => $conn->error
            ]
        ));
    }

    $table_count = $data->fetch_array(MYSQLI_ASSOC)["count"];

    $lower_limit = ($page  - 1) * $limit;

    $duration_column = "duration";

    if ($_POST["table"] === "album"){
        $duration_column = "total_duration";
    }


    $query = "SELECT `" . $_POST["table"] ."_id`, ".  $duration_column. ", `judul`, `penyanyi`, YEAR(`tanggal_terbit`) as `year`,`genre`,`image_path` 
    FROM " . $_POST["table"];



    if ($_POST["query"] !== "") {
        $query .= " WHERE (`judul` LIKE ". "'%" . $_POST["query"] . "%' OR `penyanyi` LIKE ". "'%" 
        . $_POST["query"]. "%' OR YEAR(`tanggal_terbit`) LIKE " . "'%" . $_POST["query"] . "%')";
    }

    $keyword = strpos($query, 'WHERE') !== false ? " AND" : " WHERE";

    if ($_POST["genre"] !== "") {
        $query .=  $keyword ." `genre` = ". "'" . $_POST["genre"] . "'";
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
        $query .= " ORDER BY `judul` ASC";
    }

    $query .= " LIMIT $limit OFFSET $lower_limit;";

    $data = $conn->query($query);

    if ($conn->error){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error",
                "data" => $conn->error . $query
            ]
        ));
    }
    
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
                    "data_count" => $data_count,
                    "page_total" => ceil($table_count/ $limit),
                    "page_number" => $page,
                    "rows" => $returned_data,
                    "table" => $_POST["table"]
                ]
            )
        ]
    ));

?>