<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica").(isset($_POST['titolo']) ? ": ".$_POST['titolo'] : " ".$this->getLabel("TV Show"))); ?></h3>
	</div>
	<div class="right new">			
	<? if($_POST['public'][0]==1){ ?>
		<a href="/<? echo($_POST['performers'][0]['login']."/tvshows/".$this->community->getPermalinkStr($_GET['tvshowid'],"files")); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	<? } ?>&nbsp;		
	</div>
	<br class="myClear" />
</div>
<form method="post" name="tvshow_edit" id="tvshow_edit" onsubmit="return validate_tvshow_edit(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" enctype="multipart/form-data">
	<div class="boxFormFull">			
    	<label id="label_titolo" for="titolo"><? echo($this->getLabel("Nome del TV Show")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nome del TV Show infobox")) ?></span></a></label><br/>
		<input type="text" name="titolo" id="titolo" class="textfields" value="<? echo(isset($_POST['titolo']) ? $_POST['titolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
	<div class="col1Fullcol1-400 mb10">
		<label id="label_tvshow"><? echo($this->getLabel("File video")) ?></label>	
		<? 	
			$exclude = array(406,408,383);

			$encoded="0";
			$est=substr($_POST["file"], strrpos($_POST["file"], ".")+1);
			if($est!="swf" && $est!="flv"){
				$ffmpegObj = new ffmpeg_movie($this->community->initObj["site_path"].$_POST["file"]);
				if($ffmpegObj->getVideoCodec()=="h264")
					$encoded="1";
			}else{
				$encoded="1";
			}
			//GET FILE INFO
			if($encoded==1){ 
			?>
            <div id="playerPreview" style="display:block"></div>
			<script language="javascript"><!--
				$("#playerPreview").html(flashStringWriter("img_preview",400,338,"/_fp/flxerPlayer.swf?cnt=/<? echo $_POST["file"] ?>&thumbSaver=true&fpUpPath=/_fp/fpUp.php&fpUpJsOk=writeSnapshotOk&fpUpJsError=writeEncodingMessage&toolbarBottom=true&tit=edit%20footage%20preview&embedPath=&fpMenu=false&fullscreenBtn=false<? echo($_POST["img_arr"] != "/_images/default/defaultBig.gif" ? "&autostop=true&thumbnail=".$_POST["img_arr"] : "&autostop=false") ?>","window"));
			//-->
			</script>					
			<?	} else {	?>
            <div id="playerPreview" style="display:block">
				<div><h4><? echo($this->getLabel("Il nostro server sta ancora encodando il tuo video")) ?></h4></div>
			</div>
			<?	} ?>
            <input type="hidden" name="file" value="<? echo $_POST["file"] ?>" />
	</div>
	<div class="col1Fullcol2-400">
	    <label id="label_type"><? echo($this->getLabel("Tipo")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Tipo infobox")) ?></span></a></label><br/>
		<?
		$this->community->db->query("select id as id,nome as label from chiavi where id_p=587 order by nome");
		$res=$this->community->db->fetch();
		$cont_option=0;
		$optStr="";
		if($res){
			foreach($res as $row){
				if (!in_array($row->id, $exclude)) {
					$optStr.="	<label id=\"label_type_".$cont_option."\" for=\"type_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"type\" id=\"type_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($_POST['type']==$row->id ? " checked=\"checked\"" : "")."/>";
					$optStr.=$row->label."</label>\n	<br/>\n";
				}
				$cont_option++;
			}
			echo($optStr);
		}
		?>
	</div>
	<br class="myClear" />
	<div class="boxFormFull">			
		<div class="formSpacer">
			<div class="actions"><? echo($this->getLabel("Descrizione")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Descrizione infobox")) ?></span></a></div>
		</div>	
		<div class="boxFormCol1_3">
			<strong><? echo($this->getLabel("Lingue")) ?></strong>
			<ul>
			<? foreach($this->availableLng as $ll){ ?>
				<li id="label_<? echo(strtoupper($ll["sigla"])); ?>"><?
				if($_POST["bio_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng']){
					echo($ll["lingua"]);		
				}else{
					echo("<a href=\"#cnt_bio_".strtoupper($ll["sigla"])."\" id=\"a_bio_".strtoupper($ll["sigla"])."\" onclick=\"showLangDiv('".strtoupper($ll["sigla"])."'); return false;\">".$ll["lingua"]."</a>");
				}
				?></li>
			<? } ?>
			</ul>
			<br class="myClear"/>
		</div>
		<div class="boxFormCol2_3">
			<? foreach($this->availableLng as $ll){ ?>
			<div id="cnt_bio_<? echo(strtoupper($ll["sigla"])); ?>" <? echo(($_POST["bio_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng'] ? "" : " style=\"display:none\"")); ?>>
				<label id="label_bio_<? echo(strtoupper($ll["sigla"])); ?>" for="bio_<? echo(strtoupper($ll["sigla"])); ?>">
					<? echo($ll["lingua"]); ?>
				</label><br/>
				<textarea class="textAreaLang" name="bio_<? echo(strtoupper($ll["sigla"])); ?>" id="bio_<? echo(strtoupper($ll["sigla"])); ?>" class="textfields" rows="5" cols="40" ><? echo(isset($_POST["bio_".strtoupper($ll["sigla"])]) ? $_POST["bio_".strtoupper($ll["sigla"])] : ""); ?></textarea>
			</div>
			<? } ?>
			<br class="myClear"/>
		</div>
	</div>
		<div class="boxFormFull">
			<div class="actions"><? echo($this->getLabel("Visibile a tutti gli utenti")) ?>&nbsp;&nbsp;<? echo($encoded!=1 ? $this->getLabel("(disabilitato mentre il video sta encodando)") : ""); ?><a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Visibile a tutti gli utenti infobox")) ?></span></a></div>
			<label id="label_public" for="public"><input type="checkbox" name="public" id="public" class="radio" value="1" <? echo($_POST['public']=="1" ? " checked=\"checked\"" : ""); ?>  onchange="clearErrors(this)"<? echo($encoded!=1 ? " disabled=\"disabled\"" : ""); ?>/> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label><br/>
		</div>

	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_tvshow_edit" id="submit_tvshow_edit" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>
