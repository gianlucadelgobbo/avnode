<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica")); echo(isset($_POST['nomearte']) ? ": ".$_POST['nomearte'] : $this->getLabel("Gruppo")); ?></h3>
	</div>
	<div class="right new">			
		<a <? echo(($this->evento ? " target=\"_blank\" " : "")); ?>href="/<? echo($this->community->getPermalinkStr($_GET['crewid'],"soggetti")); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	</div>
	<br class="myClear" />
</div>
<form method="post" name="crew_edit" id="crew_edit" onsubmit="return validate_crew_edit(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" enctype="multipart/form-data">
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
<!-- END Avatar -->

<!-- Nomearte -->
	<div class="boxFormFull">		
		<label id="label_nomearte" for="nomearte"><? echo($this->getLabel("Nome gruppo")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Nome gruppo infobox")) ?></span></a></label><br/>
		<input type="text" name="nomearte" id="nomearte" class="textfields" value="<? echo(isset($_POST['nomearte']) ? $_POST['nomearte'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
<!-- END Avatar -->

<!-- Login -->
	<div class="boxFormFull">		
		<label id="label_login" for="login"><? echo($this->getLabel("FLxER url")) ?>&nbsp;*&nbsp;<a class="info" href="#">	<img src="/_images/tip_small.png" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("FLxER url infobox")) ?></span></a></label><br/>
		<input type="text" name="login" id="login" class="textfields" value="<? echo(isset($_POST['login']) ? $_POST['login'] : ""); ?>" maxlength="20" onfocus="clearError(this)" onkeydown="clearError(this)"  onkeyup="checkloginOnKeyUp(this,'1','20','login_path','<? echo($_GET['crewid']); ?>')" onblur="checkloginOnKeyUp(this,'1','20','login_path','<? echo($_GET['crewid']); ?>')"  />
		<div><? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/<span id="login_path"><? echo(isset($_POST['login']) ? $_POST['login'] : ""); ?></span></div>
	</div>
<!-- END Login -->

<!-- Websites -->
	<div class="boxFormFull">
		<div class="formSpacer actions"><? echo($this->getLabel("Sito web")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Sito web infobox")) ?></span></a></div>
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
<!-- END Login -->

<!-- Testo -->
	<div class="boxFormFull">
		<div class="formSpacer actions"><? echo($this->getLabel("Biografia")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Biografia infobox")) ?></span></a></div>
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
		</div>
		<div class="boxFormCol2_3">
			<? foreach($this->availableLng as $ll){ ?>
			<div id="cnt_bio_<? echo(strtoupper($ll["sigla"])); ?>" class="mb10" <? echo(($_POST["bio_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng'] ? "" : " style=\"display:none\"")); ?>>
				<label id="label_bio_<? echo(strtoupper($ll["sigla"])); ?>" for="bio_<? echo(strtoupper($ll["sigla"])); ?>">
					<? echo($ll["lingua"]); ?>
				</label><br/>
				<textarea class="textAreaLang" name="bio_<? echo(strtoupper($ll["sigla"])); ?>" id="bio_<? echo(strtoupper($ll["sigla"])); ?>" rows="5" cols="40" ><? echo(isset($_POST["bio_".strtoupper($ll["sigla"])]) ? $_POST["bio_".strtoupper($ll["sigla"])] : ""); ?></textarea>
			</div>
			<? } ?>
		</div>
		<br class="myClear"/>
	</div>	
<!-- END Testo -->

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

<!-- Submit -->
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_crew_edit" id="submit_crew_edit" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
<!-- END Submit -->
	<br class="myClear"/>		
</form>
<script type="text/javascript"><!--
	var websiteCloner;
	var uploader;
	function presetField(item) {
		item.find( "input" ).val('http://');			
	}
	$(document).ready(function () {
		websiteCloner = $("#multiple_website").cloneElements('multiple_website_control',5,presetField);
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
	});	

//-->
</script>
