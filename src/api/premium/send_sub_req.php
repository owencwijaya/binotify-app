<?php
    include("../connect.php");
    include("../connect_soap.php");

    $creator_id = $_POST["creator_id"];
    $session_id = $_POST["session_id"];

    session_start();

    if ($session_id != session_id() || $session_id == "") {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are unauthorized to access this endpoint!",
                "data" => ""
            ]
        ));
    }

    $username = $_SESSION["username"];

    if (empty($username)){
        http_response_code(403);
        exit(json_encode(
            [
                "status" => 403,
                "message" => "You are not logged in!",
                "data" => ""
            ]
        ));
    }

    $query = "SELECT * FROM user WHERE username = '$username';";    
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

    $user_data = $data->fetch_array(MYSQLI_ASSOC);
    $subscriber_id = $user_data['user_id'];

    $query = "SELECT * FROM subscription WHERE creator_id = '$creator_id' AND subscriber_id = $subscriber_id;";    
    $data = $conn->query($query);

    if ($conn->error){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Internal server error $username",
                "data" => $conn->error
            ]
        ));
    }

    if ($data->num_rows > 0){
        http_response_code(400);
        exit(json_encode(
            [
                "status" => 400,
                "message" => "You have already subscribed / sent a subscription request to this creator!",
                "data" => ""
            ]
        ));
    }

// $soap_client = new SoapClient("http://localhost:4000/binotify-soap/services/subscription.wsdl"); 
    var_dump($creator_id);
    var_dump($subscriber_id);
    $params = array(
        "creator_id" => $creator_id,
        "subscriber_id" => (int)$subscriber_id,
    );
    var_dump($soap_client->__getFunctions());
    var_dump($params);
    
    try{
        $response = $soap_client->__soapCall("addSubs", $params);
    } catch (Exception $e){
        http_response_code(200);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Error in creating subscription",
                "data" => $e->getMessage()
            ]
        ));
    }

    $query = "INSERT INTO subscription (creator_id, subscriber_id) VALUES ('$creator_id', '$subscriber_id');";    
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
            "message" => "Subscription request sent!",
            "data" => $response
        ]
    ));
?>