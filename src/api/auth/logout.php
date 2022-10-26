<?php
    session_start();
    session_regenerate_id();

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "User logged out successfully!",
            "data" => ""
        ]
    ))
?>