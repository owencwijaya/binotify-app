<?php
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

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "You are logged in!",
            "data" => json_encode(
                [
                    "username" => $_SESSION["username"],
                    "isadmin" => $_SESSION["isadmin"]
                ]
            )
        ]
    ));
?>
    