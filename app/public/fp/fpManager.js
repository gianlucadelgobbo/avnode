function flashStringWriter(trgt,w,h,swfCurrPage,wmode) { //v3.0
	var hasRightVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
	if(hasRightVersion) {  // if we've detected an acceptable version
		swfCurrPage+='&r='+Math.floor(Math.random()*5000000);
		var swfStr=AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0',
			'width',w,
			'height',h,
			'src',swfCurrPage+"&isEmbed=false",
			'quality','high',
			'pluginspage','http://www.macromedia.com/go/getflashplayer',
			'movie',swfCurrPage+"&isEmbed=false",
			'id',trgt+"swf",
			'name',trgt+"swf",
			'wmode',wmode,
			'allowFullScreen','true',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'devicefont', 'false',
			'bgcolor', '#FFFFFF',
			'menu', 'true',
			'allowScriptAccess','always'
		);
		return swfStr;
	} else {  // flash is too old or we can't detect the plugin
		return "<div class=\"flashAlt\">"+flashErrMess[currentLang]+"<\/div>";
	}
}
function flashWriter(trgt,w,h,swfCurrPage,wmode) { //v3.0
	document.getElementById(trgt).style.display = 'block';
	document.getElementById(trgt).innerHTML=flashStringWriter(trgt,w,h,swfCurrPage,wmode);
}
function apriEmbed(trgt){
	if (navigator.appName.indexOf("Microsoft") != -1) {
		var tmp = window[trgt];
	} else {
		var tmp = document[trgt];
	}
	if (tmp) {
		tmp.apriEmbed('apriEmbed');
	} else {
		alert('error');
	}
}
function setContentLoader(trgt,w,h,cnt,wmode){
	if (navigator.appName.indexOf("Microsoft") != -1) {
		var tmp = window[trgt];
	} else {
		var tmp = document[trgt];
	}
	if (tmp) {
		tmp.avviaJs(cnt);
	} else {
		flashWriter(trgt,w,h,"/_fp/flxerPlayer.swf?cnt="+cnt,wmode);
	}
}
function caricaFlashAvvio() {
	for (var i=0;i<flashToLoad.length;i++){
		flashWriter(flashToLoad[i][0],flashToLoad[i][1],flashToLoad[i][2],flashToLoad[i][3]+sitePath+flashToLoad[i][4],flashToLoad[i][5]);
		window[flashToLoad[i][0]+"swf"] = document.getElementById(flashToLoad[i][0]+"swf");
	}
}

function showFlash() {
	for (i=0;i<flashToLoad.length;i++){
		document.getElementById(flashToLoad[i][0]).style.display = "block";
	}
}
function hideFlash() {
	for (i=0;i<flashToLoad.length;i++){
		document.getElementById(flashToLoad[i][0]).style.display = "none";
	}
}