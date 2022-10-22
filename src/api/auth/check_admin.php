<?php
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

    if (($_SESSION["username"]) != "admin") {
        http_response_code(403);
        exit(json_encode(
            [
                "status" => 403,
                "message" => "Forbidden; not admin user",
                "data" => ""
            ]
        ));
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "You are logged in as an admin",
            "data" => ""
        ]
    ));
?>
    