<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//$ip = $_SERVER['REMOTE_ADDR'];

//echo $ip;

$ip = file_get_contents("http://bot.whatismyipaddress.com"); 

//echo $ip;
//73.81.9.10 
//curl ipinfo.io/73.81.9.10
//http://ipinfo.io/73.81.9.10


$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
echo $details->city; // -> "Mountain View"
echo $details->region;
echo $details->country;

//$myArray = json_decode($details, true);

?>

