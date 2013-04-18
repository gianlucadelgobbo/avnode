<?
	$exclude = array();	
?>
<form method="post" name="tvshow_new" id="tvshow_new" onsubmit="return validate_tvshow_new(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" enctype="multipart/form-data">
	<div class="cntTitPalette">
		<div class="col1Fullcol1-400">
			<h3><? echo($this->getLabel("Nuovo")." ".$this->getLabel("TV Show")); ?></h3>
		</div>
		<div class="col1Fullcol2-400">&nbsp;</div>
		<br class="myClear" />
	</div>
	<div class="boxFormFull">			
    	<label id="label_titolo" for="titolo"><? echo($this->getLabel("Nome del TV Show")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nome del TV Show infobox")) ?></span></a></label><br/>
		<input type="text" name="titolo" id="titolo" class="textfields" value="<? echo(isset($_POST['titolo']) ? $_POST['titolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
	<div class="col1Fullcol1-400 mb10">
<!-- Avatar -->
		<label id="label_avatar"><? echo($this->getLabel("File video")) ?></label>	
		<? if(isset($_POST['avatar_name'])){ ?>
		<div id="playerPreview" style="">
			<input type="hidden" id="avatar_name" name="avatar_name" value="<? echo $_POST['avatar_name'] ?>" />
		</div>
		<script type="text/javascript">
		<!--
		$(document).ready(function () {
			showFilePreview('#playerPreview','<? echo $_POST['avatar_name'] ?>');
		});
		//-->
		</script>
		<? } else if($_POST['img_arr'] && $_POST['img_arr'] != "/_images/default/defaultBig.gif") { ?>
		<div id="playerPreview">
			<input type="hidden" id="img_arr" name="img_arr" value="<? echo $_POST['img_arr'] ?>" />
			<img id="avatar_old_img" src="<? echo $_POST['img_arr'] ?>" />
		</div>
		<? } else { ?>
		<div id="playerPreview" style="display:none;">&nbsp;</div>
		<? } ?>
		<div id="avatar">
			<div id="file-uploader">       
				<noscript>          
					<p><? echo($this->getLabel("Please enable JavaScript to Upload.")) ?></p>
				</noscript>
			</div>
		</div>
<!-- END Avatar -->
    </div>
	<div class="col1Fullcol2-400">
	    <label id="label_type"><? echo($this->getLabel("Tipo")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/></a></label><br/>
		<?
		$this->community->db->query("select id as id,nome as label from chiavi where id_p=587 order by nome");
		$res=$this->community->db->fetch();
		$cont_option=0;
		$optStr="";
		if($res){
			foreach($res as $row){
				if (!in_array($row->id, $exclude)) {
					$optStr.="<label id=\"label_type_".$cont_option."\" for=\"type_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"type\" id=\"type_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($_POST['type']==$row->id ? " checked=\"checked\"" : "")."/>";
					$optStr.=$row->label."</label><br/>";
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
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_tvshow_new" id="submit_tvshow_new" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>
<script type="text/javascript"><!--
	var uploader;
	$(document).ready(function () {
		//nuovo uploader
		uploader = new qq.FileUploader({
			element: document.getElementById('file-uploader'),   				
			action: '/_php/ajax/upload.php',
			multiple: 			false,
			maxConnections: 	3,
	        allowedExtensions: 	["mov","mp4","m4v","mpg","mpeg","flv","f4v","wmv","avi","swf"],	// .zip, .jpg, .png, .gif, .mov, .mp4, .m4v, .mpg, .mpeg, .flv, .f4v, .wmv, .avi
			sizeLimit: 			50000024000,   
			minSizeLimit: 		0, 							
			onSubmit: function(id, fileName){
				clearError($('#file-uploader'));
			},
			onComplete: function(id, fileName, responseJSON){
				var json = eval(responseJSON);
				//showFilePreview('#playerPreview',json.items[0].filename)
				$('#avatar').hide();
			}
		});
	});
	function showFilePreview(div,file) {
		$(div).show();
		ext = file.substr(file.lastIndexOf('.') + 1);
		if (ext=="swf" || ext=="flv") {
			str = flashStringWriter("img_preview",400,338,"/_fp/flxerPlayer.swf?cnt=/_php/ajax/showVideo/?param="+file+"&thumbSaver=true&fpUpPath=/_fp/fpUp.php&fpUpJsOk=writeSnapshotOk&fpUpJsError=writeEncodingMessage&toolbarBottom=true&tit=edit%20footage%20preview&embedPath=&fpMenu=false&fullscreenBtn=false&autostop=false","window");
		} else {
			str = "<div>";
			str+= "<h4><? echo($this->getLabel("Il tuo file ha bisogno di essere encodato dal nostro server")) ?></h4>";
			str+= "<p><? echo($this->getLabel("L'encoding si avvia dopo il salvataggio e necessita di poco tempo")) ?></p>";
			str+= "</div>";
		}
		$(div).html(str+'<input type="hidden" id="avatar_name" name="avatar_name" value="'+file+'" />');
	}

//-->
</script>
