<?php

$myfile = fopen("locate.txt", "w");
$txt = "lat: " . &_GET["lat"] . "\nlong: " . &_GET["long"];
fwrite($myfile, $txt);
fclose($myfile);


?>
