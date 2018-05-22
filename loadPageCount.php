<?php

    $collection = "";
    $count = 0;

    if (isset($_GET['folder']))
    {
        $collection = $_GET["folder"] . ".dat";

            // Increment visit count
            $file = fopen($collection,"r");
            $count = fgets($file,1000);
            fclose($file);

    }

    header('Content-Type: application/json');
    echo json_encode($count);

?>
