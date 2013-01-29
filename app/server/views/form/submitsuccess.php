<?
//print_r($_SESSION['lpm']);


//$_SESSION["lpm_sub_type"]
//$_SESSION['lpm']['performance_id']
//$this->confSub["evento"]
//$this->confSub["defaultInsertDate"]
//$this->confSub["defaultInsertDate"]
//$_SESSION['user_id']
		
if ($_SESSION["lpm_sub_type"]=="performers" || $_SESSION["lpm_sub_type"]=="contest") {
	$chiavi_rel = "";
	if ($_SESSION['lpm']['topic']) {
		$chiavi_rel = $_SESSION['lpm']['topic'];
	}

	//collega la performance con id $_GET['id'] all' evento: evento
	$sqlrel = "insert into progetti_rel(id_from,id_rel,tab_rel,data_i,data_f,date,user_id,chiavi)values(".$this->confSub["evento"].",".$_SESSION['lpm']['performance_id'].",'performance','".$this->confSub["defaultInsertDate"]."','".$this->confSub["defaultInsertDate"]."',NOW(),".$_SESSION['user_id'].",'".$chiavi_rel."');";
	//echo($sqlrel."<br />\n");
	$this->community->db->query($sqlrel);
	//blocca la performance aggiungendo la chiave:
	//$this->community->db->query("update performance set chiavi=concat(chiavi,',|431|432|') where id=".$_SESSION['lpm']['performance_id']);
	
	$this->community->db->query("select titolo from flxer_performance where id=".$_SESSION['lpm']['performance_id']);
	$titRes=$this->community->db->fetch();
	if($titRes) $titPerf=": ".$titRes[0]->titolo;
	$this->community->updateChangeLog($_SESSION['user_id'],"performance_to_event",array("new"=>0),array("new"=>$this->confSub["evento"].",".$_SESSION['lpm']['performance_id']));
}

$usrObj = $this->community->getUserDett($_SESSION['lpm']['author'],array("full_info"=>true,"img_user"=>false,"img_user_size"=>false));

//invia la mail riepilogativa
if ($_SESSION["lpm_sub_type"]=="performers") {
	$mailStr="LPM SUBSCRIPTION FOR ".$titPerf."\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=performances&perfid=".$_SESSION['lpm']['performance_id']."\n\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."&id=".$_SESSION['user_id']."\n\n";
} else if ($_SESSION["lpm_sub_type"]=="contest") {
	$mailStr="LPM VJ TORNA SUBSCRIPTION FOR ".$titPerf."\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=performances&perfid=".$_SESSION['lpm']['performance_id']."\n\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."&id=".$_SESSION['user_id']."\n\n";
} else if ($_SESSION["lpm_sub_type"]=="artists") {
	$mailStr="LPM ARTIST: ".$usrObj['nomearte']."\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?id=".$_SESSION['lpm']['author']."\n\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."&id=".$_SESSION['user_id']."\n\n";
} else if ($_SESSION["lpm_sub_type"]=="pro") {
	$mailStr="LPM PRO: ".$usrObj['nomearte']."\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?id=".$_SESSION['lpm']['author']."\n\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."&id=".$_SESSION['user_id']."\n\n";
} else {
	$mailStr="LPM PRESS: ".$usrObj['nomearte']."\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?id=".$_SESSION['lpm']['author']."\n\n";
	$mailStr.="".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."&id=".$_SESSION['user_id']."\n\n";
}

if (count($usrObj['locations'])) {
	$countryStr = "";
	foreach($usrObj['locations'] as $key=>$val){
		$countryStr.= "<strong>".$key."</strong> ";
		foreach($val as $citta){
			$countryStr.= $citta.", ";
		}
		$countryStr = substr($countryStr,0,strlen($countryStr)-2);
		$countryStr.= " | ";
		$countryStr = substr($countryStr,0,strlen($countryStr)-3);
	}
}
$mailStr.="Tipo: ".$_SESSION["lpm_sub_type"]."\n";
$mailStr.="Time: ".time()."\n";
if ($_SESSION["lpm"]["topic"]) $mailStr.="Room: ".$_SESSION["lpm"]["topic"]." ".$this->confSub["rooms"][$_SESSION["lpm"]["topic"]]['message']."\n\n";
$mailStr.="Artist name: [".$_SESSION["lpm"]["authortype"]."] ".($usrObj['nomearte'])."\n\n";
//$mailStr.="Performers N: ".$_SESSION["lpm"]["contaperformers"]."\n\n";
$usrObj=$this->community->getUserDett($_SESSION['user_id'],array("full_info"=>true,"img_user"=>false,"img_user_size"=>false));

