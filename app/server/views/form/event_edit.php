<?
	$exclude = array(615);	
?>
<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica")); echo(isset($_POST['titolo']) ? ": ".$_POST['titolo'] : $this->getLabel("Evento")); ?></h3>
	</div>
	<div class="right new">			
	<? if($_POST['public'][0]==1){ ?>
		<a href="/<? echo($this->community->getPermalinkStr($_SESSION['user_id'],"soggetti")."/events/".$this->community->getPermalinkStr($_GET['eventid'],"progetti")); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	<? } ?>
	</div>
	<br class="myClear" />
</div>
<form method="post" name="event_edit" id="event_edit" onsubmit="return check_event_edit(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" enctype="multipart/form-data">
	<div id="avatar">
		<label id="label_avatar"><? echo($this->getLabel("Immagine principale dell'evento")) ?></label>
		
		<? if(isset($_POST['avatar_name'])){ ?>
		<div id="playerPreview" style="">
			<input id="avatar_name" type="hidden" value="<? echo $_POST['avatar_name'] ?>" name="avatar_name">
			<img src="/_php/ajax/image_display.php?n=<? echo $_POST['avatar_name'] ?>&w=400&h=300&rand=632" />
		</div>
		<? } else if($_POST['img_arr'] && $_POST['img_arr'] != "/_images/default/defaultBig.gif") { ?>
		<div id="playerPreview">
			<input type="hidden" id="img_arr" name="img_arr" value="<? echo $_POST['img_arr'] ?>" />
			<img id="avatar_old_img" src="<? echo $_POST['img_arr'] ?>" />
		</div>
		<? } else { ?>
		<div id="playerPreview" style="display:none;">&nbsp;</div>
		<? } ?>
		<div id="file-uploader">       
			<noscript>          
				<p><? echo($this->getLabel("Please enable JavaScript to Upload.")) ?></p>
			</noscript>
		</div>
	</div>
	<div class="boxFormFull">			
		<label id="label_titolo" for="titolo"><? echo($this->getLabel("Nome dell'evento")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nome dell'evento infobox")) ?></span></a></label><br/>
		<input type="text" name="titolo" id="titolo" class="textfields" value="<? echo(isset($_POST['titolo']) ? $_POST['titolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
	<div class="boxFormFull">			
		<label id="label_sottotitolo" for="sottotitolo"><? echo($this->getLabel("Sottotitolo dell'evento")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Sottotitolo dell'evento infobox")) ?></span></a></label>
		<input type="text" name="sottotitolo" id="sottotitolo" class="textfields" value="<? echo(isset($_POST['sottotitolo']) ? $_POST['sottotitolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
	<!-- Locations -->
	<div class="boxFormFull">
		<div class="formSpacer">
			<div class="left actions"><? echo($this->getLabel("Date e Luoghi")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Location infobox")) ?></span></a></div>
			<br class="myClear" />
		</div>	
		<div id="multiple_location"><? echo($_POST['data']) ?>
		<? for($a=0; $a<count($_POST['dataluogo']);$a++){ ?>
			<div class="cntCol">						
				<div class="boxFormCol1">
					<label id="label_data_evento" for="data_evento"><span class="counter">1</span> 
						<? echo($this->getLabel("Data")) ?>&nbsp;*&nbsp;
						<a class="info" href="#">
							<img src="/_images/tip_small.png" border="0" alt="show tips"/>
							<span class="infobox"><? echo($this->getLabel("Data infobox")) ?></span>
						</a>
					</label><br/>
					<input name="dataluogo[<? echo $a ?>][data_evento]" id="data_evento" onfocus="clearError(this)" class="data_evento textfieldsS" style="width:225px;" maxlength="10" value="<? echo(isset($_POST['dataluogo'][$a]['data_evento']) ? $_POST['dataluogo'][$a]['data_evento'] : "0000:00:00"); ?>" />
					<br class="myClear" />
				</div>
				<div class="boxFormCol2">  	
					<label id="label_luogo" for="luogo"><? echo($this->getLabel("Luogo")) ?></label>
					<input type="text" name="dataluogo[<? echo $a ?>][luogo]" id="luogo" class="textfieldsS" value="<? echo(isset($_POST['dataluogo'][$a]['luogo']) ? $_POST['dataluogo'][$a]['luogo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
				</div>
				<br class="myClear" />
				<div class="boxFormCol1">  	
					<label id="label_ora_inizio" for="ora_inizio"> <? echo($this->getLabel("ora_inizio'")) ?></label>
					<select name="dataluogo[<? echo $a ?>][ora_inizio]" id="ora_inizio" class="textfieldsS" onfocus="clearError(this)" >
						<option value=""><?php echo($this->getLabel("Seleziona")); ?></option>
						<option value="00:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="00:00" ? " selected=\"selected\"" : "")) ?>>00:00</option>
						<option value="00:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="00:30" ? " selected=\"selected\"" : "")) ?>>00:30</option>
						<option value="01:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="01:00" ? " selected=\"selected\"" : "")) ?>>01:00</option>
						<option value="01:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="01:30" ? " selected=\"selected\"" : "")) ?>>01:30</option>
						<option value="02:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="02:00" ? " selected=\"selected\"" : "")) ?>>02:00</option>
						<option value="02:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="02:30" ? " selected=\"selected\"" : "")) ?>>02:30</option>
						<option value="03:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="03:00" ? " selected=\"selected\"" : "")) ?>>03:00</option>
						<option value="03:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="03:30" ? " selected=\"selected\"" : "")) ?>>03:30</option>
						<option value="04:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="04:00" ? " selected=\"selected\"" : "")) ?>>04:00</option>
						<option value="04:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="04:30" ? " selected=\"selected\"" : "")) ?>>04:30</option>
						<option value="05:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="05:00" ? " selected=\"selected\"" : "")) ?>>05:00</option>
						<option value="05:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="05:30" ? " selected=\"selected\"" : "")) ?>>05:30</option>
						<option value="06:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="06:00" ? " selected=\"selected\"" : "")) ?>>06:00</option>
						<option value="06:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="06:30" ? " selected=\"selected\"" : "")) ?>>06:30</option>
						<option value="07:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="07:00" ? " selected=\"selected\"" : "")) ?>>07:00</option>
						<option value="07:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="07:30" ? " selected=\"selected\"" : "")) ?>>07:30</option>
						<option value="08:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="08:00" ? " selected=\"selected\"" : "")) ?>>08:00</option>
						<option value="08:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="08:30" ? " selected=\"selected\"" : "")) ?>>08:30</option>
						<option value="09:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="09:00" ? " selected=\"selected\"" : "")) ?>>09:00</option>
						<option value="09:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="09:30" ? " selected=\"selected\"" : "")) ?>>09:30</option>
						<option value="10:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="10:00" ? " selected=\"selected\"" : "")) ?>>10:00</option>
						<option value="10:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="10:30" ? " selected=\"selected\"" : "")) ?>>10:30</option>
						<option value="11:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="11:00" ? " selected=\"selected\"" : "")) ?>>11:00</option>
						<option value="11:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="11:30" ? " selected=\"selected\"" : "")) ?>>11:30</option>
						<option value="12:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="12:00" ? " selected=\"selected\"" : "")) ?>>12:00</option>
						<option value="12:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="12:30" ? " selected=\"selected\"" : "")) ?>>12:30</option>
						<option value="13:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="13:00" ? " selected=\"selected\"" : "")) ?>>13:00</option>
						<option value="13:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="13:30" ? " selected=\"selected\"" : "")) ?>>13:30</option>
						<option value="14:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="14:00" ? " selected=\"selected\"" : "")) ?>>14:00</option>
						<option value="14:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="14:30" ? " selected=\"selected\"" : "")) ?>>14:30</option>
						<option value="15:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="15:00" ? " selected=\"selected\"" : "")) ?>>15:00</option>
						<option value="15:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="15:30" ? " selected=\"selected\"" : "")) ?>>15:30</option>
						<option value="16:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="16:00" ? " selected=\"selected\"" : "")) ?>>16:00</option>
						<option value="16:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="16:30" ? " selected=\"selected\"" : "")) ?>>16:30</option>
						<option value="17:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="17:00" ? " selected=\"selected\"" : "")) ?>>17:00</option>
						<option value="17:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="17:30" ? " selected=\"selected\"" : "")) ?>>17:30</option>
						<option value="18:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="18:00" ? " selected=\"selected\"" : "")) ?>>18:00</option>
						<option value="18:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="18:30" ? " selected=\"selected\"" : "")) ?>>18:30</option>
						<option value="19:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="19:00" ? " selected=\"selected\"" : "")) ?>>19:00</option>
						<option value="19:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="19:30" ? " selected=\"selected\"" : "")) ?>>19:30</option>
						<option value="20:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="20:00" ? " selected=\"selected\"" : "")) ?>>20:00</option>
						<option value="20:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="20:30" ? " selected=\"selected\"" : "")) ?>>20:30</option>
						<option value="21:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="21:00" ? " selected=\"selected\"" : "")) ?>>21:00</option>
						<option value="21:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="21:30" ? " selected=\"selected\"" : "")) ?>>21:30</option>
						<option value="22:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="22:00" ? " selected=\"selected\"" : "")) ?>>22:00</option>
						<option value="22:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="22:30" ? " selected=\"selected\"" : "")) ?>>22:30</option>
						<option value="23:00"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="23:00" ? " selected=\"selected\"" : "")) ?>>23:00</option>
						<option value="23:30"<? echo(($_POST['dataluogo'][$a]['ora_inizio']=="23:30" ? " selected=\"selected\"" : "")) ?>>23:30</option>
					</select>
				</div>
				<div class="boxFormCol2">
					&nbsp;<label id="label_ora_fine" for="ora_fine"><? echo($this->getLabel("ora_fine")) ?></label>
					<select name="dataluogo[<? echo $a ?>][ora_fine]" id="ora_fine" class="textfieldsS" onfocus="clearError(this)" >
						<option value=""><?php echo($this->getLabel("Seleziona")); ?></option>
						<option value="00:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="00:00" ? " selected=\"selected\"" : "")) ?>>00:00</option>
						<option value="00:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="00:30" ? " selected=\"selected\"" : "")) ?>>00:30</option>
						<option value="01:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="01:00" ? " selected=\"selected\"" : "")) ?>>01:00</option>
						<option value="01:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="01:30" ? " selected=\"selected\"" : "")) ?>>01:30</option>
						<option value="02:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="02:00" ? " selected=\"selected\"" : "")) ?>>02:00</option>
						<option value="02:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="02:30" ? " selected=\"selected\"" : "")) ?>>02:30</option>
						<option value="03:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="03:00" ? " selected=\"selected\"" : "")) ?>>03:00</option>
						<option value="03:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="03:30" ? " selected=\"selected\"" : "")) ?>>03:30</option>
						<option value="04:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="04:00" ? " selected=\"selected\"" : "")) ?>>04:00</option>
						<option value="04:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="04:30" ? " selected=\"selected\"" : "")) ?>>04:30</option>
						<option value="05:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="05:00" ? " selected=\"selected\"" : "")) ?>>05:00</option>
						<option value="05:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="05:30" ? " selected=\"selected\"" : "")) ?>>05:30</option>
						<option value="06:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="06:00" ? " selected=\"selected\"" : "")) ?>>06:00</option>
						<option value="06:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="06:30" ? " selected=\"selected\"" : "")) ?>>06:30</option>
						<option value="07:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="07:00" ? " selected=\"selected\"" : "")) ?>>07:00</option>
						<option value="07:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="07:30" ? " selected=\"selected\"" : "")) ?>>07:30</option>
						<option value="08:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="08:00" ? " selected=\"selected\"" : "")) ?>>08:00</option>
						<option value="08:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="08:30" ? " selected=\"selected\"" : "")) ?>>08:30</option>
						<option value="09:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="09:00" ? " selected=\"selected\"" : "")) ?>>09:00</option>
						<option value="09:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="09:30" ? " selected=\"selected\"" : "")) ?>>09:30</option>
						<option value="10:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="10:00" ? " selected=\"selected\"" : "")) ?>>10:00</option>
						<option value="10:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="10:30" ? " selected=\"selected\"" : "")) ?>>10:30</option>
						<option value="11:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="11:00" ? " selected=\"selected\"" : "")) ?>>11:00</option>
						<option value="11:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="11:30" ? " selected=\"selected\"" : "")) ?>>11:30</option>
						<option value="12:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="12:00" ? " selected=\"selected\"" : "")) ?>>12:00</option>
						<option value="12:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="12:30" ? " selected=\"selected\"" : "")) ?>>12:30</option>
						<option value="13:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="13:00" ? " selected=\"selected\"" : "")) ?>>13:00</option>
						<option value="13:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="13:30" ? " selected=\"selected\"" : "")) ?>>13:30</option>
						<option value="14:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="14:00" ? " selected=\"selected\"" : "")) ?>>14:00</option>
						<option value="14:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="14:30" ? " selected=\"selected\"" : "")) ?>>14:30</option>
						<option value="15:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="15:00" ? " selected=\"selected\"" : "")) ?>>15:00</option>
						<option value="15:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="15:30" ? " selected=\"selected\"" : "")) ?>>15:30</option>
						<option value="16:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="16:00" ? " selected=\"selected\"" : "")) ?>>16:00</option>
						<option value="16:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="16:30" ? " selected=\"selected\"" : "")) ?>>16:30</option>
						<option value="17:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="17:00" ? " selected=\"selected\"" : "")) ?>>17:00</option>
						<option value="17:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="17:30" ? " selected=\"selected\"" : "")) ?>>17:30</option>
						<option value="18:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="18:00" ? " selected=\"selected\"" : "")) ?>>18:00</option>
						<option value="18:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="18:30" ? " selected=\"selected\"" : "")) ?>>18:30</option>
						<option value="19:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="19:00" ? " selected=\"selected\"" : "")) ?>>19:00</option>
						<option value="19:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="19:30" ? " selected=\"selected\"" : "")) ?>>19:30</option>
						<option value="20:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="20:00" ? " selected=\"selected\"" : "")) ?>>20:00</option>
						<option value="20:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="20:30" ? " selected=\"selected\"" : "")) ?>>20:30</option>
						<option value="21:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="21:00" ? " selected=\"selected\"" : "")) ?>>21:00</option>
						<option value="21:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="21:30" ? " selected=\"selected\"" : "")) ?>>21:30</option>
						<option value="22:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="22:00" ? " selected=\"selected\"" : "")) ?>>22:00</option>
						<option value="22:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="22:30" ? " selected=\"selected\"" : "")) ?>>22:30</option>
						<option value="23:00"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="23:00" ? " selected=\"selected\"" : "")) ?>>23:00</option>
						<option value="23:30"<? echo(($_POST['dataluogo'][$a]['ora_fine']=="23:30" ? " selected=\"selected\"" : "")) ?>>23:30</option>
					</select>
				</div>	
				<br class="myClear" />
				<div class="boxFormCol1">  	
					<label id="label_citta" for="citta"> <? echo($this->getLabel("Citta'")) ?></label>
					<input type="text" name="dataluogo[<? echo $a ?>][citta]" id="citta" class="textfieldsS" value="<? echo(isset($_POST['dataluogo'][$a]['citta']) ? $_POST['dataluogo'][$a]['citta'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
				</div>
				<div class="boxFormCol2">
					&nbsp;<label id="label_nazione" for="nazione"><? echo($this->getLabel("Nazione")) ?></label>
					<select name="dataluogo[<? echo $a ?>][nazione]" id="nazione" class="textfieldsS" onfocus="clearError(this)" >
						<? include($this->community->initObj["site_path"]."_php/form/statiEvents.php") ?>
					</select>
				</div>	
				<br class="myClear" />
			</div>
		<? } ?>
		</div>
		<div id="multiple_location_control" style="text-align:right"><a class="multiple_minus" href="">[-]</a> <a class="multiple_plus" href="">[+]</a></div>
	</div>
	<!-- END Locations -->

	<!-- END Performances -->
	<div class="boxFormFull">
		<div class="formSpacer">
			<label><? echo($this->getLabel("Performances")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Performances infobox")) ?></span></a></label>
			<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/eventPerformanceAdd.php?eventid=<? echo($_GET['eventid']); ?>','title':'<? echo($this->getLabel("Invita performance")) ?>', width:400,height:($(window).height()-100)});return false;" href="#" class="right actions"><? echo($this->getLabel("Invita performance")) ?></a>		
			<br class="myClear"/>		
		</div>	
		<div>	
			<ul class="performancesList" id="multiple_performances">
			<? 	if(count($_POST['performances'])){
					foreach($_POST['performances'] as $k=>$perfBlock){
			?>
			<div class="actions"><? echo $k; ?></div>
			<ul class="performancesList">
			<?
					foreach($perfBlock as $perf){
						$str = "";
						foreach($perf['performers'] as $performer) $str.= $performer['nomearte'].", ";
						$str = substr($str,0 ,strlen($str)-2);
			?>
				<li>
					<a onclick="unlinkPerformance(this,<? echo($_GET['eventid']); ?>,<? echo($perf['id']); ?>); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="<? echo($this->getLabel("Cancella")); ?>" /></a> 
					<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/eventPerformanceEdit.php?eventid=<? echo($_GET['eventid']); ?>&id=<? echo($perf['id']); ?>&rel_id=<? echo($perf['rel_id']); ?>','title':'<? echo($this->getLabel("Modifica")) ?>', width:400,height:500});return false;" href="#"><img src="/_images/edit_16.gif" width="16" alt="<? echo($this->getLabel("Modifica")); ?>" /></a> 
					<a href="/controlpanel/?edit=performances&perfid=<? echo($perf['id']); ?>" target="_blank"><img src="/_images/edit_16.gif" width="16" alt="<? echo($this->getLabel("Modifica")); ?>" /></a> 
					<strong class="actions"><? echo($perf['titolo']); ?></strong><br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><? echo($str); ?></span><br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><? echo($perf['typeStr'].($_POST['salabase'] ? ($perf['room'] ? " | ".$perf['room'] : "ERROR") :"")); ?></span>
				</li>
			<?		
					}
			?>
			</ul>
			<br />
			<?		
				}
			}
			if(count($_POST['performances_notconfirmed'])){
			?>
			<div class="actions"><? echo($this->getLabel("In attesa di conferma")); ?></div>
			<ul class="performancesList">
			<?
					foreach($_POST['performances_notconfirmed'] as $perf){
			?>
				<li>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="actions"><? echo($perf->titolo); ?></strong><br />
				</li>
			<?		
					}
			?>
			</ul>
			<?		
				}
			?>
	    </div>
	</div>
	<!-- END Performances -->

	<!-- Produzione -->
	<div class="boxFormCol1">
		<div class="formSpacer">
			<label><? echo($this->getLabel("Produzione")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Produzione infobox")) ?></span></a></label>
			<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/eventPartnersAdd.php?eventid=<? echo($_GET['eventid']); ?>&ruolo=746','title':'<? echo($this->getLabel("Invita produzione")) ?>', width:400,height:($(window).height()-100)});return false;" href="#" class="right actions"><? echo($this->getLabel("Invita produzione")) ?></a>		
			<br class="myClear"/>		
		</div>	
		<div id="multiple_production">	
			<?
			if(count($_POST['performers'])){

			?>
			<div class="actions"><? echo $ruolo; ?></div>
			<ul class="performancesList">
			<?
					foreach($_POST['performers'] as $partner){
			?>
				<li>
					<a onclick="unlinkPartner(this,<? echo($_GET['eventid']); ?>,<? echo($partner['rel_id']); ?>); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="<? echo($this->getLabel("Cancella")); ?>" /></a> 
					<strong class="actions"><? echo($partner['nomearte']); ?></strong></span>
				</li>
			<?		
					}
			?>
			</ul>
			<br />
			<?		
			}
			if(count($_POST['performers_notconfirmed'])){
			?>
			<div class="actions"><? echo($this->getLabel("In attesa di conferma")); ?></div>
			<ul class="performancesList">
			<?
					foreach($_POST['performers_notconfirmed'] as $partner){
						print_r($_POST['performers_notconfirmed']);
			?>
				<li>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="actions"><? echo($partner->nomearte); ?></strong><br />
				</li>
			<?		
					}
			?>
			</ul>
<?
				}
			?>
	    </div>
	</div>
	<!-- END Produzione -->
	<!-- Partners -->
	<div class="boxFormCol2">
		<div class="formSpacer">
			<label><? echo($this->getLabel("Partners")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Partners infobox")) ?></span></a></label>
			<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/eventPartnersAdd.php?eventid=<? echo($_GET['eventid']); ?>','title':'<? echo($this->getLabel("Invita partner")) ?>', width:400,height:($(window).height()-100)});return false;" href="#" class="right actions"><? echo($this->getLabel("Invita partner")) ?></a>		
			<br class="myClear"/>		
		</div>	
		<div id="multiple_partners">	
			<?
			if(count($_POST['partners'])){

				foreach($_POST['partners'] as $ruolo=>$partBlock){
			?>
			<div class="actions"><? echo $ruolo; ?></div>
			<ul class="performancesList">
			<?
					foreach($partBlock as $partner){
			?>
				<li>
					<a onclick="unlinkPartner(this,<? echo($_GET['eventid']); ?>,<? echo($partner['rel_id']); ?>); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="<? echo($this->getLabel("Cancella")); ?>" /></a> 
					<a onclick="openShadowboxWin({'mode':'ajax'},{'url':'/_php/ajax/eventPartnerEdit.php?eventid=<? echo($_GET['eventid']); ?>&uid=<? echo($partner['uid']); ?>&rel_id=<? echo($partner['rel_id']); ?>','title':'<? echo($this->getLabel("Modifica")) ?>', width:400,height:150});return false;" href="#"><img src="/_images/edit_16.gif" width="16" alt="<? echo($this->getLabel("Modifica")); ?>" /></a> 
					<strong class="actions"><? echo($partner['nomearte']); ?></strong></span>
				</li>
			<?		
					}
			?>
			</ul>
			<br />
<?
				}
			}
			if(count($_POST['performers_notconfirmed'])){
			?>
			<div class="actions"><? echo($this->getLabel("In attesa di conferma")); ?></div>
			<ul class="performancesList">
			<?
					foreach($_POST['performers_notconfirmed'] as $partner){
			?>
				<li>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="actions"><? echo($partner->nomearte); ?></strong><br />
				</li>
			<?		
					}
			?>
			</ul>
<?
				}
?>
	    </div>
	</div>
	<!-- END Partners -->
	<div class="boxFormFull">
		<div class="formSpacer">
		    <label> <? echo($this->getLabel("Tipo")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Tipo infobox")) ?></span></a></label>
	    </div>
	    <div>
			<?
			$this->community->db->query("select id as id,nome as label from chiavi where id_p=581 order by nome");
			$res=$this->community->db->fetch();
			$cont_option=0;
			$optStr="";
			if($res){
				foreach($res as $row){
					if (!in_array($row->id, $exclude)) {
						$optStr.="	<label id=\"label_type_".$cont_option."\" for=\"type_".$cont_option."\">";
						$optStr.="<input type=\"radio\" name=\"type\" id=\"type_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['type'] ? " checked=\"checked\"" : "")."/>";
						$optStr.=$row->label."</label>\n	<br/>\n";
					}
					$cont_option++;
				}
				echo($optStr);
			}
			
			?>
	    </div>
		<br class="myClear" />
	</div>
	<div class="boxFormFull">
		<div class="formSpacer">
			<div class="left actions"><? echo($this->getLabel("Sito web")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Sito web infobox")) ?></span></a></div>
			<div class="right actions" id="puls_add_website">&nbsp;</div>
			<br class="myClear" />
		</div>	
		<div id="multiple_website">
		<? for($a=0; $a<count($_POST['websites']);$a++){ ?>
			<div class="cntCol">						
				<label class="counter" for="website">&nbsp;</label>
				<input type="text" name="websites[<? echo $a ?>][url]" id="website" class="textfields" value="<? echo($_POST['websites'][$a]['url'] ? $_POST['websites'][$a]['url'] : "http://"); ?>" maxlength="255" onfocus="clearError(this)" />
			</div>
		<? } ?>
	    </div>
		<div id="multiple_website_control" style="text-align:right"><a class="multiple_minus" href="">[-]</a> <a class="multiple_plus" href="">[+]</a></div>
	</div>
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
		<div class="formSpacer">
			<div class="actions left"><? echo($this->getLabel("Galleria")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nuova gallery infobox")) ?></span></a></div>
			<div class="right"><a href="#" onclick="showGalleryUpload(); return false;"><? echo($this->getLabel("Aggiungi una nuova gallery")) ?></a></div>
			<br class="myClear"/>
		</div>

		<div id="galleryUpload" style="display:none;">
			<div id="file-uploader-gallery">
				<noscript>
					<p><? echo($this->getLabel("Please enable JavaScript to Upload.")) ?></p>
				</noscript>
			</div>
			<div id="gallery-save" style="display:none;">
				<input type="button" onclick="saveGallery('#gallery-save')" value="<? echo($this->getLabel("Salva")." ".$this->getLabel("Galleria")) ?>" class="pulsBig" />
			</div>
		</div>
		<div class="formSpacer" style="margin-top:10px;">
			<? if (count($_POST['gallery'])) echo($this->community->writeList3col($_POST['gallery'],"gallery"));?>	
		</div>
		<br class="myClear"/>
	</div>
	<div class="boxFormCol1">			
		<label id="label_public" for="public"><input type="checkbox" name="public" id="public" class="radio" value="1" <? echo($_POST['public']==1 ? " checked=\"checked\"" : ""); ?>  onchange="clearError(this)"/> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label>
	</div>
	<div class="boxFormCol2">
		<label id="label_publicGall" for="publicGall"><input type="checkbox" name="publicGall" id="publicGall" class="radio" value="1" <? echo($_POST['publicGall']==1 ? " checked=\"checked\"" : ""); ?>  onchange="clearError(this)"/> <? echo($this->getLabel("Permetti a tutti gli utenti di aggiungere gallerie")) ?></label><br/>
		<br class="myClear"/>
		<label id="label_callOpen" for="callOpen"><input type="checkbox" name="callOpen" id="callOpen" class="radio" value="1" <? echo($_POST['callOpen']==1 ? " checked=\"checked\"" : ""); ?>  onchange="clearError(this)"/> <? echo($this->getLabel("Permetti a tutti gli utenti di proporre le proprie performance")) ?></label><br/>
		<br class="myClear"/>
	</div>
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_event_edit" id="submit_event_edit" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>

<script type="text/javascript"><!--
	var uploaderGallery;
	var uploader;
	var gallery = {'eventid': '<? echo $_GET['eventid']; ?>','type': '','folder': '','filename': '','zipname': '','requested_formats': [],'items': []};
	var websiteCloner;
	var locationsCloner;	
	$(document).ready(function () {
		//nuovo uploader
		uploader = new qq.FileUploader({
			element: document.getElementById('file-uploader'),   				
			action: '/_php/ajax/upload.php',
			multiple: 			false,
			maxConnections: 	3,
			allowedExtensions: 	["jpg", "png", "gif"],	// .zip, .jpg, .png, .gif, .mov, .mp4, .m4v, .mpg, .mpeg, .flv, .f4v, .wmv, .avi
			sizeLimit: 			1024000,   
			minSizeLimit: 		0, 							
			onSubmit: function(id, fileName){
				clearError($('#file-uploader'));
			},
			onComplete: function(id, fileName, responseJSON){
				var json = eval(responseJSON);
				$('#playerPreview').show();
				$('#playerPreview').html('<img src="/_php/ajax/image_display.php?n='+json.items[0].filename+'&w=400&h=300" /><input type="hidden" id="avatar_path" name="avatar_path" value="'+json.folder+'" /><input type="hidden" id="avatar_name" name="avatar_name" value="'+json.items[0].filename+'" />');
			}
		});	
		//nuovo uploader
		uploaderGallery = new qq.FileUploader({
			element: document.getElementById('file-uploader-gallery'),   				
			action: '/_php/ajax/upload.php',
			multiple: 			true,
			maxConnections: 	3,
			allowedExtensions: 	["zip","jpg","png","gif","mov","mp4","m4v","mpg","mpeg","f4v","wmv","avi"],	// .zip, .jpg, .png, .gif, .mov, .mp4, .m4v, .mpg, .mpeg, .flv, .f4v, .wmv, .avi
			sizeLimit: 			500240000,   
			minSizeLimit: 		0, 							
			onSubmit: function(id, fileName){
				$('#gallery-save').find('input').attr('disabled','disabled');
			},
			onComplete: function(id, fileName, responseJSON){
	   			var json = eval(responseJSON);
	   			gallery.type = json.type;
				gallery.filename = json.filename;
	   			gallery.zipname = json.zipname;
				gallery.folder = json.folder;
	   			gallery.items = gallery.items.concat(json.items);
	   			updateResults('#gallery-save');
	   		}
	   	});	
		websiteCloner = $("#multiple_website").cloneElements('multiple_website_control',20,presetField);
		locationsCloner = $("#multiple_location").cloneElements('multiple_location_control',20, createCalendar);	
		$("#multiple_location").children().each(function(){
			createCalendar($(this));
		});
	});	
	function presetField(item) {
		item.find( "input" ).val('http://');			
	}
	function createCalendar(item) {
		item.find( ".data_evento" ).first().datepicker({
			showOn: "button",
			buttonImage: "/_images/calendar.gif",
			buttonImageOnly: true,
			dateFormat: "yy-mm-dd"
		});			
	}
//-->
</script>
