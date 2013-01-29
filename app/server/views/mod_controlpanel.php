	<div class="cnt">
		<div id="col1">
<? if(isset($this->peopleFormInclude)){ ?>
			<div class="cntPadd gFFFFFF">
				<div class="bottomLineBig"><h1><? echo($this->col1tit); ?></h1></div>
				<div class="cntCol">
<? include_once($this->peopleFormInclude);?>
				</div>
			</div>
<? } elseif(isset($this->selected)){ ?>
			<div class="col1Full">
				<div class="cntPadd gFFFFFF">
					<h1><? echo($this->col1tit); ?></h1>
<? if($_SESSION['user_auth']){ ?>
					<div id="paletteMenu">
						<ul>
							<li><? echo(($this->selected == 0 ? "<span class=\"postMenuSel\">".$this->getLabel("Il mio profilo")."</span>" :  "<a href=\"?edit=publicdata\">".$this->getLabel("Il mio profilo")."</a>")) ?></li>
							<li><? echo(($this->selected == 1 ? "<span class=\"postMenuSel\">".$this->getLabel("Gruppi")."</span>" :  "<a href=\"?edit=crews\">".$this->getLabel("Gruppi")."</a>")) ?></li>
							<li><? echo(($this->selected == 2 ? "<span class=\"postMenuSel\">".$this->getLabel("Performances")."</span>" :  "<a href=\"?edit=performances\">".$this->getLabel("Performances")."</a>")) ?></li>
							<li><? echo(($this->selected == 3 ? "<span class=\"postMenuSel\">".$this->getLabel("Posts")."</span>" :  "<a href=\"?edit=footage\">".$this->getLabel("Post")."</a>")) ?></li>
							<li><? echo(($this->selected == 4 ? "<span class=\"postMenuSel\">".$this->getLabel("Playlists")."</span>" :  "<a href=\"?edit=playlists\">".$this->getLabel("Playlists")."</a>")) ?></li>
							<li><? echo(($this->selected == 5 ? "<span class=\"postMenuSel\">".$this->getLabel("Eventi")."</span>" :  "<a href=\"?edit=events\">".$this->getLabel("Eventi")."</a>")) ?></li>
							<li><? echo(($this->selected == 6 ? "<span class=\"postMenuSel\">".$this->getLabel("TV Shows")."</span>" :  "<a href=\"?edit=tvshows\">".$this->getLabel("TV Shows")."</a>")) ?></li>
							<li><? echo(($this->selected == 7 ? "<span class=\"postMenuSel\">".$this->getLabel("iFlxer files")."</span>" :  "<a href=\"?edit=postiflxer\">".$this->getLabel("iFlxer files")."</a>")) ?></li>
							<li><? echo(($this->selected == 8 ? "<span class=\"postMenuSel\">".$this->getLabel("iFlxer playlists")."</span>" :  "<a href=\"?edit=playlistsIflxer\">".$this->getLabel("iFlxer playlists")."</a>")) ?></li>
							<li><? echo(($this->selected == 9 ? "<span class=\"postMenuSel\">".$this->getLabel("Forum")."</span>" :  "<a href=\"?edit=forum\">".$this->getLabel("Forum")."</a>")) ?></li>
							<li><? echo(($this->selected == 10 ? "<span class=\"postMenuSel\">".$this->getLabel("Subscriptions")."</span>" :  "<a href=\"?edit=subscriptions\">".$this->getLabel("Subscriptions")."</a>")) ?></li>
							<!--<li><? echo(($this->selected == 6 ? "<span class=\"postMenuSel\">".$this->getLabel("Amici")."</span>" :  "<a href=\"?edit=friends\">".$this->getLabel("Amici")."</a>")) ?></li>-->
						</ul>
						<br class="myClear" />
					</div>
<? 	}
	//print_r($_SESSION);
	if($_SESSION['user_admin'] || $_SESSION["user_partner"]){ ?>
					<div id="paletteMenu">
						<? echo($this->getLabel("Administration tools")); ?>
						<ul>
							<li><? echo(($this->selected == 5 ? "<span class=\"postMenuSel\">".$this->getLabel("Eventi")."</span>" :  "<a href=\"admin/events\" target=\"_blank\">".$this->getLabel("Eventi")."</a>")) ?></li>
							<? if($_SESSION['user_admin']){ ?><li><? echo(($this->selected == 6 ? "<span class=\"postMenuSel\">".$this->getLabel("TV Shows")."</span>" :  "<a href=\"admin/vjtv\" target=\"_blank\">".$this->getLabel("TV Shows")."</a>")) ?></li><? } ?>
						</ul>
						<br class="myClear" />
					</div>
<? 	}
	if(isset($this->formAct) && isset($this->formBtn) && isset($this->formSave) && isset($this->formLoadData) && isset($this->formEdit)){
		include_once($this->formAct);
		if($esito && (isset($_POST[$this->formBtn]) || isset($_POST[$this->formBtnDel]))){
			include_once($this->formSave);
		}else{
			if(count($msg_err)>0){
               	echo("                	<div class=\"boxError\"><div class=\"labelBig\"><p>".$this->getLabel("La richiesta di inserimento dei dati non e' stata accolta.")."</p><ul>\n");
                foreach($msg_err as $err_m){
                    echo("                		<li>".$err_m."</li>\n");					
                }		
                echo("                	</ul><p>".$this->getLabel("controlla i dati e riprova")."</p></div></div>\n");		
			}
			if(!isset($_POST[$this->formBtn])){
				include_once($this->formLoadData);
			}
			include_once($this->formEdit);		
		}	
	}	
	if(isset($this->col1cnt)){
		echo($this->col1cnt);
	}
?>		
				</div>
			</div>
<?	} else {
		echo($this->col1cnt);
	}
?>
		</div>
		<div id="col2">
<?
echo($this->col2cnt);
?>
		</div>
	</div>
