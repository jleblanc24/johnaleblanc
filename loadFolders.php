<?php

    $dir = "images/";
    $folders = array();

    if (isset($_GET['folder']))
    {
        $dir = $dir . $_GET["folder"];
    }

    // Open a directory, and read its contents
    if (is_dir($dir)){

        if ($dh = opendir($dir)){

        while (($file = readdir($dh)) !== false){
            
            if (is_dir($dir . "/" . $file) && $file != '..' && $file != '.') {
                
                array_push($folders,$file);
            }
        }

        closedir($dh);

        }
    }

    sort($folders);

    header('Content-Type: application/json');
    echo json_encode($folders);

?>