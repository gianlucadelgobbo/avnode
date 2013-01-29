	<div class="cnt">
		<div id="col1mag">
<? echo($this->magazineCnt[0]); ?>
		</div>
		<div id="col2mag">
<?
	echo($this->magazineCnt[1]);
	if(isset($this->formInclude)){
		include_once($this->formInclude);
	}
?>
		</div>
	</div>
