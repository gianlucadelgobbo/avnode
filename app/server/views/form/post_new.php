<div class="cntTitPalette"><h3><? echo($this->getLabel("Nuovo post")) ?></h3></div>
<div class="cntCol">
	<form method="post" name="post_new" id="post_new" onsubmit="return validate_post_new(this);" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo($_SERVER['QUERY_STRING']); ?>" enctype="multipart/form-data">
		<div class="col1Fullcol1-400">
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
			}
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
<!-- Proprietario -->
			<label id="label_crew" for="crew"><? echo($this->getLabel("Proprietario del post")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Proprietario del post infobox")) ?></span></a></label><br/>
			<label for="crew" id="label_crew"><input type="radio" onchange="clearErrors(this)" value="<? echo($_SESSION['user_id']); ?>" class="radio" id="performers" name="performers" checked="checked"/> <strong><? echo($this->getLabel("mio")) ?></strong></label><br />
			<?
			$this->community->db->query("select soggetti.id as id,soggetti.nomevisualizzato as label from soggetti,dipendenti where soggetti.id=dipendenti.id_a AND dipendenti.id_p=".$_SESSION['user_id']." and soggetti.chiavi like '%".$this->community->initObj['user_community_key']."%' ORDER BY nomevisualizzato");
			$res=$this->community->db->fetch();
			$cont_option=0;
			$optStr="";
			if($res){
				foreach($res as $row){
					$optStr.="					<label id=\"label_crew_".$cont_option."\" for=\"crew_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"performers\" id=\"crew_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['performers'] ? " checked=\"checked\"" : "")."/> ".$row->label."</label><br/>\n";
					$cont_option++;
				}
				echo($optStr);
			}
			?>
<!-- END Proprietario -->
		</div>
		<br class="myClear" />
		<div class="col1Fullcol1-400">
