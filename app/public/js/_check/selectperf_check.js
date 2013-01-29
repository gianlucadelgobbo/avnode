	function check_selectperf(){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		
		tmpEsito=one_is_checked('selectperf');	
		if(tmpEsito!=1){
			esito=false;
			firstError='selectperf';
			tmpErrorMsg=eval('label_ctr_evento_new_one_is_selected_2.code'+(tmpEsito*-1));
			showErrors($("[name='selectperf']"),tmpErrorMsg);
		}

			
		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}		
		return esito;
	}		
		