<? echo('<script type="text/javascript">var performance_type="'.$_SESSION["lpm"]["performance_type"].'";</script>'); ?>
<div id="label_topic">&nbsp;</div>
<div id="errordiv" class="errorMsg"><? echo($_SESSION["str_err"]);$_SESSION["str_err"]=NULL; ?></div>
<form method="post" name="topic" id="topic" action="#" onsubmit="return check_topic();">
    <?
    $cont_option=0;
    $optStr="";
    $elemVal = (is_array($_POST['type']) ? array_flip($_POST['type']) : array());
	foreach($this->rooms as $k=>$room) {
		if (in_array($_SESSION["lpm_sub_type"], $room['availablefor'])) {
//        echo("k".$row->id."=>,");
			$res=$this->community->getMagazineSimpleObj($room['mag']);
			//print_r($res);
        $optStr.="<label id=\"label_topic_".$cont_option."\" for=\"topic_".$cont_option."\">";
        $optStr.="<input type=\"radio\" name=\"topic\" id=\"topic_".$cont_option."\" class=\"radio\" value=\"".$k."\" ".(array_key_exists($row->id, $elemVal) ? " checked=\"checked\"" : "")." onchange=\"checkTheme(this);\" />";
        $optStr.="&nbsp;&nbsp;<strong>".$res['page']['title']."</strong></label><br/>";
        $optStr.= "<div id=\"m".$k."\" style=\"height:37px;overflow:hidden;\">".$res['page']['content']."</div>\n";
        $optStr.= "<div style=\"text-align:right;\"><a href=\"#label_topic_".$cont_option."\" onclick=\"(document.getElementById('m".$k."').style.height=='37px' ? document.getElementById('m".$k."').style.height='auto' : document.getElementById('m".$k."').style.height='37px');\"> ".$this->community->getLabel("enlarge/reduce")."</a></div>\n";
        $cont_option++;
		}
	}
    echo($optStr);
?>
	<br class="myClear" />
	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_topic" id="submit_topic" value="<?php echo($this->getLabel("Avanti"))?>" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>