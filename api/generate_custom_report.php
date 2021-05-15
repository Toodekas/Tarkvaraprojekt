<?php

require "verify_token.php";

$where_fields = array();
$where_params = array();
$params = array("alates", "kuni", "piirkond");

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
$db = get_db();
$final_query = "";
if(end($where_params) == "all" || end($where_params) == "kõik"){
	unset($where_params[2]);
	unset($where_fields[2]);
	$final_query = 'SELECT incidents.piirkond, incidents.kliendi_nr, DATE_FORMAT(sessions.kuupaev, "%d/%m/%Y"), kas_korduv2(incidents.id) ,REPLACE(sessions.kirjeldus, ",", "،"), incidents.keel, incidents.vanus, IF(clients.haridus_tase IS NULL, " ", clients.haridus_tase),IF(incidents.puue = 1, "1", " "), IF(incidents.lapsed > 0, incidents.lapsed, " "), IF(incidents.rasedus = 1, "1", " "), incidents.elukoht, IF(incidents.fuusiline_vagivald = 0," ","1"), IF(incidents.vaimne_vagivald = 0," ","1"), IF(incidents.majanduslik_vagivald = 0," ","1"), IF(incidents.seksuaalne_vagivald = 0," ","1"), IF(incidents.inimkaubandus = 0," ","1"), IF(incidents.teadmata_vagivald = 0," ","1"), IF(incidents.partner_vagivallatseja = 0," ","1"), IF(incidents.ekspartner_vagivallatseja = 0," ","1"), IF(incidents.vanem_vagivallatseja = 0," ","1"), IF(incidents.laps_vagivallatseja = 0," ","1"), IF(incidents.sugulane_vagivallatseja = 0," ","1"), IF(incidents.tookaaslane_vagivallatseja = 0," ","1"),IF(incidents.muu_vagivallatseja = 0," ","1"), IF(incidents.vagivallatseja_vanus = "teadmata"," ",incidents.vagivallatseja_vanus), IF(incidents.vagivallatseja_sugu = "teadmata"," ",incidents.vagivallatseja_sugu), IF(incidents.laps_ohver = 0," ","1"), IF(incidents.vana_ohver = 0," ","1"), IF(incidents.muu_ohver = 0," ","1"), IF(incidents.politsei = 0," ","1"), IF(sessions.sidevahendid = 0," ","1"),IF(sessions.kriisinoustamine = 0," ", sessions.kriisinoustamine), IF(sessions.kriisinoustamise_aeg = 0," ", sessions.kriisinoustamise_aeg), IF(sessions.juhtuminoustamine = 0," ", sessions.juhtuminoustamine), IF(sessions.vorgustikutoo = 0," ", sessions.vorgustikutoo), IF(sessions.psuhhonoustamine = 0," ", sessions.psuhhonoustamine), IF(sessions.juuranoustamine = 0," ", sessions.juuranoustamine),  IF(sessions.tegevused_lapsega = 0," ", sessions.tegevused_lapsega),  IF(sessions.tugiteenused = 0," ", sessions.tugiteenused), IF(sessions.naise_majutus = 0," ", sessions.naise_majutus), IF(sessions.laste_arv = 0," ", sessions.laste_arv), IF(sessions.laste_majutus = 0," ", sessions.laste_majutus), IF(sessions.umarlaud = 0," ","1"), IF(sessions.marac = 0," ","1"), IF(sessions.perearst_kaasatud = 0," ","1"), IF(sessions.emo_kaasatud = 0," ","1"), IF(sessions.naistearst_kaasatud = 0," ","1"), IF(sessions.politsei_kaasatud = 0," ","1"), IF(sessions.prokuratuur_kaasatud = 0," ","1"), IF(sessions.ohvriabi_kaasatud = 0," ","1"), IF(sessions.lastekaitse_kaasatud = 0," ","1"), IF(sessions.kov_kaasatud = 0," ","1"), IF(sessions.tsiviilkohus_kaasatud = 0," ","1"), IF(sessions.kriminaalkohus_kaasatud = 0," ","1"), IF(sessions.haridusasutus_kaasatud = 0," ","1"), IF(sessions.mtu_kaasatud = 0," ","1"), IF(sessions.tuttavad_kaasatud = 0," ","1"), IF(sessions.tootu_kassa = 0," ","1"), IF(sessions.muu_partner = 0," ","1"), sessions.rahastus, sessions.markused FROM `incidents`,`sessions`, `clients` WHERE (clients.id = incidents.kliendi_nr) AND (incidents.id = sessions.incident_id) AND (sessions.kuupaev BETWEEN ? AND ?) ORDER BY sessions.kuupaev DESC';
	$stmt = mysqli_prepare($db, $final_query);
	mysqli_stmt_bind_param($stmt, "ss", ...$where_params);
}
else{
	$final_query = 'SELECT incidents.piirkond, incidents.kliendi_nr, DATE_FORMAT(sessions.kuupaev, "%d/%m/%Y"), kas_korduv2(incidents.id) ,REPLACE(sessions.kirjeldus, ",", "،"), incidents.keel, incidents.vanus, IF(clients.haridus_tase IS NULL, " ", clients.haridus_tase),IF(incidents.puue = 1, "1", " ") , IF(incidents.lapsed > 0, incidents.lapsed, " "), IF(incidents.rasedus = 1, "1", " "), incidents.elukoht, IF(incidents.fuusiline_vagivald = 0," ","1"), IF(incidents.vaimne_vagivald = 0," ","1"), IF(incidents.majanduslik_vagivald = 0," ","1"), IF(incidents.seksuaalne_vagivald = 0," ","1"), IF(incidents.inimkaubandus = 0," ","1"), IF(incidents.teadmata_vagivald = 0," ","1"), IF(incidents.partner_vagivallatseja = 0," ","1"), IF(incidents.ekspartner_vagivallatseja = 0," ","1"), IF(incidents.vanem_vagivallatseja = 0," ","1"), IF(incidents.laps_vagivallatseja = 0," ","1"), IF(incidents.sugulane_vagivallatseja = 0," ","1"), IF(incidents.tookaaslane_vagivallatseja = 0," ","1"),IF(incidents.muu_vagivallatseja = 0," ","1"), IF(incidents.vagivallatseja_vanus = "teadmata"," ",incidents.vagivallatseja_vanus), IF(incidents.vagivallatseja_sugu = "teadmata"," ",incidents.vagivallatseja_sugu), IF(incidents.laps_ohver = 0," ","1"), IF(incidents.vana_ohver = 0," ","1"), IF(incidents.muu_ohver = 0," ","1"), IF(incidents.politsei = 0," ","1"), IF(sessions.sidevahendid = 0," ","1"),IF(sessions.kriisinoustamine = 0," ", sessions.kriisinoustamine), IF(sessions.kriisinoustamise_aeg = 0," ", sessions.kriisinoustamise_aeg), IF(sessions.juhtuminoustamine = 0," ", sessions.juhtuminoustamine), IF(sessions.vorgustikutoo = 0," ", sessions.vorgustikutoo), IF(sessions.psuhhonoustamine = 0," ", sessions.psuhhonoustamine), IF(sessions.juuranoustamine = 0," ", sessions.juuranoustamine),  IF(sessions.tegevused_lapsega = 0," ", sessions.tegevused_lapsega),  IF(sessions.tugiteenused = 0," ", sessions.tugiteenused), IF(sessions.naise_majutus = 0," ", sessions.naise_majutus), IF(sessions.laste_arv = 0," ", sessions.laste_arv), IF(sessions.laste_majutus = 0," ", sessions.laste_majutus), IF(sessions.umarlaud = 0," ","1"), IF(sessions.marac = 0," ","1"), IF(sessions.perearst_kaasatud = 0," ","1"), IF(sessions.emo_kaasatud = 0," ","1"), IF(sessions.naistearst_kaasatud = 0," ","1"), IF(sessions.politsei_kaasatud = 0," ","1"), IF(sessions.prokuratuur_kaasatud = 0," ","1"), IF(sessions.ohvriabi_kaasatud = 0," ","1"), IF(sessions.lastekaitse_kaasatud = 0," ","1"), IF(sessions.kov_kaasatud = 0," ","1"), IF(sessions.tsiviilkohus_kaasatud = 0," ","1"), IF(sessions.kriminaalkohus_kaasatud = 0," ","1"), IF(sessions.haridusasutus_kaasatud = 0," ","1"), IF(sessions.mtu_kaasatud = 0," ","1"), IF(sessions.tuttavad_kaasatud = 0," ","1"), IF(sessions.tootu_kassa = 0," ","1"), IF(sessions.muu_partner = 0," ","1"), sessions.rahastus, sessions.markused FROM `incidents`,`sessions`, `clients` WHERE (clients.id = incidents.kliendi_nr) AND (incidents.id = sessions.incident_id) AND (sessions.kuupaev BETWEEN ? AND ?) AND (incidents.piirkond = ?) ORDER BY sessions.kuupaev DESC';
	$stmt = mysqli_prepare($db, $final_query);
	mysqli_stmt_bind_param($stmt, "sss", ...$where_params);
}

mysqli_stmt_execute($stmt);
$res = mysqli_fetch_all(mysqli_stmt_get_result($stmt), MYSQLI_ASSOC);


//Construct csv
$csv = "";

//Other rows
foreach ($res as $line) {
	foreach ($line as $value) {
		$csv .= $value . "\t";
	}
	$csv .= "\n";
}
$csv .= "\n";


echo $csv;