<?
	if(!isset($_SESSION['user_auth']) && !($_SESSION['user_auth']) ){
		header("Location: ".$this->community->initObj["protocol"]."://".$_SERVER['SERVER_NAME']);
	}else{
	//forza la visualizzazione del primo box di testo
	if (!isset($_POST['websites'])) $_POST['websites'] = array(
		array(
			"url"=>"http://",
			"txt"=>"http://",
			"target"=>"_blank"
		)
	);
?>
<div class="cntTitPalette">
	<h3><? echo($this->getLabel("Nuovo gruppo")); ?></h3>
</div>
<form method="post" name="crew_new" id="crew_new" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" onsubmit="return validate_crew_edit(this);" enctype="multipart/form-data">
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
		<input type="text" name="login" id="login" class="textfields" value="<? echo(isset($_POST['login']) ? $_POST['login'] : ""); ?>" maxlength="20" onfocus="clearError(this)" onkeydown="clearError(this)"  onkeyup="checkloginOnKeyUp(this,'1','20','login_path',0)" onblur="checkloginOnKeyUp(this,'1','20','login_path',0)"  />
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
				<label id="label_bio_<? echo(strtoupper($ll["sigla"])); ?>" for="bio_<? echo(strtoupper($ll["sigla"])); ?>"><? echo($ll["lingua"]); ?></label><br/>
				<textarea class="textAreaLang" name="bio_<? echo(strtoupper($ll["sigla"])); ?>" id="bio_<? echo(strtoupper($ll["sigla"])); ?>" rows="5" cols="40"><? echo(isset($_POST["bio_".strtoupper($ll["sigla"])]) ? $_POST["bio_".strtoupper($ll["sigla"])] : ""); ?></textarea>
			</div>
			<? } ?>
		</div>
		<br class="myClear"/>
	</div>	
<!-- END Testo -->

<!-- Submit -->
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_crew_new" id="submit_crew_new" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
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
<? } ?>
