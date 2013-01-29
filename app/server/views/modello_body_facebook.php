<? if (isset($this->inc)) include_once($this->inc); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="<? echo($this->area); ?>" xml:lang="<? echo($this->area); ?>" xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><? echo(($this->title ? $this->title." | " : "")); ?> FLxER</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="<? echo($this->area); ?>" />
<meta name="author" content="FLYER COMMUNICATION, Gianluca Del Gobbo, Flavio Distefano" />
<meta name="copyright" content="(c)2012 Flyer Communication" />
<meta name="robots" content="all" />
<meta name="distribution" content="public" />
<meta name="keywords" content="<?php echo($this->getLabel("meta-keywords")); ?>" />
<meta name="description" content="<?php echo(($this->community->description ? $this->community->makeAttributeShortText($this->community->description, 150) : $this->getLabel("meta-description"))); ?>" />
<script language="javascript"    type="text/javascript" src="/_script/_lang/<?php echo($this->area); ?>.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpVariables.js"></script>
<script language="javascript1.1" type="text/javascript" src="/_script/fpManager.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpCheck.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/script.js?v=1.2"></script>
<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->headStr)) echo($this->headStr); ?>
<link href="/facebook/style.css" rel="stylesheet" type="text/css" />

</head>
<body id="Canvas">
<div class="cnt">
	<h2><a href="/" target="_blank" title="My performances"><img src="/_images/logoFLxER.gif" alt="My performances" /></a></h2>		
	<div class="menu">
		<ul>
			<li><a href="?invite=1"><?php echo($this->getLabel("Invita")); ?></a></li>
			<li><a href="?show=1"><?php echo($this->getLabel("Mostra")); ?></a></li>
			<li><a href="?preferences=1"><?php echo($this->getLabel("Pannello di controllo")); ?></a></li>
		</ul>
	</div>
	<br class="myClear"/>
	<div class="gFFFFFF mb10">
<? echo($this->outStr); ?>
	</div>
	<div class="black">
		<div class="col_0s"><img alt="My performances" src="http://dev.vjtelevision.com/_images/logo_piede.gif"/></div>
		<div class="col_1s">
			<div class="left"><strong>FLxER.net</strong> | a Flyer communication project<br /><a href="mailto:info@flxer.net" title="Write to FLxER.net">info@flxer.net</a> // P.IVA: 06589171005</div>
			<div style="text-align: right;" class="right">NO &copy; 2012<br /><a href="https://flxer.net/disclaimers/privacy">Privacy</a> // <a href="https://flxer.net/disclaimers/terms">Terms &amp; conditions</a></div>
			<br class="myClear" />
		</div>
		<br class="myClear"/>
	</div>
	<ul id="corporate">
		<li><a target="_blank" href="http://www.flyer.it/" 					title="Flyer communication: new media agency"><span class="bulletSmall">&nbsp;</span> FLYER</a></li>
		<li><a target="_blank" href="https://flxer.net/" 				title="FLxER: Live visuals community and software"><span class="bulletSmall">&nbsp;</span> FLxER</a></li>				
		<li class="corpSel"><span class="bulletSmall">&nbsp;</span> My performances</li>				
		<li><a target="_blank" href="http://www.liveperformersmeeting.net/" title="LPM: Live Performers Meeting"><span class="bulletSmall">&nbsp;</span> LPM</a></li>				
		<li><a target="_blank" href="http://www.shockart.net/" 				title="Shockart: web art project"><span class="bulletSmall">&nbsp;</span> SHOCKART</a></li>
		<li><a target="_blank" href="http://wam.flyer.it/" 					title="WAM: Web Art Mouseum"><span class="bulletSmall">&nbsp;</span> WAM</a></li>
	</ul>
	<br class="myClear" />
	<div id="footer">
		<ul class="left">
			<li><a href="http://www.vjtelevision.com" target="_blank">Vjtelevision.com</a></li>
		</ul>
		<ul class="right">
			<li class="right"><a href="http://apps.facebook.com/vj-television/">Add / Edit &quot;LPM FB app&quot;</a></li>
			<li class="right"><a href="http://www.facebook.com/vjtelevision/">&quot;My performances FB app&quot; Fan page</a></li>
		</ul>
		<br class="myClear" />
	</div>
</div>
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

