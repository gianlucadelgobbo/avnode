<? if (isset($this->inc)) include_once($this->inc); ?>
<? if(isset($this->formAct) && isset($this->formBtn) && isset($this->formSave) && isset($this->formLoadData) && isset($this->formEdit))
	include_once($this->formAct); ?>
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
<link type="text/css" href="/_script/jquery/css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="/_script/jquery/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/_script/jquery/js/jquery-ui-1.8.17.custom.min.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/_lang/<?php echo($this->area); ?>.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpVariables.js"></script>
<script language="javascript1.1" type="text/javascript" src="/_script/fpManager.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/fpCheck.js"></script>
<script language="javascript"    type="text/javascript" src="/_script/script.js?v=1.2"></script>
<!-- socialize.js script should only be included once -->
<? if($_SERVER['PHP_SELF']=="/participate/new/index.php" || $_SERVER['PHP_SELF']=="/participate/new/gigya.php"){ ?>
<script type="text/javascript" src="http://cdn.gigya.com/js/socialize.js?apiKey=2_B2v2RgZOGGx4SxCW1frvgSeM5PW8MWRLqnPNwXeDZ3RP0zZuI78lJccYf2-p453s"></script>
<script type="text/javascript">
var conf = {APIKey: '2_B2v2RgZOGGx4SxCW1frvgSeM5PW8MWRLqnPNwXeDZ3RP0zZuI78lJccYf2-p453s'};
</script>
<? } ?>
<? if (isset($this->head)) include_once($this->head); ?>
<? if (isset($this->headStr)) echo($this->headStr); ?>

<link href="/_css/style_subscription.css" rel="stylesheet" type="text/css" />
</head>
<body id="bella">
<div class="cnt">
	<div id="headerCnt">
		<div id="header">
			<h2><a href="http://www.liveperformersmeeting.net/" title="LPM 2012 - LIVE PERFORMERS MEETING" id="logoIE"><img src="https://flxer.net/lpm/_images/logo.png" alt="LPM 2012 - LIVE PERFORMERS MEETING" /></a></h2>
			<h3 id="subTitIE"><img src="https://flxer.net/lpm/_images/subTit.png" alt="LIVE VIDEO PERFORMERS, VISUAL ARTISTS AND VJ MEETING" /></h3>
		</div>
		<div id="menu">
			<h4 id="dataIE">May 31<sup>th</sup> June 3<sup>rd</sup> Rome, Italy</h4>
			<div id="lingue">
				<ul>
					<li><? if($this->area=="it"){ ?>it<? } else { ?><a href="https://it.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home it">it</a><? } ?></li>
					<li><? if($this->area=="en"){ ?>en<? } else { ?><a href="https://flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home en">en</a><? } ?></li>
					<li><? if($this->area=="fr"){ ?>fr<? } else { ?><a href="https://fr.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home fr">fr</a><? } ?></li>
					<li><? if($this->area=="es"){ ?>es<? } else { ?><a href="https://es.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home es">es</a><? } ?></li>
					<li><? if($this->area=="pl"){ ?>pl<? } else { ?><a href="https://pl.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home pl">pl</a><? } ?></li>
					<li><? if($this->area=="ru"){ ?>ru<? } else { ?><a href="https://ru.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home ru">ru</a><? } ?></li>
					<li><? if($this->area=="hu"){ ?>hu<? } else { ?><a href="https://hu.flxer.net<?php echo($_SERVER['REQUEST_URI']); ?>" title="home hu">hu</a><? } ?></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<? include_once($this->initObj['site_path']."_php/modelli/".$this->modello); ?>
<br class="myClear"/>
<div class="cnt" style="font-size: 0.7em;background-color: #FFFFFF;">
	<div id="footer">
		<div id="mainfooter">
			<div class="col1"><div class="copy">NO © 2012 liveperformersmeeting | <a href="mailto:subscriptions@liveperformersmeeting.net" title="Write a messagge to LPM team">subscriptions@liveperformersmeeting.net</a></div></div>
			<div class="col2R"><div class="flyer">
	
				<a href="http://www.flyer.it/" target="_blank" title="This website is made by Flyer Communication" onmouseover="MM_swapImage('Image2','','https://flxer.net/lpm/_images/logo_flyer_f2.gif',1)" onmouseout="MM_swapImgRestore()"><img src="https://flxer.net/lpm/_images/logo_flyer.gif" alt="This website is made by Flyer Communication" name="Image2" id="Image2" /></a></div></div>
		</div>
	</div>
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
	<br class="myClear"/>
</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-8844617-6']);
  _gaq.push(['_trackPageview','/LPMSUBSCRIBE/']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<div id="msgBox" style="display:none;" title="LPM">&nbsp;</div>
</body>
</html>

