<?
		$logStr="";
			$logStr.="				<div class=\"cntPadd\">\n";
			$logStr.="					<form method=\"post\" name=\"formLogin\" action=\"/controlpanel/login/\" id=\"formLogin2\">\n";
			$logStr.="						<div class=\"didaLoginCol1\">\n";
			$logStr.="							<label for=\"login2\" class=\"myLabelS\">".str_replace(" (FLxER url)","",$this->getLabel("Username"))." </label><div class=\"fieldsCnt\"><input type=\"text\" name=\"login\" id=\"login2\" class=\"textfieldsXS\" /></div>\n";
			$logStr.="							<br class=\"myClear\" />\n";
			$logStr.="							</div>\n";
			$logStr.="							<div class=\"didaLoginCol1\">\n";
			$logStr.="							<label for=\"password2\" class=\"myLabelS\">".$this->getLabel("Password")." </label><div class=\"fieldsCnt\"><input type=\"password\" name=\"password\" id=\"password2\" class=\"textfieldsXS\" /></div>\n";
			$logStr.="							<br class=\"myClear\" />\n";
			$logStr.="						</div>\n";
			$logStr.="						<div class=\"didaLoginCol2\">\n";
			$logStr.="							<label for=\"remPass2\" title=\"".$this->getLabel("Ricorda i dati di accesso su questo computer")."\" class=\"myLabel normal\">".$this->getLabel("Ricordami")."</label><input class=\"radio\" name=\"remPass\" id=\"remPass2\" type=\"checkbox\" value=\"true\" checked=\"checked\" />&nbsp;&nbsp;<input name=\"submit\" type=\"submit\" class=\"pulsE radio\" id=\"submit2\" value=\"".$this->getLabel("Entra")."\"  />\n";
			$logStr.="						</div>\n";
			$logStr.="						<br class=\"myClear\" />\n";
			$logStr.="					</form>\n";
			$logStr.="				</div>\n";
			$logStr.="				<div id=\"regLogin2\"><a href=\"/controlpanel/passwordRequest.php\">".$this->getLabel("Recupera dati")."</a> | <a href=\"/controlpanel/new/\" title=\"".$this->getLabel("Non sei ancora iscritto? registrati adesso")."\">".$this->getLabel("Registrati")."</a></div>\n";
		echo($logStr);
?>
