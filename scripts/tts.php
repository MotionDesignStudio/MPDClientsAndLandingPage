<?php
	$greetingString = $_POST['greetingString']; 
	function is_online(){
    		return (checkdnsrr('google.com', 'ANY') && checkdnsrr('yahoo.com', 'ANY') && checkdnsrr('microsoft.com', 'ANY'));
	}

		
	$myfile = fopen("tts.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $greetingString);
	fclose($myfile);
	
	
	echo is_online() . " :: ". $greetingString;

?>