//if ($_SESSION['user_id']==480) print_r($this->confSub["titolo"]);

$mailStr.="MITTENTE\n";
$mailStr.="Artistic Name: ".$usrObj['nomearte']."\n";
$mailStr.="Name: ".$usrObj['nome']."\n";
$mailStr.="Surname: ".$usrObj['cognome']."\n";
foreach($usrObj['emails'] as $email) {
	if ($email['primary']) $yourmail = $email['email'];
}
$mailStr.="Email: ".$usrObj['nome']." ".$usrObj['cognome']." aka ".$usrObj['nomearte']." ".$yourmail."\n\n";

$mailStr.="ACCOMMODATION\n";
$acc = false;

$itemsTobuy = array();

if($_SESSION['lpm']['accommodation']){
	foreach($_SESSION['lpm']['accommodation'] as $item){
		if($item['presente']){
			if($item['editable']){
				$this->community->db->query("select * from lpm_reservations where event_id=".$this->confSub["evento"]." and id_sogg=".$item['id']);
				$resRes = $this->community->db->fetch();
				if($resRes){
					for ($a=1;$a<count($resRes);$a++) {
						$this->community->db->query("delete from lpm_reservations where id=".$resRes[$a]->id);
					}
					$sql = "update `lpm_reservations` set ".
					(trim($item['phone']) ? "`phone`='".trim($item['phone'])."'" : "").
					(trim($item['date_i']) ? ",`arrival`='".trim($item['date_i'])."'" : "").
					(trim($item['date_f']) ? ",`departure`='".trim($item['date_f'])."'" : "").
					(trim($item['accType']) ? ",`type`='".trim($item['accType'])."'" : "").
					",`date`=NOW()".
					" where event_id=".$this->confSub["evento"]." and id_sogg=".$item['id'];
				} else {
					$sql = "insert into `lpm_reservations` (`event_id`, `lpm_sub_type`, `id_sogg`, `phone`, `arrival`, `departure`, `type`, `user_id`, `date`) values (".
					"'".$this->confSub["evento"]."',".
					"'".$_SESSION["lpm_sub_type"]."',".
					"'".$item['id']."',".
					"'".trim($item['phone'])."',".
					"'".trim($item['date_i'])."',".
					"'".trim($item['date_f'])."',".
					"'".trim($item['accType'])."',".
					"'".$_SESSION["user_id"]."',".
					"NOW())";
				}
				//print_r("--------------\n");
				//echo($sql);
				$this->community->db->query($sql);
				//print_r("--------------\n");
			}
			$mailStr.="Name: ".$item['nome']."\n";
			$mailStr.="Phone: ".$item['phone']."\n";
			$mailStr.="Arrival: ".$item['date_i']."\n";
			$mailStr.="Departure: ".$item['date_f']."\n";
			$mailStr.="Acc Type: ".$item['accType']."\n";
			$days = ((strtotime($item['date_f'])-strtotime($item['date_i']))/(60*60*24));
			$mailStr.="Number of nights: ".$days."\n";
			$mailStr.="Number of persons: 1\n\n";
			$price = $this->confSub["prices"][$_SESSION["lpm_sub_type"]][$item['accType']]['price'];
			$mailStr.="Price per day: ".$price.",00 €\n";
			$mailStr.="Total to pay: ".($price*$days).",00 €\n";
		}
	}
}

if ($_SESSION["lpm_sub_type"]=="performers") {
	$str.="
			<h3>".$this->community->getLabel("Performance").": ".$titRes[0]->titolo."</h3>
			<div>".$this->community->getLabel("Iscrizione raccolta con successo")."</div>
	";
} else {
	$str.="
			<div>".$this->community->getLabel("Iscrizione visitors-artista raccolta con successo")."</div>
			";
}
$str.="
			<div>".$this->community->getLabel("Per monitorare la tua iscrizione visita l'apposita sezione ISCRIZIONI del pannello di controllo del sito di FLxER").":</div>
			<div><a href=\"".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."\" target=\"_blank\">".$this->community->initObj["protocol"]."://".$_SERVER["HTTP_HOST"]."/controlpanel/?edit=subscriptions&eventid=".$this->confSub["evento"]."</a></div>
			";
