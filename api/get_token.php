<?php

require "auth.php";

if (!isset($_SERVER["HTTP_AUTH"])) {
	echo "Auth not supplied";
	exit();
}

$auth_exploded = explode(":", base64_decode($_SERVER["HTTP_AUTH"]));

if (count($auth_exploded) !== 2) {
	echo "Invalid authentication data";
	exit();
}

list($username, $password) = $auth_exploded;

$token = login($username, $password);
if (!$token) {
	http_response_code(401);
	echo "Invalid username/password";
} else {
	echo $token;
}