<? 
		if(isset($_SESSION['param'])){
			unset($_SESSION['verified_email']);
			$str_params=urldecode($_SESSION['param']);
			parse_str($str_params, $params);
			if(array_key_exists('email_from',$params)){
				if($this->community->isemail(trim($params['email_from']))){
					$_POST['email']=$params['email_from'];
					$_SESSION['verified_email']=$params['email_from'];
				}
			}
			if(array_key_exists('firstName',$params))				
				$_POST['nome']=$params['firstName'];
			if(array_key_exists('lastName',$params))				
				$_POST['cognome']=$params['lastName'];
			if(array_key_exists('birthMonth',$params))				
				$_POST['mm']=$params['birthMonth'];
			if(array_key_exists('birthDay',$params))				
				$_POST['gg']=$params['birthDay'];
			if(array_key_exists('birthYear',$params))				
				$_POST['aaaa']=$params['birthYear'];			
			if(array_key_exists('gender',$params))				
				$_POST['sesso']=strtoupper($params['gender']);
			if(array_key_exists('city',$params))				
				$_POST['citta']=$params['city'];	
			if(array_key_exists('country',$params))				
				$_POST['nazione']=$params['country'];	
			unset($_SESSION['param']);
		//	print_r($_POST);
		//	print_r($params);
		}
?>
<div class="boxError">
	<h4><? echo($this->getLabel("Se vuoi registrare un gruppo")) ?></h4>
	<div class="right"><a href="#" onclick="$(this).parent().parent().hide(); return false;"><? echo($this->getLabel("Chiudi")) ?></a></div>
	<br class="myClear" />
