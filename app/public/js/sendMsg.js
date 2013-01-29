var sendMsgTit;

function openFriendsPanel(idDest,divDest){
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/addToFriends.php?id_sogg="+idDest,"title":"Friend","width":680,"height":250});		
}

function openSendMsgPanel(idDest,param,tit,cnt){
	sendMsgTit=tit;
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/sendMsg.php?id_sogg="+idDest+"&param="+param+"&cnt="+cnt+"&tit="+tit,"title":tit,"width":695,"height":260});			
	//openWindow({mode:'ajax',url:"/_php/ajax/sendMsg.php?id_sogg="+idDest+"&param="+param+"&cnt="+cnt+"&tit="+tit},{width:600,okLabel:'close'});
}

function sendMessageAct(myForm){
	param="&msg=" + encodeURI( myForm.yourMessage.value );
	param+="&param=" + encodeURI( myForm.param.value );
	param+="&invio=1";
	if(document.getElementById("nome2")){
		param+="&nome2=" + encodeURI( document.getElementById("nome2").value );		
	}
	if(document.getElementById("email2")){
		param+="&email2=" + encodeURI( document.getElementById("email2").value );		
	}
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/sendMsg.php?id_sogg="+myForm.dest.value+param,"title":sendMsgTit,"width":680,"height":380});
}
