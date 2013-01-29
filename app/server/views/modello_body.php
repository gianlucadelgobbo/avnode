<?php
@header ('Cache-Control: private, pre-check=0, post-check=0, max-age=1080');
@header ('Expires: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() + 1080)); //60*3
@header ('Last-Modified: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() - 20)); //60*60*3
?>
<? if ((isset($_POST['login']) && isset($_POST['password'])) || $_GET['logout']=="logout") include_once($this->initObj['site_path']."_php/form/login/login_act.php");?>
<? if (isset($this->inc)) include_once($this->inc); ?>
<!DOCTYPE HTML>
<html lang="<? echo($this->initObj['area']); ?>">
<head>
<title><? echo(($this->title ? $this->title." | FLxER" : "FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE")); ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="FLYER COMMUNICATION, Gianluca Del Gobbo, Flavio Distefano" />
<meta name="robots" content="all" />
<meta name="keywords" content="<?php echo($this->getLabel("meta-keywords")); ?>" />
<meta name="description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />

<?php
function is_facebook(){
	if(!(stristr($_SERVER["HTTP_USER_AGENT"],"facebook") === FALSE)) return true;
}
if(is_facebook()){?>
<meta property="og:title" content="<? echo(($this->title ? $this->title : "FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE")); ?>" />
<meta property="og:type" content="<? echo(($this->community->type ? $this->community->type : "website")); ?>" />
<meta property="og:url" content="<?php echo("".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>" />
<meta property="og:image" content="<?php echo("".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST'].($this->community->img_src ? $this->community->img_src : "/_images/FBicon.jpg")); ?>" />
<meta property="og:site_name" content="FLxER" />
<meta property="og:description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<meta property="fb:admins" content="717872862" />
<meta property="fb:app_id" content="286488314048" />
<meta property="og:locale" content="<? echo($this->locale[$this->initObj['area']]); ?>" />
<link rel="image_src" href="<?php echo("".$this->community->initObj["protocol"]."://".$_SERVER['HTTP_HOST'].($this->community->img_src ? $this->community->img_src : "/_images/FBicon.jpg")); ?>" />
<?php }?>


<link type="text/css" href="/_script/jquery/css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="/_script/jquery/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/_script/jquery/js/jquery-ui-1.8.17.custom.min.js"></script>

<!--
<script type="text/javascript" src="/_script/prototype.js"></script>
<script language="javascript"	 type="text/javascript" src="/_script/effects.js"></script>
<script language="javascript"	 type="text/javascript" src="/_script/window/window.js"></script>
<script language="javascript"	 type="text/javascript" src="/_script/window/window_ext.js"></script>
<link rel="stylesheet" type="text/css" href="/_script/window/windowAlert.css" />
<link href="/_script/shadowbox/shadowbox.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/_script/shadowbox/shadowbox.js"></script>
 -->
<script type="text/javascript" src="/_script/_lang/<?php echo($this->initObj['area']); ?>.js"></script>
<script type="text/javascript" src="/_script/fpVariables.js"></script>
<script type="text/javascript" src="/_script/fpManager.js"></script>
<script type="text/javascript" src="/_script/fpCheck.js"></script>
<script type="text/javascript" src="/_script/script.js?v=1.2"></script>
<script type="text/javascript" src="/_script/sendMsg.js"></script>
<script type="text/javascript" src="/_script/notifications.js"></script>
<script type="text/javascript" src="/_script/playList.js"></script>
<script type="text/javascript" src="/_script/rate.js"></script>
<script type="text/javascript" src="/_script/ajaxSlideShowLoader.js"></script>
<? if($_SERVER['PHP_SELF']=="/controlpanel/new/index.php" || $_SERVER['PHP_SELF']=="/controlpanel/new/gigya.php"){ ?>
<!-- socialize.js script should only be included once -->
<script type="text/javascript" src="http://cdn.gigya.com/js/socialize.js?apiKey=2_B2v2RgZOGGx4SxCW1frvgSeM5PW8MWRLqnPNwXeDZ3RP0zZuI78lJccYf2-p453s"></script>
<script type="text/javascript">
var conf = {APIKey:'2_B2v2RgZOGGx4SxCW1frvgSeM5PW8MWRLqnPNwXeDZ3RP0zZuI78lJccYf2-p453s'}
</script>
<? } ?>
<script type="text/javascript"><!--
var original_open_menu="<? echo((strpos($_SERVER['REQUEST_URI'],"/project/")!==false ? "#projectMenu" : (strpos($_SERVER['REQUEST_URI'],"/software/")!==false ? "#softwareMenu" : "#communityMenu")))	?>";
//-->
</script>
<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->community->headStr)) echo($this->community->headStr); ?>
<link href="/_css/style.css" rel="stylesheet" type="text/css" />
<link href="/_css/print.css" rel="stylesheet" type="text/css" media="print" />
<!--[if lte IE 6]>
<link href="/_css/style-ie6.css" rel="stylesheet" type="text/css" />
<![endif]-->
<style type="text/css">
<? if (strpos($_SERVER['HTTP_USER_AGENT'],"Macintosh")!==false){ ?>
	<? if (strpos($_SERVER['HTTP_USER_AGENT'],"Safari")!==false){ ?>
.textfieldsSearch {padding:2px 2px 1px 2px;}
.pulsSearch {padding:2px 2px 1px 2px;}
	<? } else {	?>
.textfieldsSearch {padding:3px 3px 3px 3px;}
.pulsSearch {padding:2px 2px 2px 2px;}
	<? }	?>
<? }	?>
</style>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', '<? echo($this->initObj["sections"]["analytics"][$this->initObj["area"]]); ?>']);
  _gaq.push(['_setDomainName', 'flxer.net']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
<div class="header">
	<div class="cnt">
		<h2><a href="/" title="FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE"><img src="/_images/logoFLxER.gif" alt="FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE" /></a></h2>		
		<div class="topBanner">
		<? echo($this->community->scriviBannerTop()); ?>
        </div>
        <br class="myClear" />
    </div>
    <div class="cnt">
		<?php
			$path=str_replace("&","&amp;",$_SERVER['REQUEST_URI']);
			$langUl = "";
			foreach($this->community->initObj['availableLng'] as $k=>$v) {
				$langUl.= "					<li class=\"flag_".$k.($this->initObj['area']==$k ? " langSel\">" : "\"><a href=\"".$this->community->initObj["protocol"]."://".($k!="en" ? $k."." :"").($this->initObj["area"]!=$this->initObj["defaultLang"] ? str_replace($this->initObj["area"].".","", $_SERVER['HTTP_HOST']) : $_SERVER['HTTP_HOST']).$path."\" title=\"".$v['lingua']."\">")."<span class=\"langItem\"><span class=\"assistive-text\">".$v['lingua']."</span></span>".($this->initObj['area']==$k ? "" : "</a>")."</li>\n";
			}
		?>
		<ul id="mainMenu">
			<li id="abusers"><a href="/" title="<?php echo($this->getLabel("Network")); ?>" onmouseover="swapMenu('#communityMenu')" onmouseout="swapMenuRestore()"><?php echo($this->getLabel("Community")); ?></a></li>
			<li id="software"><a id="softwareA" href="/software/" title="<?php echo($this->getLabel("Software")); ?>" onmouseover="swapMenu('#softwareMenu')" onmouseout="swapMenuRestore()"><?php echo($this->getLabel("Software")); ?></a> <a id="useNow" href="/flxer5/" onclick="popupwindow('800','600','/flxer5/','FLxER5','no','yes');return false;">USE NOW</a></li>
			<li id="project"><a href="/project/" title="<?php echo($this->getLabel("Project")); ?>" onmouseover="swapMenu('#projectMenu')" onmouseout="swapMenuRestore()"><?php echo($this->getLabel("Project")); ?></a></li>
		</ul>
		<div id="rightMenu">
			<div id="search">
				<form action="/search/" id="cse-search-box-footer">
					<input type="hidden" name="cx" value="008270153029254647808:_czuhrjkjpk" />
					<input type="hidden" name="cof" value="FORID:10" />
					<input type="hidden" name="ie" value="UTF-8" />
					<input type="text"   name="q" size="31" class="textfieldsSearch left" value="<? echo($_GET['q']); ?>" />
					<input type="submit" name="sa" value="<?php echo($this->getLabel("Cerca")); ?>" class="pulsSearch left" />
				</form>
				<script type="text/javascript" src="https://www.google.com/cse/brand?form=cse-search-box-footer&amp;lang=<? echo($this->initObj['area']); ?>"></script>
			</div>
			<div id="lang">
				<ul id="nav">
<? echo($langUl); ?>
				</ul>
			</div>
			<br class="myClear" />
		</div>
		<br class="myClear" />
		<div id="subMainMenu">
			<div id="projectMenu" style="<? echo((strpos($_SERVER['PHP_SELF'],"/project/")!==false ? " display:block;":"display:none;")); ?>" onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()">
				<ul>			
					<? echo($this->community->writeMagazineLi("project","project")); ?>
					<li class="left"><a href="/software/donate" onmouseout="swapMenuRestore()" onmouseover="stopSwapMenuRestore()"><?php echo($this->getLabel("Donazioni")); ?></a></li>
				</ul>
				<br class="myClear" />
<!--[if lte IE 6]>
				<br class="myClear" />
<![endif]-->
			</div>		
			<div id="softwareMenu" style="<? echo((strpos($_SERVER['PHP_SELF'],"/software/")!==false ? " display:block;":"display:none;")); ?>" onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()">
				<ul>
					<? echo($this->community->writeMagazineLi("software","software")); ?>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/forum/flxer-faq/">FAQ</a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/forum/flxer-userguide/"><?php echo($this->getLabel("Guida")); ?></a></li>
				</ul>
				<br class="myClear" />
<!--[if lte IE 6]>
				<br class="myClear" />
<![endif]-->
			</div>		
			<div id="communityMenu" style="<? echo(( (strpos($_SERVER['PHP_SELF'],"/software/")===false && strpos($_SERVER['PHP_SELF'],"/project/")===false)? " display:block;":"display:none;")); ?>" onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()">
				<ul>			
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/performers/"><?php echo($this->getLabel("Utenti")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/footage/"><?php echo($this->getLabel("Posts")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/playlists/"><?php echo($this->getLabel("Playlists")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/performances/"><?php echo($this->getLabel("Performances")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/events/"><?php echo($this->getLabel("Eventi")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/tvshows/"><?php echo($this->getLabel("TV Shows")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/iflxerfiles/"><?php echo($this->getLabel("iFlxer files")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/iflxerplaylists/"><?php echo($this->getLabel("iFlxer playlists")); ?></a></li>
					<li class="left"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/forum/"><?php echo($this->getLabel("Forum")); ?></a></li>
					<li class="right"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/controlpanel/<? echo((isset($_SESSION['user_auth']) ? "" : "login/")) ?>" onclick="$('#menuUser').toggle();$('#menuNew').hide();return false;"><? echo((isset($_SESSION['user_auth']) ? $this->getLabel("Account") : $this->getLabel("Login"))) ?></a></li>
<? if(isset($_SESSION['user_auth'])){
		//if ($this->objUser){
		//	$obj=$this->objUser;
		//} else {
			$sql=$this->community->getSqlUserDett($_SESSION["user_id"]);
			$res=$this->community->getUsersObj($sql,array("full_info"=>true,"img_user_size"=>"tiny","img_user"=>true));
			$obj=$res[0];
		//}
?>
<? }else{ ?>
					<li class="right"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="/controlpanel/new/"><?php echo($this->getLabel("Registrati")); ?></a></li>
<? } ?>
<?
if(isset($_SESSION['user_auth'])){ 
	echo("				<li class=\"right\" style=\"position:relative\"><a href=\"/".$_SESSION['user_name']."/notifications/\" title=\"".$this->getLabel("Visualizza le notifiche")."\"> ".$this->getLabel("Notifiche")."<span class=\"jewelCount\">".$obj['notifiche']."</span></a></li>\n");		
}
?>
					<li class="right"><a onmouseover="stopSwapMenuRestore()" onmouseout="swapMenuRestore()" href="#" onclick="$('#menuNew').toggle();$('#menuUser').hide();moveMenu(this);return false;"><?php echo($this->getLabel("Nuovo contenuto")); ?></a></li>
				</ul>
				<br class="myClear" />
<!--[if lte IE 6]>
				<br class="myClear" />
<![endif]-->
			</div>		
		</div>		
		<div id="menuNew">
			<script type="text/javascript">
			document.getElementById('menuNew').style.display='none';
			document.getElementById('menuNew').style.position='absolute';
			</script>
			<ul>			
				<li><a href="/controlpanel/?edit=performances&amp;perfid=0"><?php echo($this->getLabel("Nuova performance")); ?></a></li>
				<li><a href="/controlpanel/?edit=footage&amp;footageid=0"><?php echo($this->getLabel("Nuovo post")); ?></a></li>
				<li><a href="/controlpanel/?edit=events&amp;eventid=0"><?php echo($this->getLabel("Nuovo evento")); ?></a></li>
				<li><a href="/controlpanel/?edit=tvshows&amp;tvshowid=0"><?php echo($this->getLabel("Nuovo TV Show")); ?></a></li>
				<li><a href="/controlpanel/?edit=postiflxer&amp;postiflxerid=0"><?php echo($this->getLabel("Nuovo iFLxER file")); ?></a></li>
				<li><a href="/controlpanel/?edit=forum&amp;forumid=0"><?php echo($this->getLabel("Nuova discussione")); ?></a></li>
			</ul>			
		</div>		
		<div id="menuUser">
			<script type="text/javascript">
			document.getElementById('menuUser').style.display='none';
			document.getElementById('menuUser').style.position='absolute';
			</script>
<? include_once($this->initObj['site_path']."_php/form/login/login.php"); ?>
		</div>		
	</div>
</div>
<div class="gray">
	<? include_once($this->initObj['site_path']."_php/modelli/".$this->modello); ?>
	<br class="myClear"/>
</div>
<div class="black">
	<div class="cnt">
		<div class="col_0s"><img alt="FLxER.NET" src="/_images/logo_piede.gif"/></div>
		<div class="col_1s">
			<div class="left"><strong>FLxER.net</strong> | <?php echo($this->getLabel("un progetto di Flyer communication")); ?><br/><a title="<?php echo($this->getLabel("Scrivi a FLxER.net")); ?>" href="mailto:info@flxer.net">info@flxer.net</a> // P.IVA: 06589171005</div>
			<div class="right" style="text-align:right;">NO &copy; <? echo(date("Y")); ?><br /><a href="/disclaimers/privacy/"><?php echo($this->getLabel("Privacy")); ?></a> // <a href="/disclaimers/terms/"><?php echo($this->getLabel("Termini e condizioni")); ?></a> // <a href="/disclaimers/guidelines/"><?php echo($this->getLabel("Linee guida")); ?></a></div>
            <br class="myClear"/>
        </div>
		<br class="myClear"/>
		<!--[if lte IE 6]>
		<br class="myClear" />
		<![endif]-->
	</div>
</div>
<div id="top">
	<div class="cnt">
		<ul id="corporate">
			<li><a title="<?php echo($this->getLabel("flyer")); ?>" target="_blank" href="http://www.flyer.it"><span class="bulletSmall">&nbsp;</span> FLYER</a></li>
			<li><a title="<?php echo($this->getLabel("flyerwp")); ?>" target="_blank" href="http://wp.flyer.it"><span class="bulletSmall">&nbsp;</span> FLYER WP</a></li>
			<li class="corpSel"><span class="bulletSmall">&nbsp;</span>FLxER</li>				
			<li><a title="<?php echo($this->getLabel("vjtv")); ?>" target="_blank" href="http://www.vjtelevision.com/"><span class="bulletSmall">&nbsp;</span> VJ TELEVISION</a></li>
			<li><a title="LPM Live Performers Meeting" target="_blank" href="http://www.liveperformersmeeting.net/"><span class="bulletSmall">&nbsp;</span> LPM</a></li>				
			<li><a title="<?php echo($this->getLabel("learning")); ?>" target="_blank" href="http://learning.flyer.it/"><span class="bulletSmall">&nbsp;</span> LEARNING</a></li>
			<li><a title="<?php echo($this->getLabel("shockart")); ?>" target="_blank" href="http://shockart.net/"><span class="bulletSmall">&nbsp;</span> SHOCKART</a></li>
			<li><a title="<?php echo($this->getLabel("wam")); ?>" target="_blank" href="http://wam.flyer.it"><span class="bulletSmall">&nbsp;</span> WAM</a></li>
		</ul>
	</div>
</div>
<?	if(isset($_GET['reply']) && $this->u_name && $this->u_id){ ?>
<script type="text/javascript">
$(document).ready(function(){
	sendDelay();
});
	function sendDelay() {
		c = setTimeout(openSendMsgPanel2,500)
	}
	function openSendMsgPanel2() {
		clearTimeout(c);
		openSendMsgPanel('<? echo($this->u_id) ?>','sendMsg','<? echo($this->getLabel("Invia un messaggio a")) ?> <? echo($this->u_name) ?>','');
	}
</script>
<?	} ?>
<div id="msgBox" style="display:none;" title="FLxER">&nbsp;</div>
</body>
</html>
