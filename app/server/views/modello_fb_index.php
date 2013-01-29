<?php
@header ('Cache-Control: private, pre-check=0, post-check=0, max-age=1080');
@header ('Expires: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() + 1080)); //60*3
@header ('Last-Modified: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() - 20)); //60*60*3
?>

<? if (isset($this->inc)) include_once($this->inc); ?>
<!DOCTYPE HTML>
<html lang="<? echo($this->area); ?>">
<head>
<title><? echo(($this->title ? $this->title." | " : "")); ?> LPM Index</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="<? echo($this->area); ?>" />
<meta name="author" content="FLYER COMMUNICATION, Gianluca Del Gobbo, Flavio Distefano" />
<meta name="copyright" content="(c)2010 Flyer Communication" />
<meta name="robots" content="all" />
<meta name="distribution" content="public" />
<meta name="keywords" content="<?php echo($this->getLabel("meta-keywords")); ?>" />
<meta name="description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<script language="javascript"    type="text/javascript" src="/facebookLPMgallery/lib/jqtouch/jquery.1.3.2.min.js" charset="utf-8"></script>
<script language="javascript"    type="text/javascript" src="/_script/lang_<?php echo($this->area); ?>.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpVariables.js"></script>
<script language="javascript1.1" type="text/javascript" src="/_script/fpManager.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpCheck.js"></script>


<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->headStr)) echo($this->headStr); ?>
<link href="/_script/shadowbox/shadowbox.css" rel="stylesheet" type="text/css" />
<script language="javascript"    type="text/javascript" src="/_script/shadowbox/shadowbox.js"></script>
<script type="text/javascript">
Shadowbox.init({
        language:   "<? echo($this->area); ?>",
        players:    ["img","flv","html","iframe"]
});
jQuery(document).ready(function() {

});

var pulsa="menu<? echo($this->event); ?>"; 
var evento="<? echo($this->event); ?>";

function showGallery(id,tit){
	var url="https://fb.flxer.net/facebookLPMindex/player.php?id="+id;
	var ajax = new Ajax();
	ajax.responseType = Ajax.FBML;
	ajax.requireLogin = true;
	ajax.ondone = function(data) {
		dialog = new Dialog().showChoice('<? echo($this->getLabel("Galleria")); ?>: '+tit, data, "Close",false);
		dialog.setStyle('width','860px');
		dialog.setStyle('height','666px');
		dialog.onconfirm = function() {
			dialog.hide();
		}
	}
	ajax.post(url);
}

function loadContent(id,pulsaNew,dest,param) {
	document.getElementById(dest).setInnerFBML(myLoader2);
	if (dest=="content") {
		url="https://fb.flxer.net/facebookLPMindex/eventDett.php?event="+id+param+"&col=1";
		document.getElementById(pulsa).setStyle("display", "none");
		evento = id;
		pulsa = pulsaNew;
		document.getElementById(pulsa).setStyle("display", "block");
	} else {
		url="https://fb.flxer.net/facebookLPMindex/listaDett.php?event="+id+param+"&col=1";
	}
	var ajax = new Ajax();
	ajax.responseType = Ajax.FBML;
	ajax.requireLogin = false;
	ajax.ondone = function(data) {
		document.getElementById(dest).setInnerFBML(data);
	}
	ajax.post(url);
}
function showChoice(url, title, ok, cancel) {
	// Set the default pop-up dialog values for those not supplied.
	if (title === undefined) { title = "Dialog"; }
	if (ok === undefined) { ok = "Okay"; }
	if (cancel === undefined) { cancel = "Cancel"; }
	ok = "<? echo($this->getLabel("Chiudi")) ?>";
	// Retrieve the dialog contents via AJAX, and display the dialog.
	var ajax = new Ajax();
	ajax.responseType = Ajax.FBML;
	ajax.requireLogin = true;
	ajax.ondone = function(data) {
		dialog = new Dialog().showChoice(title, data, ok,false);
		dialog.setStyle('width','860px');
		dialog.onconfirm = function() {
			dialog.hide();
		}
	}
	ajax.post(url);
}
function rateClick(id,voto){	
	no = "<? echo($this->getLabel("Chiudi")) ?>";
	ok = "<? echo($this->getLabel("Aggiungi")) ?>";
	title = "<? echo($this->getLabel("Aggiungi"))." LPM INDEX" ?>";
	data = rateAlert;
	dialog = new Dialog().showChoice(title, data, ok, no);
	dialog.setStyle('width','300px');
	dialog.setStyle('height','130px');
	dialog.onconfirm = function() {
		document.setLocation("http://apps.facebook.com/liveperformers/"); 
	}
	dialog.oncancel = function() {
		dialog.hide();
	}
}



