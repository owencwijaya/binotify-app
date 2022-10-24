<?php
    include "../connect.php";

    $query = "SELECT DISTINCT(`genre`) AS `genres` FROM song ORDER BY `genres` DESC";
    $data = $conn->query($query);

    if ($data->num_rows == 0) {
        http_response_code(404);
        exit(json_encode(
            [
                "status" => 404,
                "message" => "No genres found!",
                "data" => ""
            ]
        ));
    }

    $genres = [];
    while ($row = $data->fetch_assoc()) {
        array_push($genres, $row["genres"]);
    }

    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => $genres
        ]
    ));
?>
