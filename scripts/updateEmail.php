<?php
	$newEmailAdrress = $_POST['emailAddress']; 

	$myfile = fopen("emailAddress.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $newEmailAdrress);
	fclose($myfile);

	echo " Updating to the following email {$newEmailAdrress}. ";

?>

