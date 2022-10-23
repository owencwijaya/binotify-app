<?php
include "../connect.php";

$query = "SELECT * FROM album ORDER BY judul DESC";
$data = $conn->query($query);

$albums = [];
while ($row = $data->fetch_assoc()) {
    $albums[] = $row;
}
http_response_code(200);
exit(json_encode(
    [
        "status" => 200,
        "message" => "Success",
        "data" => $albums
    ]
));