//-->
</script>
<link href="/facebookLPMindex/style.css" rel="stylesheet" type="text/css" />
<meta property="og:title" content="<? echo(($this->title ? $this->title." " : "")); ?>LPM Index" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo("https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>" />
<meta property="og:image" content="<?php echo("https://".$_SERVER['HTTP_HOST']); ?>/_images/FBicon.jpg" />
<meta property="og:site_name" content="LPM Gallery" />
<meta property="og:description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<meta property="fb:admins" content="717872862" />
<meta property="fb:app_id" content="<? echo($this->appId); ?>" />
<meta property="og:locale" content="<? echo($this->locale[$this->area]); ?>" />
</head>
<body>
<div<? echo($_GET['embed']=="fbgalltab" ? "" : " class=\"cntLarge\" "); ?>>
	<div id="header" class="cntGallMenu">
		<div class="left"><a href="http://www.liveperformersmeeting.net" target="_blank"><img src="/facebookLPMindex/_images/logo.gif" alt="LPM - Live Performers Meeting" /></a></div>
		<div class="right"><a href="http://www.liveperformersmeeting.net" target="_blank"><img src="/facebookLPMindex/_images/subTit.gif" alt="LPM - Live Performers Meeting" /></a></div>
		<br class="myClear" />
	</div>
	<ul class="menu" id="gallMain">
		<li class="left"><? echo($this->data); ?></li>
		<? if($_GET['embed']!="fbgalltab") { ?>
		<li class="right"><a href="/facebookLPMindex/?show=1<? echo($_GET['embed'] ? "&embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Mostra")); ?></a></li>
		<? } ?>
		<li class="right"><a href="/facebookLPMindex/?invite=1<? echo($_GET['embed'] ? "&embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Invita")); ?></a></li>
		<? if($_GET['embed']!="fbgalltab") { ?>
		<li class="right"><a href="/facebookLPMindex/<? echo($_GET['embed'] ? "?embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Pannello di controllo")); ?></a></li>
		<? } ?>
	</ul>
	<br class="myClear" />
	<div>
<? echo($this->outStr); ?>
	</div>
	<div class="footer">
		<ul class="left">
			<!-- <li><a href="https://flxer.net" target="_blank">FLxER.net</a></li> -->
			<li><a href="http://www.liveperformersmeeting.net" target="_blank">Liveperformersmeeting.net</a></li>
			<? echo($this->nome_arte!="" ? "<li><a href=\"https://flxer.net/".$this->nome_utente."\" target=\"_blank\">".$this->getLabel("Visita")." ".$this->nome_arte." ".$this->getLabel("in")." FLxER.net</a></li>" : "") ?>
		</ul>
		<ul class="right">
			<li><a href="<? echo($this->linkFanPage); ?>" target="_blank">&quot;<? echo($this->appName); ?>&quot; Fan page</a></li>
			<!-- <li><a href="<? echo($this->linkApp); ?>" target="_top"><? echo($this->getLabel("Aggiungi")); ?> / <? echo($this->getLabel("Modifica")); ?> &quot;<? echo($this->appName); ?>&quot;</a></li> -->
		</ul>
	</div>
</div>
	<div id="fb-root"></div>
	<script type="text/javascript">
		window.fbAsyncInit = function() {
			FB.Canvas.setAutoResize();
		};
	  (function() {
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol +
		  '//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
  }());
	</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8844617-6']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>

