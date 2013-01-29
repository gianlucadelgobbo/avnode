<?
	if(
		isset($_GET["c"]) || 
		(time()>strtotime($this->confSub["valid"][$_SESSION["lpm_sub_type"]]['starts']) && time()<strtotime($this->confSub["valid"][$_SESSION["lpm_sub_type"]]['ends'])) ||
		isset($_GET["code"])
	) {
		$showform = true;
		$mag = $this->confSub["valid"][$_SESSION["lpm_sub_type"]]["mag"]["open"];
	} else {
		$mag = $this->confSub["valid"][$_SESSION["lpm_sub_type"]]["mag"]["closed"];
	}
	$find						= array();
	$replace					= array();
	// https://docs.google.com/a/flyer.it/spreadsheet/ccc?key=0Ar6GNQklR9jQdHlwOTNJMlgxbS1MdFk5bVYyVHpzWlE#gid=0
	// https://docs.google.com/a/flyer.it/spreadsheet/ccc?key=0Aizd44G8PfkOdFZtT1h5cTktVDZBemQyMzk4ZTgwTXc#gid=2
	$findreplace				= array(
									"accommodation-period"	=> $this->community->getLabel("accommodation-period"), // da 1 a 5 notti dal 30 Maggio al 3 Giugno
									"performers-deadline"	=> $this->community->getLabel("performers-deadline"), 
									"visitors-deadline"		=> $this->community->getLabel("visitors-deadline"), 
									"artists-deadline"		=> $this->community->getLabel("artists-deadline"), 
									"performers-silusso"	=> $this->prices["performers"]["SIlusso"]["price"].",00 €", 
									"visitors-silusso"		=> $this->prices["visitors"]["SIlusso"]["price"].",00 €", 
									"artists-silusso"		=> $this->prices["artists"]["SIlusso"]["price"].",00 €", 
									"performers-si"			=> $this->prices["performers"]["SI"]["price"].",00 €", 
									"visitors-si"			=> $this->prices["visitors"]["SI"]["price"].",00 €", 
									"artists-si"			=> $this->prices["artists"]["SI"]["price"].",00 €", 
									"performers-si"			=> $this->prices["performers"]["NO"]["price"].",00 €", 
									"visitors-si"			=> $this->prices["visitors"]["NO"]["price"].",00 €", 
									"artists-si"			=> $this->prices["artists"]["NO"]["price"].",00 €"
								);
	foreach($findreplace as $k=>$v) {
		$find[]="###".$k."###";
		$replace[]=$v;
	}
	/*
	*/
	$res=$this->community->getMagazineSimpleObj($mag);
	$magStr = $res['page']['content'];
	$magStr= str_replace($find,$replace,$magStr);
	$magStr=str_replace(array("####nextEdition####","####currentEdition####"),array($this->confSub["nextEdition"],$this->confSub["titolo"]),$magStr);		

?>
<?	if($showform) { ?>
<form method="post" name="terms-conditions" id="terms-conditions" onsubmit="return check_terms();" action="<? echo($this->community->initObj["protocol"]); ?>://<? echo($_SERVER['HTTP_HOST'].(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])); ?>">
	<div class="aa"><? echo($magStr); ?></div>
	<div id="errordiv"><? echo($_SESSION["str_err"]);$_SESSION["str_err"]=NULL; ?></div>
	<div class="cntCol">			
		<label id="label_privacy" for="privacy"><input type="checkbox" name="privacy" id="privacy" onchange="clearErrors(this)" class="radio" value="1" <? echo(($_POST['privacy']==1 ? " checked=\"checked\"" : "")); ?> /> <? echo($this->getLabel("Accetto i termini e le condizioni"))?><a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"> <? echo($this->getLabel("Leggi ed accetta i termini"))?></span></a></label>
	</div>
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_terms-conditions" id="submit_terms-conditions" value="<? echo($this->getLabel("Avanti"))?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>
<? } else {
	$others = "";
	foreach($this->confSub["valid"] as $k=>$v) {
		//print_r($v);
		if (time()>strtotime($v['starts']) && time()<strtotime($v['ends'])) {
			$others.= "</li><a href=\"".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST'].(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?lpm_sub_type=".$k."\">".$this->confSub["titolo"].": ".$k."</a></li>";
		}
	}
	if ($others) $magStr.= $this->getLabel("Sono ancora aperte le iscrizioni per:")."<ul>".$others."</ul>";
 ?>
	<div class="aa"><? echo($magStr); ?></div>
<? } ?>