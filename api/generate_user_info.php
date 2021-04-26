<?php

require "verify_token.php";

//Only admins may access
if (!$is_admin) {
	http_response_code(403);
	echo "Admin access required";
	exit();
}

//Unpack post body
$body = json_decode(file_get_contents("php://input"), true);

//Check if id exists
if (!isset($body["id"])) {
	http_response_code(400);
	echo "Missing id";
	exit();
}

//Execute the query
$db = get_db();
$stmt = mysqli_prepare($db, "SELECT * FROM clients WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $body["id"]);
mysqli_stmt_execute($stmt);
$query_res = mysqli_stmt_get_result($stmt);
$res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);


//Construct csv
$csv = "";
//Title row
foreach ($res[0] as $head => $value) {
	$csv .= $head . "\t";
}
$csv .= "\n";
//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}
$csv .= "\n";
//get all the incident info
$stmt = mysqli_prepare($db, "SELECT * FROM incidents WHERE kliendi_nr = ?");
mysqli_stmt_bind_param($stmt, "i", $body["id"]);
mysqli_stmt_execute($stmt);
$query_res = mysqli_stmt_get_result($stmt);
$res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

foreach ($res[0] as $head => $value) {
	$csv .= $head . "\t";
}
$csv .= "\n";
//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}
$csv .= "\n";

//get all the sessions info
$stmt = mysqli_prepare($db, "SELECT * FROM sessions WHERE sessions.incident_id = (SELECT id from incidents WHERE incidents.kliendi_nr = ?) ");
mysqli_stmt_bind_param($stmt, "i", $body["id"]);
mysqli_stmt_execute($stmt);
$query_res = mysqli_stmt_get_result($stmt);
$res = mysqli_fetch_all($query_res, MYSQLI_ASSOC);

foreach ($res[0] as $head => $value) {
	$csv .= $head . "\t";
}
$csv .= "\n";
//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}
$csv .= "\n";

echo $csv;