/*
if ($_SESSION['lpm']['accommodation']) {
	$str.="
			<div class=\"inputFreeStyle cntCol\">
				<h4>".$this->community->getLabel("Pagamento servizi")."</h4>
				<div class=\"labelBig mb10\">".$this->community->getLabel("Hai selezionato un opzione che prevede il seguente pagamento").":</div>
				<table width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\">
					<tr>
						<td>&nbsp;</td>
						<td><strong>".$this->getLabel("Nome")."</strong></td>
						<td><strong>".$this->getLabel("Telefono")."</strong></td>
						<td><strong>".$this->getLabel("Arrivo")."</strong></td>
						<td><strong>".$this->getLabel("Partenza")."</strong></td>
						<td><strong>".$this->getLabel("Prezzo")."</strong></td>
					</tr>";
	foreach($itemsTobuy as $item){
		if ($item['days']) {
			$total+=$item['days'];
			$str.="
					<tr>
						<td>".$this->community->getLabel("SI")."</td>
						<td>".$item['nome']."</td>
						<td>".$item['phone']."</td>
						<td>".$item['date_i']."</td>
						<td>".$item['date_f']."</td>
						<td class=\"price\">".($item['days']*$price).",00 €</td>
					</tr>";
		} else {
			$str.="
					<tr>
						<td>".$this->community->getLabel("NO")."</td>
						<td>".$item['nome']."</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>";
		}
	}
	$str.="
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td style=\"text-align:right;\"><b>".$this->getLabel("TOTALE")."</b></td>
						<td class=\"price\"><b>".($total*$price).",00 €</b></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td colspan=\"3\" class=\"price\">
							<br />
							<form action=\"".$this->community->initObj["protocol"]."://www.paypal.com/cgi-bin/webscr\" method=\"post\">
								<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\">
								<input type=\"hidden\" name=\"quantity\" value=\"".$total."\" />
								<input type=\"hidden\" name=\"hosted_button_id\" value=\"".$this->confSub["prices"][$_SESSION["lpm_sub_type"]][$_SESSION['lpm']['accommodationtype']]['paypal']."\">
								<input type=\"image\" src=\"".$this->community->initObj["protocol"]."://www.paypalobjects.com/en_US/IT/i/btn/btn_buynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - The safer, easier way to pay online!\">
								<img alt=\"\" border=\"0\" src=\"".$this->community->initObj["protocol"]."://www.paypalobjects.com/en_US/i/scr/pixel.gif\" width=\"1\" height=\"1\">
							</form>
						</td>
					</tr>
				</table>							
			</div>
	";
}
*/
//".$this->community->initObj["protocol"]."://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJNEZMNDG4F8N&quantity=10
//$this->community->invia("subscriptions@liveperformersmeeting.net","LPM subscription","subscriptions@liveperformersmeeting.net","LPM subscription","LPM subscription ".$this->confSub["titolo"]."",utf8_decode($mailStr));
$this->community->invia($yourmail,$usrObj['nome']." ".$usrObj['cognome']." aka ".$usrObj['nomearte'],$this->confSub["mailto"],$this->confSub["titolo"]." subscription","Subscription to: ".$this->confSub["titolo"]."",utf8_decode($mailStr));
//$this->community->invia($yourmail,$usrObj['nome']." ".$usrObj['cognome']." aka ".$usrObj['nomearte'],"g.delgobbo@flyer.it","LPM subscription","LPM subscription ".$this->confSub["titolo"]."",utf8_decode($mailStr));
//$this->community->invia("g.delgobbo@flyer.it","LPM subscription","g.delgobbo@flyer.it","LPM subscription","LPM subscription ".$this->confSub["titolo"]."",($mailStr));

$esito = true;
//unset($_SESSION["lpm_sub_type"]);
//unset($_SESSION["lpm"]);
echo($str);
//if ($_SESSION["user_id"]==480) echo("<pre>".$mailStr."</pre>"); 
//if ($_SESSION["user_id"]==480) print_r($_SESSION["lpm"]); 
?>
