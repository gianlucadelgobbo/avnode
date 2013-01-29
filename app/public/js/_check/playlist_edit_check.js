	function validate_playlist_edit(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		tmpElem=$('#title');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="title";
			tmpErrorMsg=eval('label_ctr_playlist_edit_textLenght_1.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}			
		if(!esito && firstError!=false){
			window.location.hash="#"+firstError;
		}
		return esito;
	}
		
	function deleteFootageFromPlaylist(elem,footageId,playlistId){
		//playlistEdit.php
		if(window.confirm("are you sure to remove this footage from your playlist?")){
			var url="/_php/ajax/playlistEdit.php?act=removeFootage&id_playlist="+playlistId+"&id_footage="+footageId;
			$.ajax({
				url: url,
				type: 'GET',
				success: function(data) {
				}
			});
			//new Ajax.Request(url, {method: 'get',onSuccess: function(transport) {  }}); 	
			//var p=elem.ancestors();
			//var c=p[1];
			$(elem).parent().parent().parent().remove();
		}
		return false;
	}
	
	function deletePlaylist(playlistId){
		if(window.confirm("are you sure to delete this Playlist?")){
			return true;
		}else{
			return false;
		}
	}
		
