<? if($esito && isset($_POST['mysubmit'])){ ?>
	<div class="inputFreeStyle">
		<div class="labelBig"><? echo($this->getLabel("I dati per l'accesso sono stati recuperati.")) ?></div>
		<div><? echo($this->getLabel("A breve riceverai una email con i dati per l'accesso al sito.")) ?><br /><? echo($this->getLabel("Grazie")) ?></div>
	</div>
<? 	}else{ 
	if(!$esito && isset($_POST['mysubmit'])){ ?>
	<div class="boxError">
		<div class="labelBig"><? echo($this->getLabel("La richiesta di recupero password non e' stata accolta.")) ?></div>
		<ul><? echo($err_msg) ?></ul>
		<strong><? echo($this->getLabel("controlla i dati e riprova")) ?></strong>
	</div>		
<? 	}  ?>	
	<div class="boxForm"><? echo($this->getLabel("Se hai perso o scordato la tua password inserisci qui Nickname ed email.")) ?><br /><? echo($this->getLabel("La password sara'rinnovata e ti sara'inviata per posta.")) ?></div>
	<form method="post" name="register" id="register" action="/controlpanel/passwordRequest.php">
		<? echo(( (isset($_POST['mysubmit']) && !$esito) ? $str : "")) ?>
		<div class="boxForm">
			<label class="labelBig" for="email"><? echo($this->getLabel("Email")) ?>*</label><br />
			<input type="text" name="email" id="email" class="textfieldsXS" value="<? echo($_POST['email']) ?>" />
		</div>	
		<div class="boxForm" style="text-align:center">
			<input type="submit" name="mysubmit" class="pulsS" value="<? echo($this->getLabel("Invia")) ?>" />
		</div>
	</form>
<? } ?>