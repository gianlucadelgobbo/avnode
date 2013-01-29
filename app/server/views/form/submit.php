<?
		$statuLabel = "";
	if (isset($_POST['submit_submit'])) {	
	} else {
		$senderUsrObj=$this->community->getUserDett($_SESSION['user_id'],array("full_info"=>true,"img_user"=>false,"img_user_size"=>false));
		
		foreach($senderUsrObj['emails'] as $email) {
			if ($email['primary']) $yourmail = $email['email'];
		}

    	$str="
            	<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"membersList\">
            		<tr>		
						<td colspan=\"3\"><h3 class=\"bottomLine\">".$this->community->getLabel("Email di contatto")."</h3></td>
            		</tr>		
            		<tr>		
						<td colspan=\"3\">
							<div class=\"left\">
								<h4>".$yourmail."</h4>
							</div>
							<h4 class=\"right\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=1&amp;id=".$_SESSION['user_id']."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\">".$this->community->getLabel("Modifica")."</a></h4>
							<br class=\"myClear\" />
								<p>".$this->community->getLabel("ATTENZIONE: Tutte le comunicazioni, conferme, informazioni per gli alloggi verranno effettuate su questa email.")."</p>
						</td>
            		</tr>\n";
	//Performance
		if ($_SESSION["lpm_sub_type"]=="performers" || $_SESSION["lpm_sub_type"]=="contest") {
			$id=(isset($_SESSION['lpm']['performance_id']) ? $_SESSION['lpm']['performance_id'] : 0);
			$_SESSION['lpm']['id']=(isset($_SESSION['lpm']['performance_id']) ? $_SESSION['lpm']['performance_id'] : "");
			$_SESSION['lpm']['pageract']=(isset($_SESSION['lpm']['pageract']) ? $_SESSION['lpm']['pageract'] : "");
			$_SESSION['lpm']['uid']=(isset($_SESSION['lpm']['author']) ? $_SESSION['lpm']['author'] : "");
			$_SESSION['lpm']['tag']=(isset($_SESSION['lpm']['tag']) ? $_SESSION['lpm']['tag'] : "");
			$sql_select_count="select count(flxer_performance.id) as pager_cont ";
			$sql_select="select DATE_FORMAT(flxer_performance.data_creazione, '%d.%m.%y | %H.%i') as performancedata, (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(flxer_performance.data_creazione)) as delta, flxer_performance.* ";
			$sql_from="from flxer_performance ";
			$sql_where="where flxer_performance.id=".$_SESSION['lpm']['id']." ";
			$sql_order="order by flxer_performance.data_creazione desc";			
			$sql_arr=array("sql_select_lite"=>-1,"sql_select_count"=>$sql_select_count,"sql_select"=>$sql_select,"sql_from"=>$sql_from,"sql_where"=>$sql_where,"sql_order"=>$sql_order,"page_tit"=>"");		

			$obj = $this->community->getPerfDettObjAction($_SESSION['lpm'],$sql_arr,"big");
		
	//Chiavi
            /*
            $tipo = array();
            $chiavi=explode(",",$obj['chiavi']);
            foreach($chiavi as $k){
                if(substr($k, 0, 5)=="|380|"){
                    if(str_replace("|","",substr($k, 4))!=""){
                        $tipo[]=$this->community->getNomeChiave(str_replace("|","",substr($k, 5)));
                    }
                }
            }
            $tipoStr = "".implode(",",$tipo);
            */
            $tipoStr = $this->community->getNomeChiave($obj['type']);
            if ($obj['type']==382 || $obj['type']==381) {
	            $techniqueStr = $this->community->getNomeChiave($obj['technique'.$obj['type']]);
	            $genreStr = ($obj['genre'] ? $this->community->getNomeChiave($obj['genre']) : $obj['tag']);
            }
            $obj['titolo_attr']=$obj['titolo'];
            //print_r($obj['gallery']);
            $testi=getTesti($_SESSION['lpm']['id'],"performance","testo",$this);
            $tech_reqs=getTesti($_SESSION['lpm']['id'],"performance","tech_req",$this);
            $alertTextMsg = "";
            $alertReqMsg = "";
            $notEn = true;
            foreach($testi as $k=>$t){
	            if ($k=="en") {
    		        if (strlen(strip_tags($t))>100) {
            		    $alertText = "<span class=\"boxGreen\">OK</span>";
	    	        } else {
    	    	        $alertText = "<span class=\"boxRed\">NO</span>";
            		   	$alertTextMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo in inglese o e' troppo breve (min. 100chr)")."</span>";
            		}
            		$notEn = false;
            	}
            }
			if ($notEn) {
				$testi["en"] = "";
    	    	$alertText = "<span class=\"boxRed\">NO</span>";
            	$alertTextMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo in inglese o e' troppo breve (min. 100chr)")."</span>";
			}
            $notEn = true;
            foreach($tech_reqs as $k=>$t){
	            if ($k=="en") {
    		        if (strlen(strip_tags($t))>20) {
            		    $alertReq = "<span class=\"boxGreen\">OK</span>";
	    	        } else {
    	    	        $alertReq = "<span class=\"boxRed\">NO</span>";
            		   	$alertReqMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo delle richieste tecniche in inglese o e' troppo breve (min. 20chr)")."</span>";
            		}
            		$notEn = false;
            	}
            }
			if ($notEn) {
				$tech_reqs["en"] = "";
    	    	$alertReq = "<span class=\"boxRed\">NO</span>";
            	$alertReqMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo in inglese")."</span>";
			}
			$avatarname = substr($obj['img_arr'],strrpos($obj['img_arr'],"/")+1,strlen($obj['img_arr']));
			if(strpos($avatarname,"?")!==false) $avatarname = substr($avatarname,0,strpos($avatarname,"?"));
			if ($avatarname == "defaultBig.gif") $avatarname = "";
            $str.="
            		<tr>		
						<td colspan=\"3\"><h3 class=\"bottomLine\">".$this->community->getLabel("Performance")."</h3></td>
            		</tr>		
            		<tr>		
						<td colspan=\"3\">
							<h4 class=\"left\">".$obj['titolo']."</h4>
							<h4 class=\"right\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\">".$this->community->getLabel("Modifica")."</a></h4>
							<br class=\"myClear\" />
						</td>
            		</tr>		
            		<tr>		
							<td class=\"col1tr\">".(strlen($obj['titolo'])>0 ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td class=\"col2\">".$this->community->getLabel("Titolo").": <strong>".$obj['titolo']."</strong></td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>		
            		<tr>		
							<td>".(is_numeric($obj['duration']) && $obj['duration'] < 31  ? "<span class=\"boxGreen\">OK</span>" : (strpos($obj['chiavi'],"|380|388|")>=0 ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>"))."</td>
							<td>
							".$this->community->getLabel("Durata").": <strong>".$obj['duration']." min.</strong>
							".(is_numeric($obj['duration']) && $obj['duration'] < 31 ? "" : (strpos($obj['chiavi'],"|380|388|")>=0 ? "" : "<span class=\"boxRed\">".$this->community->getLabel("La durata massima e di 30 minuti")."</span>"))."</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>		
            		<tr>		
							<td>".($tipoStr ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Tipo").": <strong>".$tipoStr."</strong></td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>";
            if ($obj['type']==382 || $obj['type']==381) {
           		$str.="
            		<tr>		
							<td>".($techniqueStr ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Tecnica").": <strong>".$techniqueStr."</strong></td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>
            		<tr>		
							<td>".($genreStr ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Genere").": <strong>".$genreStr."</strong></td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>";
            }
            $str.="
            		<tr>		
							<td>".($avatarname ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Immagine principale della performance").($avatarname ? ": <strong>".substr($obj['img_arr'],strrpos($obj['img_arr'],"/")+1,strlen($obj['img_arr']))."</strong> <a rel=\"shadowbox\" href=\"".$obj['img_arr']."\">".$this->community->getLabel("Mostra")."</a>" : "")."</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>			
            		<tr>		
							<td>".$alertText."</td>
							<td>";
            foreach($testi as $k=>$t){
                $str.="
								<div class=\"left\">".$this->community->getLabel("Testo")." ".$k."</div>
								<div class=\"right\">".$alertTextMsg."</div>
								<br class=\"myClear\" />
								<span class=\"boxTextLpm\">".$t."</span>";
            }
            $str.="
                			</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>			
            		<tr>		
							<td>".$alertReq."</td>
							<td>";
            foreach($tech_reqs as $k=>$t){
                $str.="			
								<div class=\"left\">".$this->community->getLabel("Richieste tecniche")." (".$this->community->getLabel("cosa ti serve da LPM").") ".$k."</div>
								<div class=\"right\">".$alertReqMsg."</div>
								<br class=\"myClear\" />
                                <span class=\"boxTextLpm\">".$t."</span>";
            }
            
            
            //print_r($obj['gallery']);
                        
            $gall="";
            if (count($obj['gallery'])) {
				$gallAdd = "<div class=\"boxRed\">NO VIDEO IN GALLERYS</div>";
                $gallMess = "<span class=\"boxRed\">NO</span>";
                $gall.="
                    <ul id=\"gallery\">";
                foreach($obj['gallery'] as $gallery) {
                	$gallery['stats'] = $this->community->getGalleryStats($gallery['id']);
                	if ($obj['type']==382 || $obj['type']==381) {
						if($gallery['stats']['video'] > 0) {
							$gallAdd = "";
							$gallMess = "<span class=\"boxGreen\">OK</span>";
						}
					} else {
						$gallAdd = "";
						$gallMess = "<span class=\"boxGreen\">OK</span>";
					}
					/*
					$gall.="
                        <li>
                            <p id=\"p_cnt_".$gallery['id']."\" class=\"galleryItem\" style=\"background-image: url('/_images/freccia_open.gif');\">
                            	<a href=\"/gallery/?id=".$gallery['id']."\"  onclick=\"divFiller('cnt_".$gallery['id']."','p_cnt_".$gallery['id']."','/gallery/?id=".$gallery['id']."&amp;div=1');return false;\"\">
                            		<span class=\"gallTit\">".$gallery['titolo']."</span>
								</a>
							</p>
							<span class=\"galleryCnt\" id=\"cnt_".$gallery['id']."\" style=\"display: none;\"></span>
						</li>";
						*/
					$gall.="
                        <li><span class=\"gallTit\">".$gallery['titolo']."</span></li>";
                }
                $gall.="			
                    </ul>";
                $gall = $gallAdd.$gall;			
                
            } else if ($obj['type']==382 || $obj['type']==381) {
                $gallMess = "<span class=\"boxRed\">NO</span>";
            } else {
                $gallMess = "<span class=\"boxYellow\">&nbsp;!&nbsp;</span>";
            
            }
            
            $str.="
                			</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>			
            		<tr>
            			<td>".$gallMess."</td>
							<td>".$this->community->getLabel("Galleria").":";
            $str.=$gall;
            $str.="
							</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=0&amp;perfid=".$id."\" title=\"".$this->community->getLabel("Modifica").": ".$obj['titolo_attr']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>";
            $str.="
					<tr>		
						<td colspan=\"3\">&nbsp;</td>
            		</tr>";
		} else {
			$obj = array("performers"=>array(array("uid"=>$_SESSION['lpm']['author'])));
		}

