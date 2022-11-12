<?php
    $host = "db-binotify-app";
    $user = "tubes";
    $password = "tubes";
    $dbname = "binotify-app";

    $conn=new mysqli($host, $user, $password, $dbname);
    if(mysqli_connect_errno()){
        echo "Failed to connect to MySql" . mysqli_connect_errno();
        exit();
    }
?>