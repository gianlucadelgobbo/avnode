<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica")); echo(isset($_POST['nomearte']) ? ": ".$_POST['nomearte'] : $this->getLabel("Utente")); ?></h3>
	</div>
	<div class="right new">			
		<a <? echo(($this->evento ? " target=\"_blank\" " : "")); ?> href="/<? echo($_POST['login']); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	</div>
	<br class="myClear" />
</div>
<form method="post" name="user_edit" id="user_edit" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" onsubmit="return validate_user_edit(this);" enctype="multipart/form-data">
<!-- Avatar -->
	<div id="avatar">
		<label id="label_avatar"><? echo($this->getLabel("Avatar")) ?></label>
		<? if(isset($_POST['avatar_name'])){ ?>
		<div id="playerPreview" style="">
			<input type="hidden" id="avatar_name" name="avatar_name" value="<? echo $_POST['avatar_name'] ?>" />
			<img src="/_php/ajax/image_display.php?n=<? echo $_POST['avatar_name'] ?>&w=400&h=300&rand=632" />
		</div>
		<? } else if($_POST['img_arr'] && $_POST['img_arr'] != "/_images/default/defaultBig.gif") { ?>
		<div id="playerPreview">
			<input type="hidden" id="img_arr" name="img_arr" value="<? echo $_POST['img_arr'] ?>" />
			<img id="avatar_old_img" src="<? echo $_POST['img_arr'] ?>" />
			<? if($_SESSION['user_id']==480) { ?>
			<a href="/controlpanel/imageseditor/?img=<? echo $_POST['img_arr'] ?>&amp;type=img">edit</a>
			<? } ?>
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
	<div class="boxFormCol1">
	    <label id="label_nomearte" for="nomearte"><? echo($this->getLabel("Nickname")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nickname infobox")) ?></span></a></label><br/>
		<input type="text" name="nomearte" id="nomearte" class="textfieldsS" value="<? echo(isset($_POST['nomearte']) ? $_POST['nomearte'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
<!-- END Avatar -->

<!-- Lingua -->
	<div class="boxFormCol2">
	    <label id="label_lingua" for="lingua"><? echo($this->getLabel("Lingua")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Lingua infobox")) ?></span></a></label><br/>
		<select name="lingua" id="lingua" class="textfieldsS" onfocus="clearError(this)">
		<? 
		$conta = 1;
		foreach($this->availableLng as $ll){ ?>
			<option value="<? echo($conta); ?>"<? echo(($_POST['lingua']==$conta ? " selected=\"selected\"" : "")); ?>><? echo($ll['lingua']); ?></option>
		<?
			$conta++;
		} ?>
		</select>
	</div>
	<br class="myClear" />
<!-- END Lingua -->

<!-- Locations -->
	<div class="formSpacer actions"><? echo($this->getLabel("Date e Luoghi")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Location infobox")) ?></span></a></div>
	<div id="multiple_location">
	<? for($a=0; $a<count($_POST['locations']);$a++){ ?>
		<div class="multiItem">						
			<div class="boxFormCol1">  	
				<label id="label_city" for="city"><span class="counter">1</span> <? echo($this->getLabel("Citta'")) ?></label>
				<input type="text" name="locations[<? echo $a ?>][city]" id="city" class="textfieldsS" value="<? echo(isset($_POST['locations'][$a]['city']) ? $_POST['locations'][$a]['city'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
			</div>
			<div class="boxFormCol2">
				&nbsp;<label id="label_country" for="country"><? echo($this->getLabel("Nazione")) ?></label>
				<select name="locations[<? echo $a ?>][country]" id="country" class="textfieldsS" onfocus="clearError(this)" >
					<? include($this->community->initObj["site_path"]."_php/form/statiUsers.php") ?>
				</select>
			</div>	
			<br class="myClear" />
		</div>
	<? } ?>
	</div>
	<div id="multiple_location_control" style="text-align:right"><a class="multiple_minus" href="">[-]</a> <a class="multiple_plus" href="">[+]</a></div>
<!-- END Locations -->

<!-- Websites -->
	<div class="formSpacer actions"><? echo($this->getLabel("Sito web")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Sito web infobox")) ?></span></a></div>
	<div id="multiple_website">
	<? for($a=0; $a<count($_POST['websites']);$a++){ ?>
		<div class="mb10">						
			<label class="counter" for="website">&nbsp;</label>
			<input type="text" name="websites[<? echo $a ?>][url]" id="website" class="textfields" value="<? echo($_POST['websites'][$a]['url'] ? $_POST['websites'][$a]['url'] : "http://"); ?>" maxlength="255" onfocus="clearError(this)" />
		</div>
	<? } ?>
    </div>
	<div id="multiple_website_control" style="text-align:right"><a class="multiple_minus" href="">[-]</a> <a class="multiple_plus" href="">[+]</a></div>
<!-- END Websites -->

<!-- Testo -->
	<div class="formSpacer actions"><? echo($this->getLabel("Biografia")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Biografia infobox")) ?></span></a></div>
	<div class="boxFormCol1_3">
		<strong><? echo($this->getLabel("Lingue")) ?></strong>
		<ul>
		<? foreach($this->availableLng as $ll){ ?>
			<li id="label_<? echo(strtoupper($ll["sigla"])); ?>"><?
			if($_POST["bio_".strtoupper($ll["sigla"])]!=""){
				echo($ll["lingua"]);		
			}else{
				echo("<a href=\"#cnt_bio_".strtoupper($ll["sigla"])."\" id=\"a_bio_".strtoupper($ll["sigla"])."\" onclick=\"showLangDiv('".strtoupper($ll["sigla"])."'); return false;\">".$ll["lingua"]."</a>");
			}
			?></li>
		<? } ?>
		</ul>
	</div>
	<div class="boxFormCol2_3">
		<? foreach($this->availableLng as $ll){ ?>
		<div id="cnt_bio_<? echo(strtoupper($ll["sigla"])); ?>" class="mb10" <? echo(($_POST["bio_".strtoupper($ll["sigla"])]!="" ? "" : " style=\"display:none\"")); ?>>
			<label id="label_bio_<? echo(strtoupper($ll["sigla"])); ?>" for="bio_<? echo(strtoupper($ll["sigla"])); ?>">
				<? echo($ll["lingua"]); ?>
			</label><br/>
			<textarea class="textAreaLang" name="bio_<? echo(strtoupper($ll["sigla"])); ?>" id="bio_<? echo(strtoupper($ll["sigla"])); ?>" class="textfields" rows="5" cols="40" ><? echo(isset($_POST["bio_".strtoupper($ll["sigla"])]) ? $_POST["bio_".strtoupper($ll["sigla"])] : ""); ?></textarea>
		</div>
		<? } ?>
	</div>
	<br class="myClear"/>
<!-- END Testo -->

<!-- Login -->
	<div class="boxFormFull">
	    <label id="label_login" for="login"><? echo($this->getLabel("Username")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Username infobox")) ?></span></a></label><br/>
		<input type="text" name="login" id="login" class="textfields" value="<? echo(isset($_POST['login']) ? $_POST['login'] : ""); ?>" maxlength="20" onfocus="clearError(this)" onkeydown="clearError(this)"  onkeyup="checkloginOnKeyUp(this,'1','20','login_path','<? echo $_GET['id']; ?>')" onblur="checkloginOnKeyUp(this,'1','20','login_path','<? echo $_GET['id']; ?>')"  />
	    <div><? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/<span id="login_path"><? echo(isset($_POST['login']) ? $_POST['login'] : ""); ?></span></div>
	</div>
<!-- END Login -->

<!-- Password -->
	<div class="formSpacer">
		<div class="left actions"><? echo($this->getLabel("Dati privati")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Dati personali infobox")) ?></span></a></div>
		<div class="right actions" id="puls_edit_password"><a href="#" onclick="$('#passwordChange').show(); return false;"><? echo($this->getLabel("Modifica password")) ?></a></div>
		<br class="myClear" />
	</div>	
	<div id="passwordChange" style="display:none">
		<div class="boxFormCol1">
			<label id="label_passwd" for="passwd"><? echo($this->getLabel("Password")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/>		<span class="infobox"><? echo($this->getLabel("Password infobox")) ?></span>	</a></label><br/>
			<input type="password" name="passwd" id="passwd" autocomplete="off" class="textfieldsS" value="<? echo(isset($_POST['passwd']) ? $_POST['passwd'] : ""); ?>" maxlength="20" onfocus="clearError(this)" />
		</div>
		<div class="boxFormCol2">
			<label id="label_passwd2" for="passwd2"><? echo($this->getLabel("Conferma password")) ?>&nbsp;*&nbsp;<a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Conferma password infobox")) ?></span></a></label><br/>
			<input type="password" name="passwd2" id="passwd2" class="textfieldsS" value="<? echo(isset($_POST['passwd2']) ? $_POST['passwd2'] : ""); ?>" maxlength="20" onfocus="clearError(this)" />
		</div>    
		<br class="myClear" />
	</div>
<!-- END Password -->

<!-- Nome -->
	<div class="boxFormCol1">
	    <label id="label_nome" for="nome"><? echo($this->getLabel("Nome")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nome infobox")) ?></span></a></label><br/>
		<input type="text" name="nome" id="nome" class="textfieldsS" value="<? echo(isset($_POST['nome']) ? $_POST['nome'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
<!-- END Nome -->

<!-- Cognome -->
	<div class="boxFormCol2">				
	    <label id="label_cognome" for="cognome"><? echo($this->getLabel("Cognome")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Cognome infobox")) ?></span></a></label><br/>
		<input type="text" name="cognome" id="cognome" class="textfieldsS" value="<? echo(isset($_POST['cognome']) ? $_POST['cognome'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
<!-- END Cognome -->

	<br class="myClear" />

<!-- Data di nascita -->
	<div class="boxFormCol1">
	    <label id="label_dataSogg" for="dataSogg"><? echo($this->getLabel("Data di nascita")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Data di nascita infobox")) ?></span></a></label><br/>
		<input onfocus="clearError(this)" name="dataSogg" id="dataSogg" class="textfieldsS" style="width:265px;margin-right: 10px;" maxlength="10" value="<? echo(isset($_POST['dataSogg']) ? $_POST['dataSogg'] : ""); ?>" />
	</div>
	<div class="boxFormCol2">
	    <label id="label_sesso" for="sesso"><? echo($this->getLabel("Sesso")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Sesso infobox")) ?></span></a></label><br/>
		<select name="sesso" id="sesso" class="textfieldsS" onfocus="clearError(this)" >
			<option value=""<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="" ? " selected=\"selected\"" : "") : " selected=\"selected\"")) ?>><?php echo($this->getLabel("Seleziona")); ?></option>
			<option value="F"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="F" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("F")) ?></option>
			<option value="M"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="M" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("M")) ?></option>
			<option value="O"<? echo((isset($_POST['sesso']) ? ($_POST['sesso']=="O" ? " selected=\"selected\"" : "") : "")) ?>><? echo($this->getLabel("Other")) ?></option>
		</select>
	</div>
<!-- END Data di nascita -->

	<br class="myClear" />

<!-- Emails -->
	<div class="formSpacer">
		<div class="left actions"><? echo($this->getLabel("Email")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Email infobox")) ?></span></a></div>
		<div class="right actions"><a onclick="addEmail(emailsCloner,<? echo $_GET['id']; ?>); return false;" href="#"><? echo($this->getLabel("Aggiungi")) ?></a></div>
		<br class="myClear" />
	</div>	
	<div id="multiple_emails">			
		<? for($a=0; $a<count($_POST['emails']);$a++){ ?>
			<div class="cntCol formSpacer">						
				<label class="counter" for="email">&nbsp;</label>
				<input class="email textfieldsS disabled" type="text" id="email" disabled="disabled" style="width:286px" value="<? echo($_POST['emails'][$a]['email']); ?>" />		<span class="actions"><img src="/_images/lock.gif" alt="Locked data" class="radio" /></span>
				<input type="hidden" name="emails[<? echo $a ?>][email]" value="<? echo($_POST['emails'][$a]['email']); ?>" />		<input type="hidden" name="emails[<? echo $a ?>][valid]" value="<? echo($_POST['emails'][$a]['valid']); ?>" />
		<? if($_POST['emails'][$a]['valid']){ ?>
				<label for="primary"><input id="primary" class="primary" onclick="setPrimary(this);" type="radio" name="emails[<? echo $a ?>][primary]" value="1" <? echo(( $_POST['emails'][$a]['primary']==1 || $_POST['emails'][$a]['primary']==$_POST['emails'][0] ? " checked=\"checked\"" : "")); ?> /> <? echo($this->getLabel("Primaria")) ?></label>
	        	<label for="public"><input id="public" type="checkbox" name="emails[<? echo $a ?>][public]" value="1" <? echo( $_POST['emails'][$a]['public']==1 ? " checked=\"checked\"" : ""); ?> class="radio" /> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label>
      
	        	<div class="cntCol">
					<a href="#" onclick="deleteEmail(this); return false;" class="right delete" <? if($_POST['emails'][$a]['primary']!=0) echo(" style=\"display:none;\"") ?>><? echo($this->getLabel("Cancella")) ?></a>
					<span id="email_subscriptions">
						<strong><? echo($this->getLabel("Newsletter")) ?></strong>:
						<?
						$liEl=array();
						foreach($this->initObj['mailingList'] as $k=>$l){
							$liEl[]="<label><input name=\"emails[".$a."][mailinglists][".$l."]\" id=\"email_subscription_".$l."\" value=\"1\"".($_POST['emails'][$a]['mailinglists'][$l]==1 ? " checked=\"checked\"" : "")." type=\"checkbox\" class=\"radio\" /><a class=\"infoNL\" href=\"#email_subscriptions\">".$l."<span class=\"infobox\">".$this->getLabel($l." infobox")."</span></a></label>";
							
						}
						echo(implode(",\n",$liEl));
						?> 
					</span>
	
				</div>
		<? } else { ?>
	        	<div class="cntCol msg">
	        		<? echo($this->getLabel("Attendere l'email di conferma. Non hai ancora ricevuto nulla? ")) ?><a href="#" onclick="sendVerificationCode('<? echo $a; ?>','<? echo $_GET['id']; ?>'); return false;"><? echo($this->getLabel("Manda nuova mail")) ?></a>
				</div>
		<? } ?>
			</div>
		<? } ?>
	</div>
	<div id="newmaildiv" style="display:none">						
		<div class="cntCol formSpacer">						
			<label class="counter" for="email">&nbsp;</label>
			<input class="email textfieldsS disabled" type="text" id="email" disabled="disabled" style="width:286px" value="##############" />
			<span class="actions"><img src="/_images/lock.gif" alt="Locked data" class="radio" /></span>
			<input type="hidden" name="emails[0][email]" value="##############" />
			<input type="hidden" name="emails[0][valid]" value="0" />
		    <div class="cntCol msg">
	    		<? echo($this->getLabel("Attendere l'email di conferma. Non hai ancora ricevuto nulla? ")) ?><a href="#" onclick="sendVerificationCode(this); return false;"><? echo($this->getLabel("Manda nuova mail")) ?></a>
			</div>
		</div>
	</div>
<!-- END Emails -->

<!-- Submit -->
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_user_edit" id="submit_user_edit" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>
<script type="text/javascript"><!--
	var theDate = new Date();
	var websiteCloner;
	var locationsCloner;	
	var emailsCloner;
	var uploader;
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
				$('#playerPreview').html('<img src="/_php/ajax/image_display.php?n='+json.items[0].filename+'&w=400&h=300" /><input type="hidden" id="avatar_name" name="avatar_name" value="'+json.items[0].filename+'" />');
			}
		});	
		$("#dataSogg").datepicker({
			showOn: "button",
			changeMonth: true,
			changeYear: true,
			yearRange: (theDate.getFullYear()-100)+':'+(theDate.getFullYear()-10),
			buttonImage: "/_images/calendar.gif",
			buttonImageOnly: true,
			dateFormat: "yy-mm-dd"
		});			
		websiteCloner = $("#multiple_website").cloneElements('multiple_website_control',5,presetField);
		locationsCloner = $("#multiple_location").cloneElements('multiple_location_control',5);	
		emailsCloner = $("#multiple_emails").cloneElements(null,5);	
	});	
	function presetField(item) {
		item.find( "input" ).val('http://');			
	}
//-->
</script>
