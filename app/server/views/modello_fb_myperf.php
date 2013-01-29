<?php
@header ('Cache-Control: private, pre-check=0, post-check=0, max-age=1080');
@header ('Expires: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() + 1080)); //60*3
@header ('Last-Modified: ' . gmstrftime("%a, %d %b %Y %H:%M:%S GMT", time() - 20)); //60*60*3
?>
<? if (isset($this->inc)) include_once($this->inc); ?>
<!DOCTYPE HTML>
<html lang="<? echo($this->area); ?>">
<head>
<title><? echo(($this->title ? $this->title." | " : "")); ?> FLxER</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="<? echo($this->area); ?>" />
<meta name="author" content="FLYER COMMUNICATION, Gianluca Del Gobbo, Flavio Distefano" />
<meta name="robots" content="all" />
<meta name="keywords" content="<?php echo($this->getLabel("meta-keywords")); ?>" />
<meta name="description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<script type="text/javascript" src="/facebook/jquery.1.3.2.min.js" charset="utf-8"></script>
<script type="text/javascript" src="/_script/_lang/<?php echo($this->area); ?>.js"></script>
<script type="text/javascript" src="/_script/fpVariables.js"></script>
<script type="text/javascript" src="/_script/fpManager.js"></script>
<script type="text/javascript" src="/_script/fpCheck.js"></script>
<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->headStr)) echo($this->headStr); ?>
<link href="/facebook/style.css" rel="stylesheet" type="text/css" />
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
  _gaq.push(['_setAccount', 'UA-8844617-13']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>
<body>
<div class="cntLarge">
	<div id="header">
		<h2><a target="_blank" href="https://flxer.net/" title="FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE"><img src="/_images/logoFLxER.gif" alt="FLxER - PERFORMING VIDEO NETWORK AND SOFTWARE" /></a></h2>
		<ul class="menu">
			<li><a href="/facebook/?show=1"><? echo($this->getLabel("Mostra")); ?></a></li>
			<li><a href="/facebook/?invite=1"><? echo($this->getLabel("Invita")); ?></a></li>
			<li><a href="/facebook/"><? echo($this->getLabel("Pannello di controllo")); ?></a></li>
		</ul>
		<br class="myClear" />
	</div>
	<div>
<? echo($this->outStr); ?>
	</div>
</div>
</body>
</html>

