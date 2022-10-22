<?php
    session_start();
    session_destroy();

    exit(json_encode(
        [
            "status" => 200,
            "message" => "User logged out successfully!",
            "data" => $_SESSION["username"]
        ]
    ))
?>