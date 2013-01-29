<div class="cnt">
	<div id="col1">
		<div class="cntPadd gFFFFFF">
			<div class="bottomLineBig"><h1><? echo($this->col1tit); ?></h1></div>
			<? if($this->lpmMenu) echo($this->lpmMenu); ?>
			<div class="cntCol">
	<? 	
	    if(isset($this->formAct) && isset($this->formBtn) && isset($this->formSave) && isset($this->formLoadData) && isset($this->formEdit)){
	        if($esito && (isset($_POST[$this->formBtn]) || isset($_POST[$this->formBtnDel]))){
	        	include_once($this->formSave);
	        }else{
	            if(count($msg_err)>0){
	                echo("          	<div id=\"boxError\"><div class=\"labelBig\"><p>".$this->getLabel("La richiesta di inserimento dei dati non e' stata accolta.")."</p><ul>\n");
	                foreach($msg_err as $err_m){
	                    echo("          	<li>".$err_m."</li>\n");			
	                }	
	                echo("          	</ul><p>".$this->getLabel("controlla i dati e riprova")."</p></div></div>\n");	
	            }
	            if(!isset($_POST[$this->formBtn])){
	                include_once($this->formLoadData);
	            }
	            include_once($this->formEdit);	
	        }	
	    }	
	    if(isset($this->col1cnt)) echo($this->col1cnt);
	?>	
			</div>
		</div>
	</div>
	<div id="col2">
<?
//$this->col2cnt = str_replace("###ID###", "/participate/lpm/?id=".$_GET['perfid'], $this->col2cnt);
//$this->col2cnt = str_replace("###PERFNAME###", strtoupper($_POST['title']), $this->col2cnt);
echo($this->col2cnt);
?>
	</div>
	<br class="myClear" />
</div>
