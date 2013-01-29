<?
if(isset($_SESSION["lpm"]["accommodation"])) unset( $_SESSION["lpm"]["accommodation"]);
?>
		<div id="label_accommodationselect">&nbsp;</div>
		<form method="post" name="accommodationselect_form" id="accommodationselect_form" onsubmit="return check_accommodationselect();" action="#">
			<input type="radio" onchange="clearErrors(this)" name="accommodationselect" id="accommodationNO" class="radio" value="NO" <? echo(($_POST['accommodation']=="NO" ? " checked=\"checked\"" : "")); ?> />
			<label id="label_accommodationNO" for="accommodationNO" class="radio">&nbsp;&nbsp;<? echo($this->getLabel("NO"))?><br />
			<? echo($this->prices[$_SESSION["lpm_sub_type"]]["NO"]['tit'])?><br />
			<strong><? echo($this->getLabel("Prezzo"))?>: <? echo($this->prices[$_SESSION["lpm_sub_type"]]["NO"]['price'])?>,00 € <? echo($this->getLabel("per persona al giorno"))?></strong>
			</label>
			<br />
			<br />
			<input type="radio" onchange="clearErrors(this)" name="accommodationselect" id="accommodationSI" class="radio" value="SI" <? echo(($_POST['accommodation']=="SI" ? " checked=\"checked\"" : "")); ?> />
			<label id="label_accommodationSI" for="accommodationSI" class="radio">&nbsp;&nbsp;<? echo($this->getLabel("SI"))?><br />
			<? echo($this->prices[$_SESSION["lpm_sub_type"]]["SI"]['tit'])?><br />
			<strong><? echo($this->getLabel("Prezzo"))?>: <? echo($this->prices[$_SESSION["lpm_sub_type"]]["SI"]['price'])?>,00 € <? echo($this->getLabel("per persona al giorno"))?></strong>
			</label>
			<br />
			<br />
			<input type="radio" onchange="clearErrors(this)" name="accommodationselect" id="accommodationSIlusso" class="radio" value="SIlusso" <? echo(($_POST['accommodation']=="SIlusso" ? " checked=\"checked\"" : "")); ?> />
			<label id="label_accommodationSIlusso" for="accommodationSIlusso" class="radio">&nbsp;&nbsp;<? echo($this->getLabel("SI"))?><br />
			<? echo($this->prices[$_SESSION["lpm_sub_type"]]["SIlusso"]['tit'])?><br />
			<strong><? echo($this->getLabel("Prezzo"))?>: <? echo($this->prices[$_SESSION["lpm_sub_type"]]["SIlusso"]['price'])?>,00 € <? echo($this->getLabel("per persona al giorno"))?></strong>
			</label>
			<br />
			<br />
			<div id="errordiv" class="errorMsg"><? echo($_SESSION["str_err"]);$_SESSION["str_err"]=NULL; ?></div>
			<br class="myClear" />
			<div class="boxFormLpmSubmit right">
				<input type="submit" name="submit_accommodationselect" id="submit_accommodationselect" value="<? echo($this->getLabel("Avanti"))?>" class="pulsBig" />
			</div>
			<br class="myClear" />
		</form>