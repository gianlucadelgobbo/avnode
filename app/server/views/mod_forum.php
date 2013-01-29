	<div class="cnt">
		<div id="col1">
			<div class="cntPadd">
				<div class="bottomLineBig"><h1><?php echo("<a href=\"/forum/\">".$this->getLabel("Forum")."</a>: ".$this->getLabel("Nuova discussione")); ?></h1></div>
				<div class="cntCol">
<? 
if($this->session_user_auth){
	include_once("../../_php/inc/forum_form.php");
} else {?>
					<div class="boxError">
						<div class="labelBig"><?php echo($this->getLabel("Per inviare un post devi essere loggato.")); ?></div>
						<strong><?php echo($this->getLabel("Non sei registrato?")); ?></strong>
						<ul>
							<li><a href="/controlpanel/new/"><?php echo($this->getLabel("registrati ora")); ?></a></li>
						</ul>
						<strong><?php echo($this->getLabel("Se sei gia registrato fai il login dal form a destra.")); ?></strong>
					</div>
<? } ?>
				</div>
			</div>			
		</div>
		<div id="col2">
<?
if(strpos($_SERVER['PHP_SELF'],"/login/")===false && !isset($_SESSION['user_auth'])){
	include_once($this->initObj['site_path']."_php/form/login/login.php");
}
?>
<? 
if($this->userDett){
	echo($this->userDett);
} else if($this->userId){
	echo($this->community->writeUserDett($this->community->getUserObj($this->userId,true,"medium"),"h3"));
} else if(isset($_SESSION['user_id'])){
	echo($this->community->writeUserDett($this->community->getUserObj($_SESSION['user_id'],true,"medium"),"h3"));
} else {
	echo($this->community->scriviBanner());
	if(!$this->usersHome){
		echo($this->community->writeListaExplorer1col());
	}
}
?>
<? echo($this->col2cnt); ?>
		</div>
	</div>