<!-- Titolo -->
			<div class="cntCol">
		    	<label id="label_titolo" for="titolo"><? echo($this->getLabel("Titolo del post")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Titolo del post infobox")) ?></span></a></label><br/>
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
		<div class="col1Fullcol2-400">
<!-- Tipo -->
			<div class="cntCol">
				<label id="label_required_tag_type" for="required_tag_type"><? echo($this->getLabel("Tipo di Tag")) ?>&nbsp;*&nbsp;<a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Tipo di Tag infobox")) ?></span></a></label><br/>
				<label id="label_required_tag_type_0" for="required_tag_type_0"><input type="radio" name="required_tag_type" id="required_tag_type_0" class="radio" value="hole" <? echo(("hole"==$_POST['required_tag_type'] ? " checked=\"checked\"" : "")); ?>  onchange="clearErrors(this)"/> <? echo($this->getLabel("HOLE (movie with alpha ch.)")) ?></label><br/>
				<label id="label_required_tag_type_1" for="required_tag_type_1"><input type="radio" name="required_tag_type" id="required_tag_type_1" class="radio" value="no-hole" <? echo(("no-hole"==$_POST['required_tag_type'] ? " checked=\"checked\"" : "")); ?>  onchange="clearErrors(this)"/> <? echo($this->getLabel("NO-HOLE")) ?></label><br/>
				<label id="label_required_tag_type_2" for="required_tag_type_2"><input type="radio" name="required_tag_type" id="required_tag_type_2" class="radio" value="koncept" <? echo(("koncept"==$_POST['required_tag_type'] ? " checked=\"checked\"" : "")); ?>  onchange="clearErrors(this)"/> <? echo($this->getLabel("KONCEPT")) ?></label><br/>
			</div>
<!-- END Tipo -->

<!-- Tag obbligatorie -->
			<div class="cntCol">
				<label id="label_required_tag" for="required_tag"><? echo($this->getLabel("Tag obbligatorie")) ?> &nbsp;*&nbsp;<a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Tag obbligatorie infobox")) ?></span></a></label><br/>
				<?
				$this->community->db->query("select tag as id,tag as label from tag where richiesta=1 and (tag!='hole' and tag!='no-hole' and tag!='koncept') ORDER BY tag");
				$res=$this->community->db->fetch();
				$cont_option=0;
				$optStr="";
				if($res){
				foreach($res as $row){
					$optStr.="					<label id=\"label_required_tag_".$cont_option."\" for=\"required_tag_".$cont_option."\">";
					$optStr.="<input type=\"radio\" name=\"required_tag\" id=\"required_tag_".$cont_option."\" class=\"radio\" value=\"".$row->id."\" onchange=\"clearErrors(this)\"".($row->id==$_POST['required_tag'] ? " checked=\"checked\"" : "")."/> ".$row->label."</label><br/>\n";
					$cont_option++;
				}
				echo($optStr);
				}
				?>
			</div>
<!-- END Tag obbligatorie -->

<!-- Tag -->
			<div class="cntCol">
				<label id="label_tag" for="tag"><? echo($this->getLabel("Tag (separate da virgola)")) ?>&nbsp;&nbsp;<a class="info" href="#">	<img src="/_images/tip_small.png" border="0" alt="show tips"/>	<span class="infobox"><? echo($this->getLabel("Tag (separate da virgola) infobox")) ?></span></a></label><br/>
				<textarea name="tag" id="tag" class="textfieldsXS" style="width:230px" rows="4" cols="40" ><? echo(isset($_POST['tag']) ? $_POST['tag'] : ""); ?></textarea><br/>
				<script type="text/javascript"><!--
					$(function() {
						function split( val ) {
							return val.split( /,\s*/ );
						}
				
						$("#tag")
							// don't navigate away from the field on tab when selecting an item
							.bind( "keydown", function( event ) {
								if (event.keyCode === $.ui.keyCode.TAB && $(this).data("autocomplete").menu.active) {
									event.preventDefault();
								}
							})
							.autocomplete({
								minLength: 0,
								source: '/_php/ajax/tagList.php',
								focus: function() {
									// prevent value inserted on focus
									return false;
								},
								select: function( event, ui ) {
									var terms = split( this.value );
									// remove the current input
									terms.pop();
									// add the selected item
									terms.push( ui.item.value );
									// add placeholder to get the comma-and-space at the end
									terms.push( "" );
									this.value = terms.join( ", " );
									return false;
								}
							});
					});
				//-->
				</script>
			</div>
		</div>
<!-- END Tag obbligatorie -->

<!-- Privacy -->
		<br class="myClear" />
		<div class="boxFormFull">
			<div class="actions"><? echo($this->getLabel("Privacy")) ?>&nbsp;*&nbsp;<a class="info" href="#"><img src="/_images/tip_small.png" border="0" alt="show tips"/><span class="infobox"><? echo($this->getLabel("Privacy infobox")) ?></span></a></div><br/>
			<label id="label_privacy" for="privacy"><input type="checkbox" name="privacy" id="privacy" class="radio" value="1" <? echo(($_POST["privacy"]=="1" ? " checked=\"checked\"" : "")); ?>  onchange="clearErrors(this)"/> <? echo($this->getLabel("Ho letto le condizioni contenute in questa pagina")) ?> <a href="/disclaimers/?chId=<?php echo($this->community->initObj['sections']['privacy'][$this->community->initObj['area']]); ?>" target="_blank"><? echo($this->getLabel("Privacy")) ?></a></label><br/>
		</div>

		<div class="boxFormLpmSubmit right">
			<input type="submit" name="submit_post_new" id="submit_post_new" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
		</div>
		<br class="myClear"/>		
	</form>
</div>
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
			sizeLimit: 			50024000,   
			minSizeLimit: 		0, 							
			onSubmit: function(id, fileName){
				clearError($('#file-uploader'));
			},
			onComplete: function(id, fileName, responseJSON){
				var json = eval(responseJSON);
				showFilePreview('#playerPreview',json.items[0].filename)
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
