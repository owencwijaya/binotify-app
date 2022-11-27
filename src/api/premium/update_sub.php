<?php
    include('../connect.php');

    $creator_id = $_GET['creator_id'];
    $subscriber_id = $_GET['subscriber_id'];
    $new_status = $_GET['new_status'];
    
    $subscriber_id = intval($subscriber_id);


    if (!isset($creator_id) || !isset($subscriber_id) || !isset($new_status)){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "Bad Request",
                "data" => "Missing creator ID / subscriber ID / new status"
            ]
        ));
    }

    $query = "UPDATE subscription SET status = '$new_status' WHERE creator_id = '$creator_id' AND subscriber_id = $subscriber_id ;";    
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

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Subscription successfully updated!",
            "data" => $data
        ]
    ));


?>