</div>
<form method="post" name="user_new" id="user_new" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" onsubmit="return check_user_new(this);" enctype="multipart/form-data">
	<div class="boxFormCol1">
	    <label id="label_nomearte" for="nomearte"><? echo($this->getLabel("Nickname")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nickname infobox")) ?></span></a></label><br/>
		<input type="text" name="nomearte" id="nomearte" class="textfieldsS" value="<? echo(isset($_POST['nomearte']) ? $_POST['nomearte'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
	<div class="boxFormCol2">
	    <label id="label_login2" for="login2"><? echo($this->getLabel("Username")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Username infobox")) ?></span></a></label><br/>
		<input type="text" name="login2" id="login2" class="textfieldsS" value="<? echo(isset($_POST['login2']) ? $_POST['login2'] : ""); ?>" maxlength="20" onfocus="clearError(this)" onkeydown="clearError(this)"  onkeyup="checkloginOnKeyUp(this,'1','20','login2_path')"  />
	    <div><? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/<span id="login2_path"><? echo(isset($_POST['login2']) ? $_POST['login2'] : ""); ?></span></div>
	</div>
	<br class="myClear" />
	<div class="boxFormCol1">
		<label class="labelBig" for="passwd" id="label_passwd"><? echo($this->getLabel("Inserisci Nuova Password")) ?> &nbsp;*&nbsp; <a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Inserisci Nuova Password")) ?></span> </a> </label><br/>
		<input type="password" name="passwd" id="passwd" value="<? echo((isset($_POST['passwd']) ? $_POST['passwd'] : "")); ?>" onfocus="clearError(this)" class="textfieldsS" />
	</div>
	<div class="boxFormCol2">
		<label class="labelBig" for="passwd2" id="label_passwd2"><? echo($this->getLabel("Conferma Nuova Password") ) ?> &nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Conferma Nuova Password")) ?></span> </a> </label><br />
		<input type="password" name="passwd2" id="passwd2" value="<? echo((isset($_POST['passwd2']) ? $_POST['passwd2'] : "")); ?>" onfocus="clearError(this)" class="textfieldsS" />
	</div>
	<br class="myClear" />
	<div class="boxFormFull">
		<label class="labelBig" for="email" id="label_email"><?php echo($this->getLabel("Email")); ?>&nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Inserisci l'Email")) ?></span> </a></label><br />
<? if(isset($_SESSION['verified_email'])){ ?>
		<input type="text" name="email" id="email" value="<? echo($_SESSION['verified_email']);  ?>" class="textfields" disabled="disabled" />
		<input type="hidden" name="email_v" value="<? echo($_SESSION['verified_email']);  ?>" />
<? }else{ ?>
		<input type="text" name="email" id="email" value="<? echo($_POST['email']); ?>" class="textfields" onfocus="clearError(this)" />				
<? } ?>		
	</div>
	<div class="boxFormCol1">
		<label class="labelBig" for="nome" id="label_nome"><?php echo($this->getLabel("Nome")); ?>&nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Inserisci il Nome")) ?></span> </a> </label><br />  
		<input type="text" name="nome" id="nome" value="<? echo($_POST['nome']); ?>" onfocus="clearError(this)" class="textfieldsS" />
	</div>
	<div class="boxFormCol2">
		<label class="labelBig" for="cognome" id="label_cognome"><?php echo($this->getLabel("Cognome")); ?>&nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Inserisci il Cognome")) ?></span> </a> </label><br />
		<input type="text" name="cognome" id="cognome" value="<? echo($_POST['cognome']); ?>" onfocus="clearError(this)" class="textfieldsS" />
	</div>
	<br class="myClear" />
	<div class="boxFormCol1">
		<label id="label_dataSogg" for="dataSogg"><? echo($this->getLabel("Data di nascita")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Data di nascita infobox")) ?></span></a></label><br/>
		<input name="dataSogg" id="dataSogg" class="textfieldsS" style="width:265px;margin-right: 10px;" maxlength="10" value="<? echo(isset($_POST['dataSogg']) ? $_POST['dataSogg'] : ""); ?>" onfocus="clearError(this)"/>
	</div>
	<div class="boxFormCol2">
		<label id="label_sesso" for="sesso"><? echo($this->getLabel("Sesso")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Specifica il Sesso")) ?></span></a></label><br/>
		<select name="sesso" id="sesso" class="textfieldsS" onfocus="clearError(this)" >
			<option value=""<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="" ? " selected=\"selected\"" : "") : " selected=\"selected\"")) ?>><?php echo($this->getLabel("Seleziona")); ?></option>
			<option value="F"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="F" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("F")) ?></option>
			<option value="M"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="M" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("M")) ?></option>
			<option value="O"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="O" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("Other")) ?></option>
		</select>			
	</div>
	<br class="myClear" />
	<div class="boxFormCol1">
		<label class="labelBig" for="citta" id="label_citta"><?php echo($this->getLabel("Citta'")); ?>&nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Specifica la tua citta'")) ?></span> </a></label><br />
		<input type="text" name="citta" id="citta" class="textfieldsS" value="<? echo($_POST['citta']); ?>" onfocus="clearError(this)" />
	</div>
	<div class="boxFormCol2">
		<label class="labelBig" for="nazione" id="label_nazione"><?php echo($this->getLabel("Nazione")); ?>&nbsp;*&nbsp;<a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Specifica la tua nazione")) ?></span> </a></label><br />
			<? echo((isset($_POST['nazione']) ? ($_POST['nazione'][0]=="Albania" ? " selected=\"selected\"" : "") : "")) ?>
		<select name="nazione" id="nazione" class="textfieldsS" onfocus="clearError(this)">
			<? include_once($this->initObj['site_path']."_php/form/stati.php") ?>
		</select>
	</div>
	<br class="myClear" />
	<div class="boxFormFull" id="label_consenso">
		<span class="labelBig"><?php echo($this->getLabel("Acconsenti al trattamento dei dati personali")); ?></span> (<a href="/disclaimers/privacy" target="_blank"><?php echo($this->getLabel("leggi")); ?></a>) <br />
		<span class="labelBig"><?php echo($this->getLabel("Perfavore accettare i termini delle condizioni")); ?></span> (<a href="/disclaimers/terms" target="_blank"><?php echo($this->getLabel("leggi")); ?></a>) 
	</div>
	<div class="boxFormFull">
		<div>
			<span class="labelBig"><?php echo($this->getLabel("Accetto")); ?><a class="info" href="#"> <img src="/_images/tip_small.png" border="0" alt="show tips"/> <span class="infobox"><? echo($this->getLabel("Accetto infobox")) ?></span> </a></span>
			<input type="radio" name="consenso" id="consensoSI" class="radio" value="SI"<? echo(($_POST['consenso']=="SI" ? "checked=\"checked\" " : "")); ?> onchange="clearErrors(this)" />
			<label class="labelBig" for="consensoSI" id="label_consensoSI"><?php echo($this->getLabel("SI")); ?></label>
			<input type="radio" name="consenso" id="consensoNO" class="radio" value="NO"<? echo(($_POST['consenso']=="NO" ? "checked=\"checked\" " : "")); ?> />
			<label class="labelBig" for="consensoNO" id="label_consensoNO"><?php echo($this->getLabel("NO")); ?></label>
		</div>
	</div>
	<div class="boxFormLpmSubmit right">
		<input type="submit" class="pulsBig" name="submit_user_new" id="submit_user_new" value="<?php echo($this->getLabel("Salva")); ?>" />
	</div>
	<br class="myClear" />
</form>
<script type="text/javascript">
	var theDate=new Date();
	$("#dataSogg").datepicker({
		showOn: "button",
		changeMonth: true,
		changeYear: true,
		yearRange: (theDate.getFullYear()-100)+':'+(theDate.getFullYear()-10),
		buttonImage: "/_images/calendar.gif",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd"
	});			
<? if(!isset($_POST['login2']) && !isset($_POST['passwd'])){ ?>		
	function resettaCampi(){
<? if(!isset($_POST['login2']) && !isset($_POST['passwd'])){ ?>					
		$("#login2").value="";
<?	} if(!isset($_POST['login2']) && !isset($_POST['passwd'])){ ?>								
		$("#passwd").value="";	
<? } ?>
	}
	$(document).ready(function () {
		setTimeout("resettaCampi()",500);
	});
<? } ?>
</script>
