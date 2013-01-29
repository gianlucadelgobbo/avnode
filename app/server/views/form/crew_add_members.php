		<div class="cntTitPalette">
			<div class="col1Fullcol1-400">
				<h3><? echo($this->getLabel("Aggiungi utente")); ?></h3>
			</div>
			<div class="col1Fullcol2-400">			
				<a target="_blank" href="/<? echo($this->community->getPermalinkStr($_GET['crewid'],"soggetti")); ?>" class="right"><? echo($this->getLabel("Mostra")); ?></a>
			</div>
			<br class="myClear" />
		</div>
		<form method="post" name="crew_edit" id="crew_edit" action="#" enctype="multipart/form-data">
<!-- Membri -->
	<div class="boxFormFull">
		<div class="formSpacer">
			<label><? echo($this->getLabel("Membri")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Membri infobox")) ?></span></a></label>
			<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/crewMembersAdd.php?id_a=<? echo($_GET['crewid']); ?>','title':'<? echo($this->getLabel("Aggiungi membri al gruppo")) ?>', width:1027,height:($(window).height()-100)});return false;" href="#" class="right actions"><? echo($this->getLabel("Aggiungi utente")) ?></a>		
			<br class="myClear"/>		
		</div>	
		<div>	
			<ul class="membersList" id="multiple_members">
			<? 	if(isset($_POST['members'])){
					foreach($_POST['members'] as $k=>$mem){
			?>		
				<li><? 	if($mem['uid']!=$_SESSION['user_id']) { ?><a onclick="unlinkMember(this,<? echo($_GET['crewid']); ?>,<? echo($mem['uid']); ?>); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="<? echo($this->getLabel("Cancella")); ?>" /></a> <span class="actions"><? } else { ?><span class="actions" style="padding-left:20px"><? } ?> <? echo($mem['titolo']); ?></span>
				<input type="hidden" name="members[<? echo($k); ?>][uid]" value="<? echo($mem['uid']); ?>" />
				<input type="hidden" name="members[<? echo($k); ?>][titolo]" value="<? echo($mem['titolo']); ?>" /></li>
			<?		
					}
				}
				if(isset($_POST['members_notconfirmed'])){
					foreach($_POST['members_notconfirmed'] as $k=>$mem){
			?>		
				<li style="padding-left:20px"><span class="actions"><? echo($mem['titolo']); ?></span> [<? echo($this->getLabel("In attesa di conferma")); ?>]
				<input type="hidden" name="members_notconfirmed[<? echo($k); ?>][titolo]" value="<? echo($mem['titolo']); ?>" /></li>
			<?		
					}
				}
			?>
			</ul>
		</div>
	</div>
<!-- END Membri -->
			<div class="boxFormLpmSubmit right">
				<input type="submit" name="submit_crew_edit" id="submit_crew_edit" value="<? echo($this->getLabel("Avanti")) ?>" class="pulsBig" />
			</div>
			<br class="myClear"/>		
		</form>
