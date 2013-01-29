
function addPlaylist(id_post,iflxer){
	//hideFlash();
	//openWindow({mode:'ajax',url:"/_php/ajax/addToPlaylists.php?id="+id},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/addToPlaylists.php?id_post="+id_post+"&iflxer="+iflxer,"title":"Playlist","width":700,"height":670});	
}
function addPlaylistAct(id_post,id_playlist){
	//hideFlash();
	//openWindow({mode:'ajax',url:"/_php/ajax/addToPlaylists.php?id="+id},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/addToPlaylists.php?act=add&id_post="+id_post+"&id_playlist="+id_playlist,"title":"Playlist","width":700,"height":300});	
}
function addPlaylistActNew(id_post,tit,label,iflxer){
	//hideFlash();
	//openWindow({mode:'ajax',url:"/_php/ajax/addToPlaylists.php?id="+id},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});
	if(tit!=label){
		openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/addToPlaylists.php?act=addNew&id_post="+id_post+"&tit="+tit+"&iflxer="+iflxer,"title":"Playlist","width":700,"height":300});	
	}else{
		addClassAttribute($("#playlist_tit"),"errorMsgField");
	}
}

function addToFriend(id){
	//hideFlash();
	//openWindow({mode:'ajax',url:"/_php/ajax/addToFriends.php?id="+id},{width:(document.viewport.getWidth()-100),height:(document.viewport.getHeight()-100),okLabel:label_window_ok_btn, onOk:function(win){ showFlash(); return true; }});
	openShadowboxWin({"mode":"ajax"},{"url":"/_php/ajax/addToFriends.php?id="+id,"title":label_friend_js.amici,"width":700,"height":300});		
}
function emptyPlaylistTit(el,tit){
	if(el.value==tit)
		el.value="";
}

function playlistSelect(el,id){
	$("#selectedPlaylistTit").val(el.title);
	$("#selectedPlaylistId").val(id);
	$("#addToPlaylist").removeAttr('disabled');
	$("#playlist_tit").removeClass("errorMsgField");
}
