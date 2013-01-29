// JavaScript Document
function cancellaNotifica(idname,id){
	$("#"+idname).remove();
	$.ajax({
		url: "/_php/ajax/notificationAct.php?act=del&id="+id,
		type: 'GET',
		success: function(data) {
		}
	});
}
function aggiornaStatoNotifica(idname,id){
	$("#"+idname).removeClass("notificaUnread");
	$("#"+idname).addClass("notificaRead");
	//new Ajax.Request("/_php/ajax/notificationAct.php?act=change&id="+id, {method: 'get',onSuccess: function(transport) {}}); 	
	$.ajax({
		url: "/_php/ajax/notificationAct.php?act=change&id="+id,
		type: 'GET',
		success: function(data) {
		}
	});
}


/* questi vanno tolti da qui e da default_function e messi in _script */
function trim(str) {
	var res="";
	if(str){
		if(str.length>0){
			res=ltrim(rtrim(str, "\\s"), "\\s");
		}
	}
	return res;
}
 
function ltrim(str, chars) {
//	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
