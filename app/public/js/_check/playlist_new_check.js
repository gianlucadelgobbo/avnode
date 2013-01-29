	
	function check_playlist_new(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		tmpEsito = $$('.qq-upload-file').length
		if(!tmpEsito){
			tmpElem=document.getElementById('file-uploader');
			esito=false;
			firstError="file-uploader";
			tmpErrorMsg=eval('label_playlist_new.code0');
			showError(tmpElem,'msgErrorCnt_file-uploader',tmpErrorMsg);
		} else {
			tmpElem=document.getElementById('found');
			tmpEsito = document.getElementsByName('lib[]').length;
			if(tmpEsito<4){
				esito=false;
				firstError="found";
				tmpErrorMsg=eval('label_playlist_new.code1');
				showError(tmpElem,'msgErrorCnt_found',tmpErrorMsg);
			}
		}

		
		if(!esito&&firstError!=false){
			window.location.hash="#label_"+firstError;
		}
		return esito;
	}
