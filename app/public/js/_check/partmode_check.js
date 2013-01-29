// JavaScript Document
	var label_ctr_one_is_checked_0={"code0":"please select 1 option"};

	function check_partmode(){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		
			tmpEsito=one_is_checked('crew');	
			if(tmpEsito!=1){
				esito=false;
				firstError='crew';
				tmpErrorMsg=eval('label_ctr_evento_new_one_is_selected_2.code'+(tmpEsito*-1));
				showErrors($("[name='crew']"),tmpErrorMsg);
			}
			
			

		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}		
		return esito;
	}		
	