<?php
    session_start();
    session_regenerate_id();

    http_response_code(200);

    if (!(isset($_SESSION["username"]))){
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Session not destroyed successfully",
                "data" => ""
            ]
            ));
    }

    exit(json_encode(
        [
            "status" => 200,
            "message" => "User logged out successfully!",
            "data" => ""
        ]
    ))
?>