<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica")); echo(isset($_POST['titolo']) ? ": ".$_POST['titolo'] : $this->getLabel("Post")); ?></h3>
	</div>
	<div class="right new">			
	<? if($_POST['public'][0]==1){ ?>
		<a href="/<? echo($this->community->getPermalinkStr($_POST['uid'],"soggetti")."/postiflxer/".$this->community->getPermalinkStr($_GET['footageid'],"post")); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	<? } ?>&nbsp;
	</div>
	<br class="myClear" />
</div>
<div class="cntCol">
	<form method="post" name="post_edit" id="post_edit" onsubmit="return validate_post_edit(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo($_SERVER['QUERY_STRING']); ?>" enctype="multipart/form-data">
		<div class="col1Fullcol1-400">
			<? 	
			//GET FILE INFO
			if($_POST["encoded"]==1){
			?>
            <div id="playerPreview" style="display:block"></div>
			<script language="javascript"><!--
				$("#playerPreview").html(flashStringWriter("img_preview",400,338,"/_fp/flxerPlayer.swf?cnt=/<? echo $_POST["file_info"]["cartella"]."/".$_POST["file_info"]["nome"] ?>&thumbSaver=true&fpUpPath=/_fp/fpUp.php&fpUpJsOk=writeSnapshotOk&fpUpJsError=writeEncodingMessage&toolbarBottom=true&tit=edit%20footage%20preview&embedPath=&fpMenu=false&fullscreenBtn=false<? echo($_POST["img_arr"] != "/_images/default/defaultBig.gif" ? "&autostop=true&thumbnail=".$_POST["img_arr"] : "&autostop=false") ?>","window"));
			//-->
			</script>					
			<?	} else {	?>
            <div id="playerPreview" style="display:block">
				<div><h4><? echo($this->getLabel("Il nostro server sta ancora encodando il tuo video")) ?></h4></div>
			</div>
			<?	} ?>
			<input type="hidden" name="encoded" value="<? echo $_POST["encoded"] ?>" />
		</div>
		<div class="col1Fullcol2-400">
			<? 
			$this->community->db->query("SELECT files.name AS nome FROM files,post_rel WHERE files.id=post_rel.id_rel AND post_rel.tab_rel='file' AND (files.est='flv' OR files.est='swf' OR files.est='mov' OR files.est='avi' OR files.est='mp4' OR files.est='m4v' OR files.est='gif' OR files.est='jpg' OR files.est='mp3' OR files.est='txt') AND post_rel.id_from=".$_GET['footageid']." ORDER BY post_rel.ordina_rel LIMIT 1");
			$fres = $this->community->db->fetch();
			if($fres){
				echo("<label>".$this->getLabel("File").": <strong>".$fres[0]->nome."</strong></label><br /><br />"); 
			}
			?>
			<label id="label_performers" for="performers">
				<? echo($this->getLabel("Proprietario del post")) ?>&nbsp;*&nbsp;
				<a class="info" href="#">
					<img src="/_images/tip_small.png" border="0" alt="show tips"/>
					<span class="infobox"><? echo($this->getLabel("Proprietario del post infobox")) ?></span>
				</a>
			</label><br/>
			<label for="performers" id="label_performers"><input type="radio" onchange="clearErrors(this)" value="<? echo($_SESSION['user_id']); ?>" class="radio" id="performers" name="performers" <? echo(($_SESSION['user_id']==$_POST['uid'] ? " checked=\"checked\"" : "")); ?>/> <strong><? echo($this->getLabel("mio")) ?></strong></label><br />
			<?
			$this->community->db->query("select soggetti.id as id,soggetti.nomevisualizzato as label from soggetti,dipendenti where soggetti.id=dipendenti.id_a AND dipendenti.id_p=".$_SESSION['user_id']." and soggetti.chiavi like '%".$this->community->initObj['user_community_key']."%' ORDER BY nomevisualizzato");
			
			$res=$this->community->db->fetch();
			$cont_option=0;
			$optStr="";
			$performers_lists=array();
			if($res){
				foreach($res as $row){
					$performers_lists[]=$row->id;
					$optStr.="					<label id=\"label_performers_".$cont_option."\" for=\"performers_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"performers\" id=\"performers_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id ==$_POST['uid'] ? " checked=\"checked\"" : "")."/> ".$row->label."</label><br/>\n";
					$cont_option++;
				}
				echo($optStr);
			}
			
			//eccezzione per far modificare tutti i file a gianluca
			if(in_array($_SESSION['user_id'],$this->initObj['adminID']) && !in_array($_POST['uid'],$performers_lists) && $_SESSION['user_id']!=$_POST['uid']){
				$optStrXG="					<label id=\"label_performers_".$cont_option."\" for=\"performers_".$cont_option."\">";
				$optStrXG.="<input type=\"radio\" name=\"performers\" id=\"performers_".$cont_option."\" class=\"radio\" value=\"".$_POST['uid']."\" onchange=\"clearErrors(this)\" checked=\"checked\"/> <strong>VERO PROPRIETARIO</strong></label><br/>\n";
				echo($optStrXG);
			}
			?>
		</div>
		<br class="myClear" />
		<div class="col1Fullcol1-400">
<!-- Titolo -->
			<div class="cntCol">
		    	<label id="label_titolo" for="titolo"><? echo($this->getLabel("Titolo del iFLxER file")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Titolo del iFLxER file infobox")) ?></span></a></label><br/>
				<input type="text" name="titolo" id="titolo" class="textfieldsM" value="<? echo(isset($_POST['titolo']) ? $_POST['titolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
			</div>
<!-- END Titolo -->

<!-- Testo -->
			<div class="cntCol">
				<label id="label_testo" for="testo"><? echo($this->getLabel("Descrizione")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Descrizione infobox")) ?></span></a></label><br/>
				<textarea class="textAreaLangS" name="testo" id="testo" rows="5" cols="40" ><? echo(isset($_POST['testo']) ? $_POST['testo'] : ""); ?></textarea>
			</div>
<!-- END Testo -->
		</div>

		<div class="boxFormFull">
			<div class="actions"><? echo($this->getLabel("Visibile a tutti gli utenti")) ?>&nbsp;&nbsp;<? echo($_POST["encoded"]!=1 ? $this->getLabel("(disabilitato mentre il video sta encodando)") : ""); ?><a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Visibile a tutti gli utenti infobox")) ?></span></a></div>
			<label id="label_public" for="public"><input type="checkbox" name="public" id="public" class="radio" value="1" <? echo($_POST['public']=="1" ? " checked=\"checked\"" : ""); ?>  onchange="clearErrors(this)"<? echo($_POST["encoded"]!=1 ? " disabled=\"disabled\"" : ""); ?>/> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label><br/>
		</div>

		<div class="boxFormLpmSubmit right">
			<input type="submit" name="submit_post_edit" id="submit_post_edit" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
		</div>
		<br class="myClear"/>		
	</form>
</div>

