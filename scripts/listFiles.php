<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$directoryTosearch = $_POST['directoryTosearch']; 

//echo "Display Images";
//$files = array_slice(scandir('../img/bg'), 2 );

$files = array_slice(scandir( $directoryTosearch ), 2 );

echo json_encode($files);

?>

