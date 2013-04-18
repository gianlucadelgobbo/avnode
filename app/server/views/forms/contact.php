<div class="cntPadd">
<?
	if ($_POST['SubmitContact']) { 
		$res=false;
		if(trim($_POST['email']) && trim($_POST['nome']) && trim($_POST['yourMessage'])){
			$messaggio = "From: ".$_POST['nome']." ".$_POST['cognome']."\n\nEmail: ".$_POST['email']."\n\nMessagge:\n".$_POST['yourMessage'];
			$fromEmail=$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail'];
			$fromName=$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromName'];
			$toEmail=$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['toEmail'];
			$toName=$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['toName'];
			$subject=$this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['subject'];

			$res=$this->community->invia($fromEmail,$fromName,$toEmail,$toName,$subject,$messaggio);					
		}
		if($res){
			$col2=$this->getLabel("Messaggio inviato.")."<br />".$this->getLabel("Grazie di averci scritto").".";
		}else{
			$col2=$this->getLabel("Messaggio NON inviato.");
		}
		echo($col2);		
	}else{
?>
			<form method="post" name="contact_form" id="contact_form" action="#" enctype="multipart/form-data">
				<div class="boxForm"><?php echo($this->getLabel("I campi contrassegnati da asterisco sono obbligatori.")); ?></div>
				<div class="boxForm">
					<label class="labelBig" for="nome"><?php echo($this->getLabel("Nome")); ?>*</label><br />
					<input type="text" name="nome" id="nome" value="<? echo($_POST['nome']); ?>" class="textfieldsM" />
				</div>
				<div class="boxForm">
					<label class="labelBig" for="cognome"><?php echo($this->getLabel("Cognome")); ?>*</label><br />
					<input type="text" name="cognome" id="cognome" value="<? echo($_POST['cognome']); ?>" class="textfieldsM" />
				</div>
				<div class="boxForm">
					<label class="labelBig" for="email"><?php echo($this->getLabel("Email")); ?>*</label><br />
					<input type="text" name="email" id="email" value="<? echo($_POST['email']); ?>" class="textfieldsM" />
				</div>
				<div class="boxForm">
					<label class="labelBig" for="mytext"><?php echo($this->getLabel("Messaggio")) ?>*</label> <?php echo($this->getLabel("(max 1000 caratteri)")) ?><br />
					<textarea name="yourMessage" id="yourMessage" cols="45" rows="8" class="textfieldsM" onkeyup="checkTextLimit(this)"><? echo($_POST['mytext']); ?></textarea>
				</div>
				<div class="boxForm" style="text-align:center">
					<input type="submit" name="SubmitContact" id="SubmitContact" value="<?php echo($this->getLabel("Invia")); ?>" class="pulsBig" onclick="return checkContactData()" />
				</div>
			</form>
<?	}	?>
</div>