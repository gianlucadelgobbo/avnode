<?
require_once ("xajax.common.php");

function checklogin($aFormValues)
{
	if (array_key_exists("login",$aFormValues) && array_key_exists("password",$aFormValues))
	{
		return login($aFormValues);
	}else{
		return loginfailed();
	}
}

function login($aFormValues){
	$objResponse = new xajaxResponse();
	include_once("../../../../_php/class/site.class.php");	
	$site=new site();
	if($site->community->logUser($aFormValues["login"],$aFormValues["password"])){
			$esito=true;			
		}else{
			session_unset();
			session_destroy();
			$esito=false;
		}
	if($esito){
		if(isset($_SESSION["requested_protected_content"])){
				$prec_url=$_SESSION["requested_protected_content"];
				unset($_SESSION["requested_protected_content"]);
				//echo($prec_url);
				header("Location: ".$prec_url);
		}elseif($_SERVER['HTTP_REFERER']){
			$isException=false;
			foreach($site->community->initObj["log_act_exceptionPages"] as $xcpt){
				if(strpos($_SERVER['HTTP_REFERER'],$xcpt)!==false){
					$isException=true;
					break;
				}	
			}
			if($isException){
				//$objResponse->redirect($site->community->initObj['log_act_success_url']);
				$_SESSION['step'] = 2;		
				//var_export($_SESSION['step'],true);
				$a = explode('?',$_SERVER['HTTP_SELF']);
				$objResponse->redirect($_SERVER['HTTP_SELF']."?step=2");
			}else{
				$objResponse->redirect($_SERVER['HTTP_SELF']."?step=2");
			}
		}else{
			//$objResponse->redirect($site->community->initObj["log_act_success_url"].$_SESSION["user_name"]);	
			$a = explode('?',$_SERVER['HTTP_SELF']);
			$objResponse->redirect($a[0]."?step=2");
			//var_export($_SESSION['step'],true);
			$objResponse->redirect($_SERVER['HTTP_SELF']."?step=2");
		}
	}else{
		include_once("includeManage.php");
		$site=new site();
		$testo = $site->getLabel('login errato');
		$objResponse->assign("errLogin","innerHTML",$testo);
		$objResponse->assign("submit","value", "ENTER");
		$objResponse->assign("submit","disable", false);
		$objResponse->assign("formLogin","style.backgroundColor", "rgb(255,20,20)");
	}
	return $objResponse;
}

function loginfailed(){
	$objResponse = new xajaxResponse();
	include_once("includeManage.php");
	$site=new site();
	$testo = $site->getLabel('login errato');
	$objResponse->assign("errLogin","innerHTML",$testo);
	$objResponse->assign("submit","value", "ENTER");
	$objResponse->assign("submit","disable", false);
	$objResponse->assign("formLogin","style.backgroundColor", "rgb(255,20,20)");
	return $objResponse;
}

$xajax->processRequest();
?>
