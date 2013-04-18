				<form method="post" name="partmode" id="partmode" onsubmit="return check_partmode()" action="#">
					<div class="col1half left">
						<div class="boxForm">
							<span class="labelBig"><? echo($this->getLabel("Singolo")) ?> </span>
							<br />
							<label for="crew" id="label_crew">
							<input type="radio"  onchange="clearErrors(this);" value="<? echo($_SESSION['user_id']); ?>" class="radio" id="crew" name="crew" <? if($_SESSION['crew'] == $_SESSION['user_id']){ echo "checked='checked'"; } ?> />
							<? echo($_SESSION['user_name']) ?></label>
							<br /><br />
							<span class="labelBig"><? echo($this->getLabel("Gruppo")) ?> - <a href="index.php?step=<? echo($_SESSION['step']) ?>&amp;substep=0"><? echo($this->getLabel("Nuovo gruppo")) ?></a></span>
							<br />     
							<?
							$sql = "select soggetti.id as id,soggetti.nomevisualizzato as label from soggetti,dipendenti where soggetti.id=dipendenti.id_a AND dipendenti.id_p=".$_SESSION['user_id']." and soggetti.chiavi like '%".$this->community->initObj['user_community_key']."%' ORDER BY nomevisualizzato";
					        $this->community->db->query($sql);
					        $res=$this->community->db->fetch();
					        $cont_option=0;
					        $optStr="";
					        if($res){
					            foreach($res as $row){
					                    $optStr.="
							<label id='label_crew_".$cont_option."' for='crew_".$cont_option."'><input type='radio' onchange=\"clearErrors(this);\" name='crew' id='crew_".$cont_option."' class='radio' value='".$row->id."' "; 
					                    if( isset($_SESSION['crew']) && ($_SESSION['crew'] != '')){
					    							if($_SESSION['crew'] == $row->id){
					    							 	$optStr .= "checked='checked'";
					    							}
					   					} 
					                	$optStr .= "/> ".$row->label."</label><br/>\n";
					                    $cont_option++;
					            }
					            echo($optStr);
					        }
					        ?>
						</div>                         
					</div>                         
					<div class="col1half left">
						<div id="avatar2" style="height:100px;"><? if( isset($_SESSION['crew']) && ($_SESSION['crew'] != '')){
	//row ID!!
	$sql = "select soggetti.id as id,soggetti.nomevisualizzato as label from soggetti,dipendenti where soggetti.id=dipendenti.id_a AND dipendenti.id_p=".$_SESSION['user_id']." and soggetti.chiavi like '%".$this->community->initObj['user_community_key']."%' ORDER BY nomevisualizzato";
        					$this->community->db->query($sql);
        					$res=$this->community->db->fetch();
       						$cont_option=0;
        					$optStr="";
        					if($res){
                				foreach($res as $row){
		        					if($_SESSION['crew'] == $row->id){
		        							if($_SESSION['crew'] == $_SESSION['user_id']){
		        								//user avatar
		        								$img_avatar=$this->community->getSingleFileFormat($_SESSION['user_id'],"soggetti_rel",array(100,100),$this->community->initObj["avatar_files_key"]);	
		        							}else{
		        								//crew avatar
		        								$img_avatar=$this->community->getSingleFileFormat($_SESSION['crew'],"soggetti_rel",array(100,100),$this->community->initObj["avatar_files_key"]);      						
		        							}
		        							echo '<img src="'.$img_avatar.'"/>';
		        					}
        						}
        					}
        			}
 				?></div>
					</div> 
					<br class="myClear" />                       
					<div class="boxFormLpmSubmit right">
						<input type="submit" name="submit_partmode" id="submit_partmode" value="<? echo($this->getLabel("Avanti")); ?>" class="pulsBig" />
					</div>
					<br class="myClear" />                       
					</form>