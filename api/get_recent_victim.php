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


$final_query = "SELECT clients.id, clients.first_name, clients.last_name, clients.national_id, clients.phone, clients.email, sessions.kirjeldus, sessions.incident_id, sessions.id as session_id FROM `incidents`,`sessions`, `clients` WHERE (clients.id = incidents.kliendi_nr) AND (incidents.id = sessions.incident_id) AND (sessions.kuupaev BETWEEN ? AND ? ) " ;
$db = get_db();
$stmt = mysqli_prepare($db, $final_query);
mysqli_stmt_bind_param($stmt, "ss", ...$where_params);
mysqli_stmt_execute($stmt);
$res = mysqli_fetch_all(mysqli_stmt_get_result($stmt), MYSQLI_ASSOC);

echo json_encode($res);