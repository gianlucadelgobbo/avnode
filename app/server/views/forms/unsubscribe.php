<?
session_start();
include_once('_inc/db.php');
$db = new Mysql;
$db->connect();

if(isset($_GET['address']) & isset($_GET['listname'])){
	require_once dirname(__FILE__).'/../../csrest/csrest_subscribers.php';
	$wrap = new CS_REST_Subscribers('ec6de6ef7a4a0cf81d73e0263d8017f2', 'a1df774dbf1832f1e4177589d54ef8eb');
	$subscriptionRes = $wrap->get($_GET['address']);
	$CustomFields = array();
	$subscrt = array();
	if($subscriptionRes->response->EmailAddress) {
		foreach($subscriptionRes->response->CustomFields as $subscriptionRow) {
			if ($subscriptionRow->Value!=$_GET['listname'] && $subscriptionRow->Key=="topic") {
				$subscrt[]=array("Key"=>$subscriptionRow->Key,"Value"=>$subscriptionRow->Value);
			}
		}
		$name = ($subscriptionRes->response->Name ? $subscriptionRes->response->Name : $_GET['address']);
	}
	$subscriptionUpdate = array(
	    'EmailAddress' => $_GET['address'],
	    'Name' => $name,
	    'CustomFields' => $subscrt,
	    'Resubscribe' => true
	);
	$result = $wrap->add($subscriptionUpdate);
	if($result->was_successful()) {
		echo ("<p>".$this->getLabel("La tua mail e stata cancellata dalla Newsletter").": ".$_GET['listname']."</p>");
	} else {
		echo ("<p>".$this->getLabel("Cancellazione non riuscita")."</p>");
		echo ("<p>".$this->getLabel("Invia una mail a")." ".$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail']." ".$this->getLabel("indicando il tuo problema").".</p>");
	}
	/*
	include_once('_inc/mailman.php');
	$mailman = new Mailman;

	$mailman->address = trim($_GET['address']);
	$mailman->tablename = trim($_GET['listname']);
	$mailman->delivery_status = trim($_GET['vc']);
	$unsub = $mailman->checkcode();
	$redirectScript="<script type=\"text/javascript\"><!--
	function reindirizza(){
		window.location.href=\"".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST']."\";
	}
	setTimeout(\"reindirizza()\",1500);		
//--></script>";
	echo($redirectScript);
	if($unsub){
		$done = $mailman->unsubscribe();
		if($done) {
			echo ("<p>".$this->getLabel("La tua mail e stata cancellata dalla Newsletter").": ".$mailman->tablename."</p>");
		} else {
			echo ("<p>".$this->getLabel("Cancellazione non riuscita")."</p>");
			echo ("<p>".$this->getLabel("Invia una mail a")." ".$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail']." ".$this->getLabel("indicando il tuo problema").".</p>");
		}
	} else {
		echo ($this->getLabel("ERRORE: codice non valido"));
	}
	*/
} else if(isset($_POST['address']) & isset($_POST['list'])){
	$to = $_POST['address'];
	$list = $_POST['list'];
	$headers = 'From: '.$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail'];
	// . "\r\n" .
    //'Reply-To: info@...' . "\r\n" .
    //'X-Mailer: PHP/' . phpversion();
	//$headers .= 'Content-Type: text/html; charset="ISO-8859-1"'."\r\n";
	//$headers .= 'Content-Transfer-Encoding: quoted-printable'."\n\r\n";

/*
	$Mailman = new Mailman();
	$Mailman->address = $to;
	$Mailman->tablename = $list;
	$randok = $Mailman->generaterandcode();
*/
		$link = ("".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST']."/unsubscribe/?listname=".$_POST['list']."&address=".$_POST['address']."");
		$subject = $this->getLabel("Cancellazione dalla Newsletter").": ".$list; 
		$body = $this->getLabel("Conferma la cancellazione della tua iscrizione alla Newsletter").": ".$list." \n \n";
		$body .= $link;
		$body .= "\n\n ".$this->getLabel("signature").""; 

		if (mail($to, $subject, $body,$headers)) {
			echo("<p>".$this->getLabel("Messaggio inviato.")."</p>");
			echo("<p>".$this->getLabel("A breve riceverai una email per confermare la tua cancellazione dalla Newsletter")."</p>");
		} else {
			echo("<p>".$this->getLabel("Messaggio NON inviato.")."</p>");
			echo("<p>".$this->getLabel("Invia una mail a")." ".$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail']." ".$this->getLabel("indicando il tuo problema").".</p>");
		}
} else {
	if(isset($_GET['listname']) & isset($_GET['email'])){
		/*
		$Mailman = new Mailman;
		$Mailman->address = trim($_GET['email']);
		$Mailman->tablename = trim($_GET['listname']);
		$isvalid = $Mailman->getvaluesfromaddress();
		*/
	}
	//if(is_array($isvalid)) {
		echo("
			<p>".$this->getLabel("Vuoi cancellare l'indirizzo email").": <strong>".$_GET['email']."</strong> ".$this->getLabel("dalla lista")." <strong>".$_GET['listname']."</strong>? </p>
			<div>
<form action=\"http://flyer.createsend.com/t/r/u/oujkkr/\" method=\"post\">
<div>
<label for=\"email\">Email:</label><br />
<input type=\"Text\" id=\"email\" name=\"cm-oujkkr-oujkkr\" /><br />
<input type=\"submit\" value=\"Unsubscribe\" class=\"pulsBig\" />
</div>
</form>
			</div>
			<br class=\"myClear\" />
		");
/*
			<form action=\"/unsubscribe/\" method=\"post\">
				<input type=\"hidden\" name=\"address\" value=\"".$_GET['email']."\" />
				<input type=\"hidden\" name=\"list\" value=\"".$_GET['listname']."\" />
				<input type=\"submit\" value=\"".$this->getLabel("SI, invia mail di conferma")."\" class=\"pulsBig\" />
			</form>
*/
	//} else {
	//	echo ($this->getLabel("ERRORE: codice non valido"));
	//}
}
?>