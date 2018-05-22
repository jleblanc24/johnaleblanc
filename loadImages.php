<?php

    $dir = "assets/images/";
    $images = array();

    if (isset($_GET['folder']))
    {
        $dir = $dir . $_GET["folder"];
    }

    // Open a directory, and read its contents
    if (is_dir($dir)){

        if ($dh = opendir($dir)){

            while (($file = readdir($dh)) !== false){
                
//                if (stripos($file, ".jpg") !== false && 
//                    $file != '..' && $file != '.') {
                if ($file != '..' && $file != '.') {
                    
                    array_push($images,$file);
                }

            }
    
            closedir($dh);

        }
    }

    header('Content-Type: application/json');
    echo json_encode($images);

?>