// Utenti

		$str.="
					<tr>		
						<td colspan=\"3\"><h3 class=\"bottomLine\">".($_SESSION["lpm_sub_type"]=="performers" || $_SESSION["lpm_sub_type"]=="contest" ? $this->community->getLabel("Utenti") : ($_SESSION["lpm_sub_type"]=="artists" ? $this->community->getLabel("Artista") : $this->community->getLabel("Visitatore")))."</h3></td>
            		</tr>";
            		
        $contaPerformers = 0;
		foreach($obj["performers"] as $p){
		
			//$sql=$this->community->getSqlUserDett($p["id"]);
			$obj2=$this->community->getUserDett($p["uid"]);
			$usrObj=$obj2;
			if (count($usrObj['locations'])) {
				$countryStr = $this->community->writeLocations($usrObj['locations']);
			}
			
			$testi=getTesti($usrObj["uid"],"soggetti","testo",$this);
            $alertTextMsg = "";
            $notEn = true;
            foreach($testi as $k=>$t){
	            if ($k=="en") {
    		        if (strlen(strip_tags($t))>100) {
            		    $alertText = "<span class=\"boxGreen\">OK</span>";
	    	        } else {
    	    	        $alertText = "<span class=\"boxRed\">NO</span>";
            		   	$alertTextMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo in inglese o e' troppo breve (min. 100chr)")."</span>";
            		}
            		$notEn = false;
            	}
            }
			if ($notEn) {
				$testi["en"] = "";
    	    	$alertText = "<span class=\"boxRed\">NO</span>";
            	$alertTextMsg = " <span class=\"boxRed\">".$this->community->getLabel("Manca il testo in inglese")."</span>";
			}
			
			$avatarname = substr($usrObj['avatar'],strrpos($usrObj['avatar'],"/")+1,strlen($usrObj['avatar']));
			//$avatarname = substr($avatarname,0,strpos($avatarname,"?"));
			if ($avatarname == "defaultUserMBig.gif" || $avatarname == "defaultUser.gif" || $avatarname == "defaultUserFBig.gif") $avatarname = "";
			
			$str.="
            		<tr>		
						<td colspan=\"3\">
							<h4 class=\"left\">".$usrObj['nomearte']."</h4>
							<h4 class=\"right\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\">".$this->community->getLabel("Modifica")."</a></h4>
							<br class=\"myClear\" />
						</td>
            		</tr>		
            		<tr>		
							<td>".(strlen($usrObj['nomearte']) ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Utente").": ".$usrObj['nomearte']."</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>		
            		<tr>		
							<td>".($avatarname ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Avatar").($avatarname ? ": <strong>".$avatarname."</strong> <a rel=\"shadowbox\" href=\"".$usrObj['avatar']."\">".$this->community->getLabel("Mostra")."</a>" : "")."</li>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>		
            		<tr>		
							<td>".($countryStr ? "<span class=\"boxGreen\">OK</span>" : "<span class=\"boxRed\">NO</span>")."</td>
							<td>".$this->community->getLabel("Locations").": ".$countryStr."</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>
            		<tr>";		
			if ($_SESSION["lpm_sub_type"]=="performers") {
					$str.="			
            		<tr>		
							<td>".$alertText."</td>
							<td>";
            	foreach($testi as $k=>$t){
                	$str.="
								<div class=\"left\">".$this->community->getLabel("Testo")." ".$k."</div>
								<div class=\"right\">".$alertTextMsg."</div>
								<br class=\"myClear\" />
								<span class=\"boxTextLpm\">".$t."</span>";
            	}
            	$str.="
                			</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>";
			}
			if ($usrObj['members']) {
					$str.="			
            		<tr>		
							<td>&nbsp;</td>
							<td>
								<h4>".$this->community->getLabel("Membri")."</h4>
								<ul>";
            	foreach($usrObj['members'] as $k){
            		$contaPerformers++;
                	$str.="
								<li>".$k["nomearte"]."</li>";
            	}
            	$str.="
            					</ul>
                			</td>
							<td class=\"col3\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=".($usrObj["is_crew"]==1 ? "2&amp;crewid=" :"1&amp;id=")."".$p["uid"]."\" title=\"".$this->community->getLabel("Modifica").": ".$usrObj['nomearte']."\"><img src=\"/_images/edit_32.png\" alt=\"".$this->community->getLabel("Modifica")."\" /></a></td>
            		</tr>";
			} else {
           		$contaPerformers++;
			}
            $str.="
					<tr>		
						<td colspan=\"3\">&nbsp;</td>
            		</tr>";
		}
		$str.="
            		<tr>		
						<td colspan=\"3\">
						<div class=\"bottomLine\">
							<h3 class=\"left\">".$this->community->getLabel("Arrivo e Partenza")."</h3>
							<h4 class=\"right\"><a href=\"".(strpos($_SERVER['REQUEST_URI'],"?") ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'],"?")) : $_SERVER['REQUEST_URI'])."?step=".$_SESSION["step"]."&amp;substep=3\">".$this->community->getLabel("Modifica")."</a></h4>
							<br class=\"myClear\" />
						</div>
						</td>
            		</tr>
            		<td colspan=\"3\">";
		if($_SESSION['lpm']['accommodation']){
			$total = 0;
			$str.="
						<table width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\">
							<tr>
								<td><strong>".$this->getLabel("Tipo")."</strong></td>
								<td><strong>".$this->getLabel("Nome")."</strong></td>
								<td><strong>".$this->getLabel("Telefono")."</strong></td>
								<td><strong>".$this->getLabel("Arrivo")."</strong></td>
								<td><strong>".$this->getLabel("Partenza")."</strong></td>
								<td><strong>".$this->getLabel("Prezzo")."</strong></td>
							</tr>";
			foreach($_SESSION['lpm']['accommodation'] as $item){
				//if ($item['days']) {
					$price = 0;
					if ($item['presente']) $price = $item['days']*$this->prices[$_SESSION["lpm_sub_type"]][$item['accType']]['price'];
					$total+=$price;
					$str.="
							<tr".($item['presente'] ? "" : " class=\"price0\"").">
								<td>".($item['presente'] ? $item['accType'] : $this->getLabel("Non presente"))."</td>
								<td>".$item['nome']."</td>
								<td>".($item['presente'] ? $item['phone'] : "")."</td>
								<td>".($item['presente'] ? $item['date_i'] : "")."</td>
								<td>".($item['presente'] ? $item['date_f'] : "")."</td>
								<td class=\"price\">".($item['presente'] ? $price.",00 €" : "")."</td>
							</tr>";
				/*} else {
					$str.="
							<tr>
								<td>".$this->community->getLabel("NO")."</td>
								<td>".$item['nome']."</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
							</tr>";
				}*/
			}
			$str.="
							<tr>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
								<td>&nbsp;</td>
								<td style=\"text-align:right;\"><b>".$this->getLabel("TOTALE")."</b></td>
								<td class=\"price\"><b>".$total.",00 €</b></td>
							</tr>
						</table>";							
		} else {
			$str.="".$this->community->getLabel("Nessun alloggio richiesto")."";
		}
		$str.="
					</td>
            	</tr>
            	</table>";
		$esito = (strpos($str,"class=\"boxRed\"")===false ? true : false );
		$_SESSION['lpm']['contaperformers'] = $contaPerformers;
	}
