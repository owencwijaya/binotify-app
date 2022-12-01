<?php
    session_start();
    include("../connect.php");
    include("../connect_soap.php");

    $soap_client = new SoapClient("http://host.docker.internal:4000/binotify-soap/services/subscription/getUserSubs?wsdl", $params); 

    $session_id = $_POST["session_id"];

    $current_id = session_id();

    if ($session_id != $current_id || $session_id == "") {
        http_response_code(401);
        exit(json_encode(
            [
                "status" => 401,
                "message" => "You are unauthorized to access this endpoint!",
                "data" => ""
            ]
        ));
    }

    $query_params = array(
        "api_key" => getenv("SOAP_API_KEY"),
        "user_id" => intval($_SESSION["user_id"])
    );

    try{
        $response = $soap_client->__soapCall("getUserSubs", $query_params);
    } catch (Exception $e){
        http_response_code(500);
        exit(json_encode(
            [
                "status" => 500,
                "message" => "Error in getting subscription",
                "data" => $e->getMessage()
            ]
        ));
    }

    $subs = ((array)((array)$response)["subscription-lists"])["subscription"];

    $accepted_list = [];
    $pending_list = [];
    $rejected_list = [];

    for ($i = 0; $i < count($subs); $i++){
        $subs[$i] = (array)$subs[$i];

        $status = $subs[$i]["status"];
        $creator_id = $subs[$i]["creator_id"];
        $subscriber_id = $subs[$i]["subscriber_id"];

        if ($status == 'ACCEPTED'){
            array_push($accepted_list, $creator_id);
        } else if ($status == 'REJECTED'){
            array_push($rejected_list, $creator_id);
        } else if ($status == 'PENDING'){
            array_push($pending_list, $creator_id);
        }

        $query = "UPDATE subscription SET `status` = '$status' WHERE creator_id = '$creator_id' AND subscriber_id = $subscriber_id";    
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
    }
    
    http_response_code(200);
    exit(json_encode(
        [
            "status" => 200,
            "message" => "Success",
            "data" => json_encode([
                "accepted_list" => $accepted_list,
                "pending_list" => $pending_list,
                "rejected_list" => $rejected_list
            ])
        ]
    ));

