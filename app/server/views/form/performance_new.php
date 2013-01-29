<?
	$exclude = array(383,384,387,406,407,652,673);
?>
<div class="cntTitPalette">
	<h3><? echo($this->getLabel("Nuova performance")); ?></h3>
</div>
<form method="post" name="performance_new" id="performance_new" onsubmit="return check_performance_new(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo(str_replace("&","&amp;",$_SERVER['QUERY_STRING'])); ?>" enctype="multipart/form-data">
<!-- Avatar -->
	<div id="avatar">
		<label id="label_avatar"><? echo($this->getLabel("Immagine principale della performance")) ?></label>	
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

<!-- Titolo -->
	<div class="boxFormFull">
    	<label id="label_titolo" for="titolo"><? echo($this->getLabel("Nome della performance")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Nome della performance infobox")) ?></span></a></label><br/>
		<input type="text" name="titolo" id="titolo" class="textfields" value="<? echo(isset($_POST['titolo']) ? $_POST['titolo'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
	</div>
<!-- END Titolo -->

<!-- Duration -->
	<div class="boxFormFull">
    	<label id="label_duration" for="duration"><? echo($this->getLabel("Durata (minuti)")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Durata (minuti) infobox")) ?></span></a></label><br/>
		<input type="text" name="duration" id="duration" class="textfields" value="<? echo(isset($_POST['duration']) ? $_POST['duration'] : ""); ?>" maxlength="100" onfocus="clearError(this)" />
	</div>
<!-- END Duration -->

	<div class="boxFormFull">
<!-- Tipo -->
		<div class="boxFormCol1-3">
		    <label id="label_type"><? echo($this->getLabel("Tipo")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Tipo infobox")) ?></span></a></label><br/>
			<?
			$this->community->db->query("select id as id,nome as label from chiavi where id_p=380 ".($_GET['type']=="382" ? " and id=382 " : "")." order by nome");
			$res=$this->community->db->fetch();
			$cont_option=0;
			$optStr="";
			if($res){
				foreach($res as $row){
					if (!in_array($row->id, $exclude)) {
						$optStr.="<label id=\"label_type_".$cont_option."\" for=\"type_".$cont_option."\">";
						$optStr.="<input type=\"radio\" name=\"type\" id=\"type_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this);showTechnique(this.value);\"".($row->id == $_POST['type'] ? " checked=\"checked\"" : "")."/>";
						$optStr.=$row->label."</label>\n	<br/>\n";
					}
					$cont_option++;
				}
				echo($optStr);
			}
			?>
		</div>
<!-- END Tipo -->

<!-- Tecnica -->
		<div class="boxFormCol2-3">
			<div class="boxCnt" id="cnt381" <? echo($_POST['type']=="381" ? "" : "style=\"display:none;\"") ?>>
				<? echo($_POST['type']=="381" ? "<script type=\"text/javascript\">lastID = 381;</script>" : "") ?>
			    <label id="label_technique381">AV Performance: <? echo($this->getLabel("Tecnica")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Tecnica infobox")) ?></span></a></label><br/>
				<?
				$this->community->db->query("select id as id,nome as label from chiavi where id_p=700 order by nome");
				$res=$this->community->db->fetch();
				$cont_option=0;
				$optStr="";
				if($res){
					foreach($res as $row){
						if (!in_array($row->id, $exclude)) {
							$optStr.="	<label id=\"label_technique381_".$cont_option."\" for=\"technique381_".$cont_option."\">";
							$optStr.="<input type=\"radio\" name=\"technique381\" id=\"technique381_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['technique381'] ? " checked=\"checked\"" : "")."/>";
							$optStr.=$row->label."</label>\n	<br/>\n";
						}
						$cont_option++;
					}
					echo($optStr);
				}
				?>
			</div>
			<div class="boxCnt" id="cnt382" <? echo($_POST['type']=="382" || $_GET['type']=="382" ? "" : "style=\"display:none;\"") ?>>
				<? echo($_POST['type']=="382" ? "<script type=\"text/javascript\">lastID = 382;</script>" : "") ?>
			    <label id="label_technique382">VJ Set: <? echo($this->getLabel("Tecnica")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/>    <span class="infobox"><? echo($this->getLabel("Tecnica infobox")) ?></span></a></label><br/>
				<?
				$this->community->db->query("select id as id,nome as label from chiavi where id_p=703 order by nome");
				$res=$this->community->db->fetch();
				$cont_option=0;
				$optStr="";
				if($res){
					foreach($res as $row){
						if (!in_array($row->id, $exclude)) {
							$optStr.="	<label id=\"label_technique382_".$cont_option."\" for=\"technique382_".$cont_option."\">";
							$optStr.="<input type=\"radio\" name=\"technique382\" id=\"technique382_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['technique382'] ? " checked=\"checked\"" : "")."/>";
							$optStr.=$row->label."</label>\n	<br/>\n";
						}
						$cont_option++;
					}
					echo($optStr);
				}
				?>
			</div>
		</div>
<!-- END Tecnica -->

<!-- Genere -->
		<div class="boxFormCol3-3">
			<div id="genre" <? echo($_POST['type']=="381" || $_POST['type']=="382" || $_GET['type']=="382" ? "" : "style=\"display:none;\"") ?>>
				<div>
				    <label id="label_genre"><? echo($this->getLabel("Genere")) ?> &nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Genere infobox")) ?></span></a></label><br/>
					<?
					$this->community->db->query("select id as id,nome as label from chiavi where id_p=697 order by nome");
					$res=$this->community->db->fetch();
					$cont_option=0;
					$optStr="";
					if($res){
						foreach($res as $row){
							if (!in_array($row->id, $exclude)) {
								$optStr.="	<label id=\"label_genre_".$cont_option."\" for=\"genre_".$cont_option."\">";
								$optStr.="<input type=\"radio\" name=\"genre\" id=\"genre_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['genre'] ? " checked=\"checked\"" : "")."/>";
								$optStr.=$row->label."</label>\n	<br/>\n";
							}
							$cont_option++;
						}
						echo($optStr);
					}
					?>
				</div>
				<div class="cntCol">
					<label id="label_tag" for="tag"><? echo($this->getLabel("Altro genere")) ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Altro genere infobox")) ?></span></a></label><br/>
					<input type="text" name="tag" id="tag" class="textfieldsXS actions" style="width:200px" value="<? echo(isset($_POST['tag']) ? $_POST['tag'] : ""); ?>" onfocus="clearErrors(this);$('input[name=\'genre\']:checked').removeAttr('checked');" /><br/>
					<script type="text/javascript"><!--
						$(function() {
							$('#tag').autocomplete({
								source: '/_php/ajax/customgenreList.php',
								minLength: 2,
								select: function( event, ui ) {
									$("input[name='genre']:checked").removeAttr('checked');
								}
							});
						});
					//-->
					</script>
				</div>
			</div>
		</div>
<!-- END Genere -->
		<br class="myClear"/>
	</div>
<!-- Utenti -->
<?
	if ($this->evento) {
		echo("<input type=\"hidden\" name=\"performers\" value=\"".$_SESSION['lpm']['author']."\" />" );
	} else { ?>
	<div class="boxFormFull">			
		<div class="formSpacer">
		    <label id="label_performers"><? echo($this->getLabel("Utenti")) ?> &nbsp;*&nbsp;<a class="info" href="#">    <img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Artisti infobox")) ?></span></a></label>
		</div>	
		<div class="mb10">
		<label for="performers" id="label_performers"><input type="radio" onchange="clearErrors(this)" value="<? echo($_SESSION['user_id']); ?>" class="radio" id="performers" name="performers" <? echo($_POST['performers']==$_SESSION['user_id'] ? " checked=\"checked\"" : ""); ?>/><strong>mine</strong></label><br />
		<?
		$this->community->db->query("select soggetti.id as id,soggetti.nomevisualizzato as label from soggetti,dipendenti where soggetti.id=dipendenti.id_a AND dipendenti.id_p=".$_SESSION['user_id']." and soggetti.chiavi like '%".$this->community->initObj['user_community_key']."%' ORDER BY nomevisualizzato");
		$res=$this->community->db->fetch();
		$cont_option=0;
		$optStr="";
		if($res){
			foreach($res as $row){
					$optStr.="<label id=\"label_performers_".$cont_option."\" for=\"performers_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"performers\" id=\"performers_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($_POST['performers']==$row->id ? " checked=\"checked\"" : "")."/>";
					//$optStr.="<input type=\"radio\" name=\"performers[]\" id=\"performers_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\" checked=\"checked\" />";
					$optStr.=$row->label."</label><br/>";
					$cont_option++;
			}
			echo($optStr);
		}
		?>
		</div>	
	</div>
<!-- END Utenti -->
<? } ?>

<!-- Testo -->
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
			<div id="cnt_bio_<? echo(strtoupper($ll["sigla"])); ?>" class="mb10" <? echo(($_POST["bio_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng'] ? "" : " style=\"display:none\"")); ?>>
				<label id="label_bio_<? echo(strtoupper($ll["sigla"])); ?>" for="bio_<? echo(strtoupper($ll["sigla"])); ?>">
					<? echo($ll["lingua"]); ?>
				</label><br/>
				<textarea class="textAreaLang" name="bio_<? echo(strtoupper($ll["sigla"])); ?>" id="bio_<? echo(strtoupper($ll["sigla"])); ?>" rows="5" cols="60" ><? echo(isset($_POST["bio_".strtoupper($ll["sigla"])]) ? $_POST["bio_".strtoupper($ll["sigla"])] : ""); ?></textarea>
			</div>
			<? } ?>
			<br class="myClear"/>
		</div>
	</div>
<!-- END Testo -->

<!-- Richieste tecniche -->
	<div class="boxFormFull">			
		<div class="formSpacer">
			<div class="actions"><? echo($this->getLabel("Richieste tecniche")." (".$this->community->getLabel("cosa ti serve dal committente").")") ?>&nbsp;&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Richieste tecniche infobox")) ?></span></a></div>
		</div>	
		<div class="boxFormCol1_3">
			<strong><? echo($this->getLabel("Lingue")) ?></strong>
			<ul>
			<? foreach($this->availableLng as $ll){ ?>
				<li id="label_tech_req_li_<? echo(strtoupper($ll["sigla"])); ?>"><?
				if($_POST["tech_req_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng']){
					echo($ll["lingua"]);		
				}else{
					echo("<a href=\"#cnt_tech_req_".strtoupper($ll["sigla"])."\" id=\"a_tech_req_".strtoupper($ll["sigla"])."\" onclick=\"showLangDiv('".strtoupper($ll["sigla"])."'); return false;\">".$ll["lingua"]."</a>");
				}
				?></li>
			<? } ?>
			</ul>
			<br class="myClear"/>
		</div>
		<div class="boxFormCol2_3">
			<? foreach($this->availableLng as $ll){ ?>
			<div id="cnt_tech_req_<? echo(strtoupper($ll["sigla"])); ?>" <? echo(($_POST["tech_req_".strtoupper($ll["sigla"])]!="" || $ll["sigla"]==$this->initObj['defaultLng'] ? "" : " style=\"display:none\"")); ?>>
				<label id="label_tech_req_<? echo(strtoupper($ll["sigla"])); ?>" for="tech_req_<? echo(strtoupper($ll["sigla"])); ?>">
					<? echo($ll["lingua"]); ?>
				</label><br/>
				<textarea class="textAreaLang" name="tech_req_<? echo(strtoupper($ll["sigla"])); ?>" class="mb10" id="tech_req_<? echo(strtoupper($ll["sigla"])); ?>" rows="5" cols="60" ><? echo(isset($_POST["tech_req_".strtoupper($ll["sigla"])]) ? $_POST["tech_req_".strtoupper($ll["sigla"])] : ""); ?></textarea>
				<span id="msgErrorCnt_tech_req_<? echo(strtoupper($ll["sigla"])); ?>" class="errorMsg">&nbsp;</span>
			</div>
			<? } ?>
			<br class="myClear"/>
		</div>
	</div>
<!-- END Richieste tecniche -->

<!-- Public -->
	<div class="boxFormFull">			
		<label id="label_public" for="public"><input type="checkbox" name="public" id="public" class="radio" value="1" <? echo($_POST['public'] == "1" || !isset($_POST['public']) ? " checked=\"checked\"" : ""); ?>  /> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label><br/>
	</div>
<!-- END Public -->

<!-- Submit -->
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_performance_new" id="submit_performance_new" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
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
			allowedExtensions: 	["jpg", "png", "gif"],	// .zip, .jpg, .png, .gif, .mov, .mp4, .m4v, .mpg, .mpeg, .flv, .f4v, .wmv, .avi
			sizeLimit: 		524288000,   
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
	});	
//-->
</script>
