<?
	//print_r($_POST);

?>
<div id="errordiv"><? echo($_SESSION["str_err"]);$_SESSION["str_err"]=NULL; ?></div>
<form method="post" name="accommodation" id="accommodation" onsubmit="return check_accommodation();" action="#">
<div class="boxFormFull">
	<div class="formSpacer">
		<label id="label_utenti"><strong id="utenti"><? echo $this->getLabel("Utenti"); ?></strong></label>
	</div>	
	<table class="membersList">	
		<? 	if(isset($_POST['members'])){
				//print_r($_POST);
				$a=0;
				$total = 0;
				foreach($_POST['members']as $p){
					$loc = "";
					if ($p["locations"]) foreach($p["locations"] as $k=>$v) $loc.=$k.", ".implode(", ",$v)." | ";
					$price = $this->confSub["prices"][$_SESSION["lpm_sub_type"]];
					$p['days'] = ($p['date_i'] ? round((strtotime($p['date_f'])-strtotime($p['date_i'])) / 86400)+1 : 0);
					if ($p['editable']) {
		?>		
			<tr>
				<td colspan="2">
					<? echo "<script> var price = ".json_encode($price).";</script>"; ?>
					<label class="bigLabel"><? echo($p["nome"]); ?></label>
				</td>
				<td>
					<div class="<? echo ($p['presente'] ? "greenbox" : "redbox")?>">
						<input name="members[<? echo $p["id"] ?>][presente]" onchange="setPresence('<? echo $p["id"]; ?>'); return false;" id="presente<? echo $p["id"]; ?>" type="checkbox" value="<? echo $p["id"] ?>" <? echo($p['presente'] ? "checked=\"checked\"" : "")?>  /> <label for="presente<? echo $p["id"]; ?>"><span id="presenteSI<? echo $p["id"]; ?>"<? echo ($p['presente'] ? "" : " style=\"display:none;\"")?>><? echo $this->getLabel("Presente") ?></span><span id="presenteNO<? echo $p["id"]; ?>"<? echo ($p['presente'] ? " style=\"display:none;\"" : "")?>><? echo $this->getLabel("Non presente") ?></span></label>
					</div>
				</td>
			</tr>
			<tr id="rowTitPresenza<? echo $p["id"] ?>"<? echo($p['presente'] ? "" : " style=\"display:none;\"")?>>
				<td colspan="3">
					<b><? echo $this->getLabel("Presente"); ?></b>
				</td>
			</tr>
			<tr id="rowPresenza<? echo $p["id"] ?>"<? echo($p['presente'] ? "" : " style=\"display:none;\"")?>>
				<td colspan="3">
					<div class="left right10">
						<label id="label_accArrDate<? echo $p["id"]; ?>" class="labelSmall" for="accArrDate<? echo $p["id"]; ?>"><?php echo($this->getLabel("Arrivo"))?></label><br />
						<select onchange="setDays(<? echo $p["id"] ?>);clearError(this);return false;" name="members[<? echo $p["id"] ?>][date_i]" id="accArrDate<? echo $p["id"]; ?>" class="textfieldsXSfree block">	
							<option value=""><?php echo($this->getLabel("Arrivo"))?></option>
							<?php
								for ($a=-1;$a<$days+2;$a++) {
									$myday = mktime(0, 0, 0, date("m",strtotime($this->confSub["firstday"]))  , date("d",strtotime($this->confSub["firstday"]))+$a, date("Y",strtotime($this->confSub["firstday"])));
									$day = date("d",$myday);
									$fullday = date("Y-m-d",$myday);
									$meseExtended = date("F",$myday);
									echo("<option value=\"".$fullday."\" ".(isset($p['date_i']) ? ($p['date_i']==$fullday ? " selected=\"selected\"" : "") : "").">".$day." ".$meseExtended."</option>");
								}
							?>
						</select>
					</div>
					<div class="left right10">
						<label id="label_accDepDate<? echo $p["id"]; ?>" class="labelSmall" for="accDepDate<? echo $p["id"]; ?>"><?php echo($this->getLabel("Partenza"))?></label><br />
						<select onchange="setDays(<? echo $p["id"] ?>);clearError(this); return false;" name="members[<? echo $p["id"] ?>][date_f]" id="accDepDate<? echo $p["id"]; ?>" class="textfieldsXSfree block">
							<option value=""><?php echo($this->getLabel("Partenza"))?></option>
							<?php 
								for ($a=1;$a<$days+4;$a++) {
									$myday = mktime(0, 0, 0, date("m",strtotime($this->confSub["firstday"]))  , date("d",strtotime($this->confSub["firstday"]))+$a, date("Y",strtotime($this->confSub["firstday"])));
									$day = date("d",$myday);
									$fullday = date("Y-m-d",$myday);
									$meseExtended = date("F",$myday);
									echo("<option value=\"".$fullday."\" ".(isset($p['date_f']) ? ($p['date_f']==$fullday ? " selected=\"selected\"" : "") : "").">".$day." ".$meseExtended."</option>");
								}
							?>
							<option value="bella">break</option>
						</select>
						<input type="hidden" name="members[<? echo $p["id"] ?>][days]" id="days<? echo $p["id"] ?>" value="<? echo $p['days'] ?>" />
					</div>
					<div class="left">
						<label id="label_accPhone<? echo $p["id"]; ?>" class="labelSmall" for="accPhone<? echo $p["id"]; ?>"><?php echo($this->getLabel("Telefono"))?></label><br />
						<input onblur="$('#mem<? echo $p["id"]; ?>').attr('checked','checked'); return false;" name="members[<? echo $p["id"] ?>][phone]" id="accPhone<? echo $p["id"]; ?>" class="textfieldsXS block" value="<? echo($p['phone']!=$this->getLabel("Telefono") && $p['phone']!="" ? $p['phone'] : $this->getLabel("Telefono"))?>" type="text" onfocus="clearError(this);if(this.value=='<? echo($this->getLabel("Telefono"))?>'){this.value='';} else if(this.value==''){this.value='<? echo($this->getLabel("Telefono"))?>';}" />
					</div>
				</td>
			</tr>
			<tr id="rowTitAccommodation<? echo $p["id"] ?>"<? echo($p['presente'] ? "" : " style=\"display:none;\"")?>>
				<td colspan="3">
					<b><? echo $this->getLabel("Alloggio"); ?></b>
				</td>
			</tr>
			<tr id="rowAccommodation<? echo $p["id"] ?>"<? echo($p['presente'] ? "" : " style=\"display:none;\"")?>>
				<td>
					<select onchange="clearError(this);setAccType(<? echo $p["id"]; ?>); return false;" name="members[<? echo $p["id"] ?>][accType]" id="accType<? echo $p["id"]; ?>" class="textfieldsXSfree">	
						<?php 
							$type = $p['accType'];
							$str = "";
							if(!$type) $type = "NO";
					 
							foreach ($this->confSub["prices"][$_SESSION["lpm_sub_type"]] as $k=>$pric) {
								echo("<option value=\"".$k."\"".($type==$k ? " selected=\"selected\"" : "").">".$this->getLabel($k)."</option>");
								$str.= "<div id=\"".$k.$p["id"]."\"".($type==$k ? "" : " style=\"display:none;\"").">".$pric['tit']."<br />
								<strong>".$this->getLabel("Prezzo").": ".$pric['price'].",00 € ".$this->getLabel("per persona al giorno")."</strong></div>";
							}
						?>
					</select>
				</td>
				<td>
					<? echo $str; ?>
					<input type="hidden" name="members[<? echo $p["id"] ?>][editable]" value="<? echo $p["editable"] ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][id]" value="<? echo $p["id"] ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][nome]" value="<? echo str_replace(array("<",">","&","\""),array("&lt;","&gt;","&amp;","&quot;"),$p["nome"]); ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][user_id]" value="<? echo($p["user_id"]); ?>" />
				</td>
				<td class="price <? echo($p['days']*$price[$p['accType']]['price']>0 ? "" : "price0"); ?>" id="price<? echo $p["id"] ?>"><? echo $p['days']*$price[$p['accType']]['price'] ?>,00 €</td>
			</tr>
			<tr>
				<td colspan="3"><hr /></td>
			</tr>
		<?	} else { ?>
			<tr>
				<td colspan="2">
					<label class="bigLabel"><? echo($p["nome"]); ?></label>
				</td>
				<td>
					<div class="greenbox">
						<label for="presente<? echo $p["id"]; ?>"><span id="presenteSI<? echo $p["id"]; ?>"<? echo ($p['presente'] ? "" : " style=\"display:none;\"")?>><? echo $this->getLabel("Presente") ?></span><span id="presenteNO<? echo $p["id"]; ?>"<? echo ($p['presente'] ? " style=\"display:none;\"" : "")?>><? echo $this->getLabel("Non presente") ?></span></label>
						<input type="hidden" name="members[<? echo $p["id"] ?>][presente]" id="presente<? echo $p["id"]; ?>" value="<? echo $p["id"] ?>"  />
					</div>
				</td>
			</tr>
			<tr id="rowTitPresenza<? echo $p["id"] ?>">
				<td colspan="3">
					<b><? echo $this->getLabel("Presente"); ?></b>
				</td>
			</tr>
			<tr id="rowPresenza<? echo $p["id"] ?>">
				<td colspan="3">
					<div class="left right10">
						<label id="label_accArrDate<? echo $p["id"]; ?>" class="labelSmall" for="accArrDate<? echo $p["id"]; ?>"><?php echo($this->getLabel("Arrivo"))?></label><br />
						<? echo($p['date_i']) ?>
						<input type="hidden" name="members[<? echo $p["id"] ?>][date_i]" id="accArrDate<? echo $p["id"]; ?>" value="<? echo($p['date_i']) ?>" />	
					</div>
					<div class="left right10">
						<label id="label_accDepDate<? echo $p["id"]; ?>" class="labelSmall" for="accDepDate<? echo $p["id"]; ?>"><?php echo($this->getLabel("Partenza"))?></label><br />
						<? echo($p['date_f']) ?>
						<input type="hidden" name="members[<? echo $p["id"] ?>][date_f]" id="accDepDate<? echo $p["id"]; ?>" value="<? echo($p['date_f']) ?>" />	
						<input type="hidden" name="members[<? echo $p["id"] ?>][days]" id="days<? echo $p["id"] ?>" value="<? echo $p['days'] ?>" />
					</div>
					<div class="left">
						<label id="label_accPhone<? echo $p["id"]; ?>" class="labelSmall" for="accPhone<? echo $p["id"]; ?>"><?php echo($this->getLabel("Telefono"))?></label><br />
						<? echo($p['phone'])?>
						<input type="hidden" name="members[<? echo $p["id"] ?>][phone]" id="accPhone<? echo $p["id"]; ?>" value="<? echo($p['phone'])?>"  />
					</div>
				</td>
			</tr>
			<tr id="rowTitAccommodation<? echo $p["id"] ?>">
				<td colspan="3">
					<b><? echo $this->getLabel("Alloggio"); ?></b>
				</td>
			</tr>
			<tr id="rowAccommodation<? echo $p["id"] ?>">
				<td>
					<?php echo($p['accType']); ?>
					<input type="hidden" name="members[<? echo $p["id"] ?>][accType]" id="accType<? echo $p["id"]; ?>" value="<?php echo($p['accType']); ?>" />	
						<?php 
							$type = $p['accType'];
							$str = "";
							if(!$type) $type = "NO";
					 
							foreach ($this->confSub["prices"][$_SESSION["lpm_sub_type"]] as $k=>$pric) {
								$str.= "<div id=\"".$k.$p["id"]."\"".($type==$k ? "" : " style=\"display:none;\"").">".$pric['tit']."<br />
								<strong>".$this->getLabel("Prezzo").": ".$pric['price'].",00 € ".$this->getLabel("per persona al giorno")."</strong></div>";
							}
						?>
					</select>
				</td>
				<td>
					<? echo $str; ?>
					<input type="hidden" name="members[<? echo $p["id"] ?>][editable]" value="<? echo $p["editable"] ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][id]" value="<? echo $p["id"] ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][nome]" value="<? echo($p["nome"]); ?>" />
					<input type="hidden" name="members[<? echo $p["id"] ?>][user_id]" value="<? echo($p["user_id"]); ?>" />
				</td>
				<td class="price <? echo($p['days']*$price[$p['accType']]['price']>0 ? "" : "price0"); ?>" id="price<? echo $p["id"] ?>"><? echo $p['days']*$price[$p['accType']]['price'] ?>,00 €</td>
			</tr>
			<tr>
				<td colspan="3"><hr /></td>
			</tr>
		<? }	
					$total+= ($p['days']*$price[$p['accType']]['price']);
				}
				$a++;
			}
		?>
			<tr>
				<td>&nbsp;</td>
				<td style="text-align:right;"><b><? echo $this->getLabel("TOTALE"); ?></b></td>
				<td style="text-align:right;" id="total"><b><? echo $total; ?>,00 €</b></td>
			</tr>
		</table>
    </div>

			<div class="boxFormLpmSubmit right">
				<input type="submit" name="submit_accommodation" id="submit_accommodation" value="<?php echo($_GET['sb']==1 ? $this->getLabel("Salva") : $this->getLabel("Avanti"))?>" class="pulsBig" />
			</div>
			<br class="myClear" />
		</form>
<script type="text/javascript"><!--
	var defaultPhone = '<? echo($this->getLabel("Telefono")); ?>';
//-->
</script>
