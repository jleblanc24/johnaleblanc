<?php

    $dir = "assets/images/";
    $folders = array();
    $collection = "";

    if (isset($_GET['folder']))
    {
        $collection = $_GET["folder"] . ".dat";
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
            
            // Increment visit count
            $file = fopen($collection,"r");
            $count = fgets($file,1000);
            fclose($file);
            $count=$count + 1 ;

            // opens countlog.txt to change new hit number
            $file = fopen($collection,"w");
            fwrite($file, $count);
            fclose($file);

        }
    }

    sort($folders);

    header('Content-Type: application/json');
    echo json_encode($folders);

?>