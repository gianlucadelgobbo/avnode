var ha_votato=false;

function initRateAct(){
	if(document.getElementById("rateBox") && !isNaN(rate_id)){
		loadRateStars();
	}
}

function loadRateStars(){
	$.ajax({
		url: "/_php/ajax/rateAct.php?id="+rate_id+"&tab="+rate_rel,
		type: 'GET',
		success: function(data) {
			$("#rateBox").html(data);
		}
	});
}

function rateClick(url,n){
	ha_votato=true;
	$.ajax({
		url: url+n,
		type: 'GET',
		success: function(data) {
			$("#rateBox").html(data);
		}
	});
}
function rateRestoreDefault(){
	if(!ha_votato){		
		timerID=setInterval(rateRestoreDefaultAct, 500);
	}
}
function rateRestoreDefaultAct(){
	clearInterval(timerID);
	for (a in rate_default_values){
		MM_swapImage('stella'+a,'','/_images/stellina'+rate_default_values[a]+'.gif',1);
   	}
}
function rateOver(n){
	clearInterval(timerID);	
	if(!ha_votato){	
		for (var a=0;a<5;a++) {
			if (a<n+1) {
				MM_swapImage('stella'+a,'','/_images/stellina100.gif',1);
			} else {
				MM_swapImage('stella'+a,'','/_images/stellina0.gif',1);
			}
		}
	}
}

function showRateErr(msg){
//	hideFlash();
	//var err_msg="<div><div class=\"popUp\"><div class=\"col1Full\"><div class=\"cntPadd\"><h3>"+label_rateJs.code0+"</h3><div class=\"cntCol\"><div id=\"boxError\">";
	//err_msg+="<div class=\"labelBig\">"+msg+"</div>";
	//err_msg+="<strong>"+label_rateJs.code1+"</strong><ul><li><a href=\"/people/register.php\">"+label_rateJs.code2+"</a></li></ul><strong>"+label_rateJs.code3+"</strong>";
	//err_msg+="</div></div></div></div></div></div>";
	var answer = confirm(msg+"\n\n"+label_rateJs.code2+"?");
	if (answer){
		window.location = "/controlpanel/new/";
	}
	//alert(label_rateJs.code2);
	//openShadowboxWin({"mode":"html"},{"cnt":err_msg,"title":"Rate","width":680,"height":190});
	//openWindow({mode:'string',str:err_msg},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});
}
function showRateDejavouErr(msg){
//	hideFlash();
	//var err_msg="<div><div class=\"popUp\"><div class=\"col1Full\"><div class=\"cntPadd\"><h3>"+label_rateJs.code0+"</h3><div class=\"cntCol\"><div id=\"boxError\">";
	//err_msg+="<div class=\"labelBig\">"+msg+"</div>";
	//err_msg+="</div></div></div></div></div></div>";
	alert(msg);
	//openShadowboxWin({"mode":"html"},{"cnt":err_msg,"title":"Rate","width":680,"height":190});
	//openWindow({mode:'string',str:err_msg},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});	
}
