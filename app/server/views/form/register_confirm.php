<?	
if(isset($_GET['code']) && $_GET['esito']){ ?>
		<div class="inputFreeStyle">
			<div class="labelBig"><? echo($this->getLabel("Ecco i tuoi dati di accesso al sito:")) ?></div>
			<div>
				<br /><? echo($_GET['msg']) ?><br/><br/>
				<? echo($this->getLabel("Potrai modificare la tua password in seguito.")) ?><br/>
				<? echo($this->getLabel("A breve riceverai anche una email che ti ricorda i tuoi dati di accesso al sito.")) ?><br/><br/>
				<? //echo("<a href=\"/\">".$this->getLabel("Entra nella community!")."</a>") ?>
	            <? echo("<div class=\"labelBig\"><a href=\"/lpm/?step=2\">".$this->getLabel("Continua l'iscrizione ad LPM")."</a></div>"); ?>
			</div>
		</div>
<? } else { ?>
 		<div id="boxError"><div class="labelBig"><? echo($this->getLabel("L'url inserita non e'corretta.")) ?></div><br/><? echo($this->getLabel("Copia e incolla nella barra degli indirizzi del browser l'indirizzo completo che ti e' stato inviato per email")) ?></div>
<? } ?>
