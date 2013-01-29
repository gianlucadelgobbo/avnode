
<div class="cntTitPalette">
	<h3><? echo($this->getLabel("Nuova discussione")); ?></h3>
</div>
<form method="post" name="post_new" id="post_new" action="#" enctype="multipart/form-data">
	<div class="boxForm"><?php echo($this->getLabel("I campi contrassegnati da asterisco sono obbligatori.")); ?></div>
	<div class="boxForm">
		<label class="labelBig" for="area"><?php echo($this->getLabel("Categoria")); ?>*</label><br />
		<select name="area" id="area" class="listMenu">
<? 
	if(!isset($_GET['forumArea'])){
		echo("<option value=\"0\" selected=\"selected\">".$this->getLabel("Seleziona")."</option>");
	}
	$aree=$this->community->getForumAree();
	foreach($aree as $area){
		if($area['stato']==1 || ( isset($_SESSION['user_type']) ? $_SESSION['user_type'] : 0)==2 ){
			echo("<option value=\"".$area['id']."\"".( ($_GET['forumArea']==$area['id'] || $_POST['area']==$area['id']) ? " selected=\"selected\"" : "").">".$area['tit']."</option>");
		}
	}
?>
		</select>
	</div>
	<div class="boxForm">
		<label class="labelBig" for="titolo"><?php echo($this->getLabel("Titolo")); ?>*</label><br />
		<input type="text" name="titolo" id="titolo" class="textfields" value="<? echo( (isset($_POST['titolo']) ? $_POST['titolo'] : "")); ?>" />
	</div>				
	<div class="boxForm">
		<label class="labelBig" for="testo"><?php echo($this->getLabel("Testo")); ?>*</label><br />
		<textarea class="textArea" cols="45" rows="8" name="testo" id="testo" onkeyup="checkLimit(this)"><? echo( (isset($_POST['testo']) ? $_POST['testo'] : "")); ?></textarea>
	</div>
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_forum_new" id="submit_forum_new" value="<? echo($this->getLabel("Salva")) ?>" class="pulsBig" />
	</div>
	<br class="myClear" />
	<input type="hidden" name="consenso_1" id="consenso_1" value="SI" /><input type="hidden" name="consenso_2" id="consenso_2" value="SI" />
	<input type="hidden" name="nazione" value="<? echo($_SESSION['user_nation']) ?>" />
	<input type="hidden" name="consenso_3" id="consenso_3" value="SI" />
</form>

<script type="text/javascript" language="javascript"><!--
	var FCKMaxLength = 6999 ;
	var FCKname = 'testo';
	var sBasePath = "/_script/fck/";
	var oFCKeditor;
	document.observe("dom:loaded", function() {
		oFCKeditor= new FCKeditor( 'testo' ) ;
		oFCKeditor.BasePath="/_script/fck/";
		oFCKeditor.Height=350;
		oFCKeditor.Width=640;
		oFCKeditor.Config["MaxLength"] = 6999;
		oFCKeditor.ReplaceTextarea();
	});
	
	
//-->
</script>
