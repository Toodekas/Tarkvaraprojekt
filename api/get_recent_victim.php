<?php

require "verify_token.php";

$where_fields = array();
$where_params = array();
$params = array("alates", "kuni");

foreach ($params as $param) {
	if ($_GET[$param] !== "") {
		$where_fields[] = $param;
		$where_params[] = $_GET[$param];
	}
}

$where_query = "";
$c = count($where_fields);
if ($c == 0) {
	http_response_code(400);
	echo "Missing parameters";
	exit();
}


$final_query = "SELECT * FROM clients WHERE clients.id IN (SELECT incidents.kliendi_nr FROM incidents WHERE incidents.id in (SELECT sessions.incident_id FROM sessions WHERE sessions.muutmisaeg BETWEEN ? AND ?))" ;
$db = get_db();
$stmt = mysqli_prepare($db, $final_query);
mysqli_stmt_bind_param($stmt, "ss", ...$where_params);
mysqli_stmt_execute($stmt);
$res = mysqli_fetch_all(mysqli_stmt_get_result($stmt), MYSQLI_ASSOC);

echo json_encode($res);