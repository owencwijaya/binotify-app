<?php
    session_start();

    if (!(isset($_SESSION["username"]))) {
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are not logged in!",
                "data" => ""
            ]
        ));
    }

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
    