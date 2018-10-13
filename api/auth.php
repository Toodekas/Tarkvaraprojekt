<?php

require "db_connect.php";

//Returns password and admin status from database as an array("pass" => (), "is_admin" => ())
function get_user($username) {
	$db = get_db();
	$pass = NULL;
	$is_admin = NULL;
	$stmt = $db->prepare("CALL get_user(?, @pass, @is_admin)");
	$stmt->bind_param("s", $username);
	$stmt->execute() or trigger_error($db->error);
	$result = $db->query("SELECT @pass, @is_admin")->fetch_assoc() or trigger_error($db->error);
	$pass = $result["@pass"];
	$is_admin = $result["@is_admin"];
	$stmt->close();
	$db->close();
	return array("pass" => $pass, "is_admin" => (bool)$is_admin);
}

//Checks whether user input matches database, returning true or false
function verify($username, $pass, $is_admin) {
	$db_user = get_user($username);
	if(!password_verify($pass, $db_user["pass"])) {
		return false;
	} 
	if ($is_admin) {
		if (!$db_user["is_admin"])
			return false;
	}
	return true;
}

function create_token($username, $pass, $expiry) {
	$is_admin = get_user($username)["is_admin"];
	if (!verify($username, $pass, $is_admin)) {
		return NULL;
	}
	$conf = get_conf();
	$token_str = $expiry.(bool)$is_admin.$conf["SECRET"];
	$token = password_hash($token_str, PASSWORD_DEFAULT);
	$token_enc = base64_encode($token);
	return $token_enc.":".$expiry;
}

function verify_token($token, $is_admin) {
	$token_exploded = explode(":", $token);
	if (count($token_exploded) !== 2) {
		return false;
	}
	list($base, $expiry) = $token_exploded;
	$conf = get_conf();
	$token_str = $expiry.(bool)$is_admin.$conf["SECRET"];
	$token_dec = base64_decode($base);
	if (password_verify($token_str, $token_dec)) {
		return true;
	} else if (!$is_admin) {
		return verify_token($token, $expiry, true);
	}
	return false;
}