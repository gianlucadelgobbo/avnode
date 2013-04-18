<?
		$_GET["id"] = $_SESSION["lpm"]["author"];
		if (isset($_SESSION["lpm"]["accommodation"])) $_SESSION["lpm"]["accommodation"] = ""; 
		$act = ($_SESSION["lpm"]['single'] ? "my" : "crew");
		$sql_arr=$this->community->getSqlPerformance($act);
		$pager=$this->community->paginatorPost($_GET,$sql_arr,$this->community->initObj["post_num_row"]);				
		//$sql=$sql_arr["sql_select"].$sql_arr["sql_from"].$sql_arr["sql_where"].$sql_arr["sql_order"]." limit ".$pager["skip"].",".$this->community->initObj["post_num_row"];	
		//$sql=$sql_arr["sql_select"].$sql_arr["sql_from"].$sql_arr["sql_where"].$sql_arr["sql_order"];
		$sql=$sql_arr["sql_select"].$sql_arr["sql_from"].$sql_arr["sql_where"];
		foreach($this->confSub["rooms"] as $room) {
			if (in_array($_SESSION["lpm_sub_type"], $room['availablefor'])) {
				foreach($room['admittedtypes'] as $type) {
					$sql.=" and chiavi like '%".$type."%' ";
				}
			}
		}
		$res=$this->community->getPerfsObj($sql,array("full_info"=>false,"img_post"=>true,"img_post_size"=>"small","img_user"=>false));
		if ($res) {
			$obj = array();
			foreach($res as $row){
				$typeKey=0;
				$karr=explode(",",$row['chiavi']);
				foreach($karr as $k){
					if(strpos($k,"|380|")!==false){
						$typeKey=substr($k,strpos($k,"|380|")+5,-1);
						break;						   
					}
				}
				$objTmp = array();
				$objTmp["id"] = $row["id"];
				$objTmp["titolo"] = $row["titolo"];
				$objTmp["type"] = $typeKey;
				$obj[] = $objTmp;
	
			}
			if ($obj) {
				$blc=1;
				foreach($obj as $row){
					$str.="
							<label for=\"selectperf_".$row["id"]."\" id=\"label_selectperf_".$row["id"]."\">
										<input onchange=\"clearErrors(this);\" type='radio' name='selectperf' value='".$row['id']."' id='selectperf_".$row['id']."'";
								
							if($_SESSION["lpm"]['performance_id'] == $row['id']){
								$str .= "checked='checked'";
							}
							
							//$str .= "/> ".$row['titolo']." ".$row['type']."</label>
							$str .= "/> ".$row['titolo']." (".$this->community->getNomeChiave($row['type']).")</label>
							<input type='hidden' name='perftype_".$row['id']."' value='".$row['type']."' id='perftype_".$row['id']."' />
							<br />
							<br />\n";
				}
			}
		} else {
			if ($_SESSION["lpm_sub_type"]=="contest") {
				$str = "<div class=\"labelBig\">".$this->community->getLabel("Nessun VJ Set disponibile")."</div>\n";
				$str.= "<div>".$this->community->getLabel("Aggiungi un nuovo VJ Set dal pulsante").": ".$this->community->getLabel("Nuova performance")."</div>\n";
			} else {
				$str = "<div class=\"labelBig\">".$this->community->getLabel("Nessuna performance disponibile")."</div>\n";
				$str.= "<div>".$this->community->getLabel("Aggiungi una AV Performance, Project showcase, Video Installation, VJ Set o Workshop dal pulsante").": ".$this->community->getLabel("Nuova performance")."</div>\n";
			}
		}
?> 
				<h1 class="right" id="newperf"><a href="<? echo(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI']); ?>?step=3&amp;substep=0<? echo($_SESSION["lpm_sub_type"]=="contest" ? "&amp;type=382" : ""); ?>"><? echo($this->community->getLabel("Nuova performance")) ?></a></h1>
                <br id="label_selectperf" class="myClear" />
				<form method="post" action="#" onsubmit="return check_selectperf();">
					<? echo($str); ?>
					<div id="errordiv" class="errorMsg"><? echo($_SESSION["str_err"]);$_SESSION["str_err"]=NULL; ?></div>
					<br class="myClear" />
					<div class="boxFormLpmSubmit right">
						<input type="submit" name="submit_selectperf" id="submit_selectperf" value="<? echo($this->community->getLabel("Avanti"))?>" class="pulsBig" />
					</div>
					<br class="myClear" />
				</form>
