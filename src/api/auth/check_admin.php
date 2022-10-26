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

    if (!($_SESSION["isadmin"])) {
        exit(json_encode(
            [
                "status" => 403,
                "message" => "Forbidden; not admin user",
                "data" => ""
            ]
        ));
    }

    exit(json_encode(
        [
            "status" => 200,
            "message" => "You are logged in as an admin",
            "data" => ""
        ]
    ));
?>
    