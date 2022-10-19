<?php
    $host = "database-tubes-1-wbd";
    $user = "tubes";
    $password = "tubes";
    $dbname = "tubes_wbd";

    $connection=new mysqli($host, $user, $password, $dbname);
    if(mysqli_connect_errno()){
        echo "Failed to connect to MySql" . mysqli_connect_errno();
        exit();
    }
?>