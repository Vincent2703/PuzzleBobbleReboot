<?php
	$score = fopen("score.txt", "r");
	echo fread($score, filesize("score.txt"));
	fclose($score);
?>