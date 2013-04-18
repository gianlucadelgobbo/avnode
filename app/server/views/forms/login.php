<?
		$logStr="";
		if(isset($_SESSION['user_auth'])){
			
			$obj["nomearte_attr"]=$obj["nomearte"];
			$logStr.="
						<div class=\"boxThumb90 right10\"><a href=\"/controlpanel/\" title=\"".$this->getLabel("Visualizza il dettaglio di")." ".$obj["nomearte_attr"]."\"><img src=\"".$obj['avatar']."\" alt=\"".$this->getLabel("Avatar di")." ".$obj["nomearte_attr"]."\" /></a></div>
						<div class=\"col2login\">
							<div class=\"titPost\"><strong>".$obj["nomearte"]."</strong></div>						
							<ul>
								<li class=\"txtPost\"><a href=\"/".$obj["login"]."/\">".$this->getLabel("Profilo")."</a></li>						
								<li class=\"txtPost\"><a href=\"/".$_SESSION['user_name']."/notifications/\" title=\"".$this->getLabel("Visualizza le notifiche")."\"> ".$this->getLabel("Notifiche")."<span class=\"jewelCount\">".$obj['notifiche']."</span></a></li>
								<li class=\"txtPost\"><a href=\"/controlpanel/\">".$this->getLabel("Pannello di controllo")."</a></li>						
								<li class=\"txtPost\"><a href=\"".$_SERVER['PHP_SELF'].(strpos("?",$_SERVER['PHP_SELF'])!==false ? "&" : "?")."logout=logout\">".$this->getLabel("Logout")."</a></li>
							</ul>
						</div>
						<br class=\"myClear\" />
						<br class=\"myClear\" />\n";
			
		}else{ 	
			$logStr.="
						<h3 class=\"h3Border\">".$this->getLabel("Login")."</h3>
						<form method=\"post\" name=\"formLogin\" action=\"".str_replace("index.php","",$_SERVER['PHP_SELF'])."\" id=\"formLogin\">
							<div class=\"didaLoginCol1\">
								<label for=\"login\" class=\"myLabelS\">".str_replace(" (FLxER url)","",$this->getLabel("Username"))." </label><div class=\"fieldsCnt\"><input type=\"text\" name=\"login\" id=\"login\" class=\"textfieldsXS\" /></div>
								<br class=\"myClear\" />
							</div>
							<div class=\"didaLoginCol1\">
								<label for=\"password\" class=\"myLabelS\">".$this->getLabel("Password")." </label><div class=\"fieldsCnt\"><input type=\"password\" name=\"password\" id=\"password\" class=\"textfieldsXS\" /></div>
								<br class=\"myClear\" />
							</div>
							<div class=\"didaLoginCol2\">
								<label for=\"remPass\" title=\"".$this->getLabel("Ricorda i dati di accesso su questo computer")."\" class=\"myLabel normal\">".$this->getLabel("Ricordami")."</label><input class=\"radio\" name=\"remPass\" id=\"remPass\" type=\"checkbox\" value=\"true\" checked=\"checked\" />&nbsp;&nbsp;<input name=\"submit\" type=\"submit\" class=\"pulsE radio\" id=\"submit\" value=\"".$this->getLabel("Entra")."\"  />
							</div>
							<br class=\"myClear\" />
						</form>
						<div id=\"regLogin\"><a href=\"/controlpanel/passwordRequest.php\">".$this->getLabel("Recupera dati")."</a> | <a href=\"/controlpanel/new/\" title=\"".$this->getLabel("Non sei ancora iscritto? registrati adesso")."\">".$this->getLabel("Registrati")."</a></div>\n";
		}
		echo($logStr);
?>
