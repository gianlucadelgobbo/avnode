<?php
@header ('Cache-Control: private, pre-check=0, post-check=0, max-age=1080');
@header ('Expires: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() + 1080)); //60*3
@header ('Last-Modified: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() - 20)); //60*60*3
?>
<? if (isset($this->inc)) include_once($this->inc); ?>
<!DOCTYPE HTML>
<html lang="<? echo($this->area); ?>">
<head>
<title><? echo(($this->title ? $this->title." | " : "")); ?> LPM Gallery</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="FLYER COMMUNICATION, Gianluca Del Gobbo, Flavio Distefano" />
<meta name="robots" content="all" />
<meta name="keywords" content="<?php echo($this->getLabel("meta-keywords")); ?>" />
<meta name="description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<script type="text/javascript" src="/_script/_lang/<?php echo($this->area); ?>.js"></script>
<script type="text/javascript" src="/_script/fpVariables.js"></script>
<script type="text/javascript" src="/_script/fpManager.js"></script>
<script type="text/javascript" src="/_script/fpCheck.js"></script>

<link type="text/css" href="/_script/jquery/css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="/_script/jquery/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/_script/jquery/js/jquery-ui-1.8.17.custom.min.js"></script>

	<script type="text/javascript" src="/_script/galleryEdit.js"></script>
	<script type="text/javascript" src="/_script/uploader/fileuploader.js"></script>

	<link href="/_script/uploader/fileuploader.css" rel="stylesheet" type="text/css" />


<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->headStr)) echo($this->headStr); ?>
<script type="text/javascript">
$(document).ready(function() {
	loadGalleries();
});
var index = 0;
var gall = [];
function tagUsers(id_media, id_sogg, x, y) {
	new Ajax.Request('/_php/ajax/tagUsers.php?act=add&id_media='+id_media+'&id_sogg='+id_sogg+'&x='+x+'&y='+y+'&url='+document.location.href, { onSuccess: function(transport) {
		$('taggedUsers').show();
		$('taggedUsersList').innerHTML=transport.responseText;
	} })
}
function loadGalleries() {
	if (index<gall.length) loadGalleriesAct();
}
function loadGalleriesAct() {
	
	jQuery.ajax({
		url: "gallEvent.php",
		type: "GET",
		data: "id="+gall[index]+"&embed=<? echo($_GET['embed']); ?>",
		success: function(data){
			jQuery('#cnt'+gall[index]).html(data);
			index++;
			loadGalleriesAct();
		}
	});
}
-->
</script>
<link href="/facebookLPMgallery/style.css" rel="stylesheet" type="text/css" />
<?php
function is_facebook(){
	if(!(stristr($_SERVER["HTTP_USER_AGENT"],"facebook") === FALSE)) return true;
}
if(is_facebook()){?>
<meta property="og:title" content="<? echo(($this->title ? $this->title." " : "")); ?>LPM Gallery" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo("https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>" />
<meta property="og:image" content="<?php echo("https://".$_SERVER['HTTP_HOST']); ?>/_images/FBicon.jpg" />
<meta property="og:site_name" content="LPM Gallery" />
<meta property="og:description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<meta property="fb:admins" content="717872862" />
<meta property="fb:app_id" content="<? echo($this->appId); ?>" />
<meta property="og:locale" content="<? echo($this->locale[$this->area]); ?>" />
<? } ?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8844617-12']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
<div<? echo($_GET['embed']=="fbgalltab" ? "" : " class=\"cntLarge\" "); ?>>
	<div id="header" class="cntGallMenu">
		<div class="left"><a href="http://www.liveperformersmeeting.net" target="_blank"><img src="/facebookLPMgallery/_images/gallerylogo.jpg" alt="LPM - Live Performers Meeting" /></a></div>
		<div class="right"><a href="http://www.liveperformersmeeting.net" target="_blank"><img src="/facebookLPMgallery/_images/subTit.gif" alt="LPM - Live Performers Meeting" /></a></div>
		<br class="myClear" />
	</div>
	<ul class="menu" id="gallMain">
		<li class="left"><? echo($this->data); ?></li>
		<? if($_GET['embed']!="fbgalltab") { ?>
		<li class="right"><a href="/facebookLPMgallery/?show=1<? echo($_GET['embed'] ? "&amp;embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Mostra")); ?></a></li>
		<? } ?>
		<li class="right"><a href="/facebookLPMgallery/?invite=1<? echo($_GET['embed'] ? "&amp;embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Invita")); ?></a></li>
		<? if($_GET['embed']!="fbgalltab") { ?>
		<li class="right"><a href="/facebookLPMgallery/<? echo($_GET['embed'] ? "?embed=".$_GET['embed'] : ""); ?>"><? echo($this->getLabel("Pannello di controllo")); ?></a></li>
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
</body>
</html>