?>

<? if (!$esito) { ?>
						<div id="boxError">
							<div class="labelBig"><? echo($this->community->getLabel("ATTENZIONE: Per inviare la performance ad LPM devi completare dati marcati in ROSSO.")); ?></div>							
						</div>
<? } ?>
<? echo($str); ?>
<? if (!$esito) { ?>
						<div id="boxError">
							<div class="labelBig"><? echo($this->community->getLabel("ATTENZIONE: Per inviare la performance ad LPM devi completare dati marcati in ROSSO.")); ?></div>							
						</div>
			<br class="myClear" />
<? } else  if (!$mailStr){ ?>
<form method="post" action="#">
			<div class="boxFormLpmSubmit right">
				<input type="submit" name="submit_submit" id="submit_submit" value="<? echo($this->getLabel("Invia"))?>" class="pulsBig" />
			</div>
			<br class="myClear" />
</form>
<? } ?>



<?
	function getTesti($id,$tab,$field_name,$t){
			$res=array();
			$t->community->db->query("select ".$field_name." as testo from ".$tab." where id=".$id);
			$tres=$t->community->db->fetch();					
			if($tres){
				foreach($t->community->initObj["availableLng"] as $ll){
					$testo=$t->community->getMLFieldValue(json_decode($tres[0]->testo,true),$ll["sigla"],true);
					if($testo!=false && strip_tags(trim($testo))!="insert Text" && trim($testo)!="&lt;p&gt;insert Text&lt;/p&gt;"){
						$res[$ll["sigla"]] = $testo;						
					}
				}
			}
			return $res;
	}
	
?>