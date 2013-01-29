				<div class="boxError">
					<div class="labelBig"><? echo($this->getLabel("ATTENZIONE: Questo evento si avvale dei servizi offerti dalla piattaforma FLxER.net")) ?>.</div>
					<ul>
						<li><b><? echo($this->getLabel("SE HAI GIA UN UTENTE SU FLxER.net FAI IL LOGIN")) ?></b></li>
						<li><? echo($this->getLabel("Se non ti ricordi la password clicca qui")) ?> <a href="/controlpanel/passwordRequest.php" target="_blank"><? echo($this->getLabel("Recupera dati")) ?></a></li>
						<li><? echo($this->getLabel("Se non ti ricordi la mail del tuo utente, scrivi a")) ?> <a href="mailto:<? echo($this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail']); ?>"><? echo($this->community->initObj['sections']['contacts'][$this->community->initObj['area']]['fromEmail']); ?></a></li>
						<li><b><? echo($this->getLabel("SOLO SE NON HAI UN UTENTE FLxER.net REGISTRATI")) ?></b></li>
					</ul>
				</div>
				<div class="col1half left">
					<h1><? echo($this->getLabel("Login")) ?></h1>
					<form id="login" method="post" action="#" onsubmit="return check_login();" name="login" >
						<div id="errLogin"><? echo($_SESSION["str_err"]); $_SESSION["str_err"]=NULL; ?></div>
						<div class="didaLoginCol1">
							<label class="myLabelS" for="login">Username </label><div class="fieldsCnt"><input type="text" class="textfieldsXS" id="login" name="login" /></div>
							<br class="myClear" />
							</div>
							<div class="didaLoginCol1">
							<label class="myLabelS" for="password">Password </label><div class="fieldsCnt"><input type="password" class="textfieldsXS" id="password" name="password" /></div>
							<br class="myClear" />
						</div>
						<div class="didaLoginCol2">
							<label class="myLabel normal" title="REMEMBER LOGIN DETAILS ON THIS COMPUTER" for="remPass">remember me</label><input type="checkbox" checked="checked" value="true" id="remPass" name="remPass" class="radio" />&nbsp;&nbsp;<input type="submit" value="ENTER" id="submit_login" class="pulsE radio" name="submit_login" />
						</div>
						<br class="myClear" />
					</form>
				</div>
				<div class="col1half right">
					<h1><? echo($this->getLabel("Registrati")) ?></h1>
<? if(!isset($_GET['act'])){ ?>
					<h4><? echo($this->getLabel("Metodo 1 (richiede conferma via mail)")) ?></h4>
					<div>
						<? echo($this->getLabel("Compila il form con i tuoi dati personali ed effettua la registrazione.")) ?> <a href="<? echo(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI']) ?>?step=1&amp;substep=0"><? echo($this->getLabel("Registrati")) ?></a>
					</div>
					<div class="cntCol">
						<? echo($this->getLabel("oppure")) ?>
					</div>
					<h4 class="cntCol"><? echo($this->getLabel("Metodo 2 (NON richiede conferma via mail)")) ?></h4>
					<div>
						<? echo($this->getLabel("Registrati utilizzando una registrazione effettuata su uno dei seguenti social network.")) ?>
					</div>
<? }else{ ?>
					<div>
						<? echo($this->getLabel("Redirection in progress. please wait." )) ?>
					</div>
<? } ?>

					<div id="componentDiv" class="cntCol"></div>
					<script type="text/javascript">
							//gigya.services.socialize.isLoggedIn(conf,{callback:checkLoginCallback});
					</script>
				</div>
				<br class="myClear" />
