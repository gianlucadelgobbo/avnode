	function check_terms(){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
	
		tmpElem=document.getElementById('privacy');
		tmpEsito=one_is_checked('privacy');	
		if(tmpEsito==0){
			esito=false;
			firstError='label_privacy';
			tmpErrorMsg=eval('label_ctr_user_edit_is_checked_0.code'+(tmpEsito*-1));
			showErrors($("[name='privacy']"),tmpErrorMsg);
		}


		if(!esito && firstError!=false){
			window.location.hash="#"+firstError;
		}		
		return esito;
	}		
	