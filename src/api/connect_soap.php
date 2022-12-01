<?php
    $opts = array(
        'ssl' => array(
            'ciphers' => 'RC4-SHA',
            'verify_peer' => false,
            'verify_peer_name' => false
        ),
        'http' => array(
            'header' => 'Content-Type: text/xml'
        )
    );

    $params = array(
        'encoding' => 'UTF-8',
        'verifypeer' => false,
        'verifyhost' => false,
        'soap_version' => SOAP_1_1,
        'trace' => 1,
        'exceptions' => 1,
        'connection_timeout' => 180,
        'stream_context' => stream_context_create($opts)
    );

    // $soap_client = new SoapClient("http://host.docker.internal:4000/binotify-soap/services/subscription/addSubs?wsdl", $params); 
?>