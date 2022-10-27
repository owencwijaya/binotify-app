<?php
    include('../connect.php');

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
    
    $page = $_POST["page_number"];
    $limit = 10;

    $query = "SELECT COUNT(*) as `count` FROM user";

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

    $query = "SELECT `name`, username, email FROM user LIMIT $limit OFFSET $lower_limit";

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