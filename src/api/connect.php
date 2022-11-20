<?php
    $host = "host.docker.internal:3312";
    $user = "root";
    $password = "root";
    $dbname = "binotify-app";

    $conn=new mysqli($host, $user, $password, $dbname);
    if(mysqli_connect_errno()){
        echo "Failed to connect to MySql" . mysqli_connect_errno();
        exit();
    }
?>