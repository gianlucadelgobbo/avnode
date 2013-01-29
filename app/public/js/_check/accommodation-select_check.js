	// JavaScript Document
	var label_ctr_one_is_checked_0={"code0":"please select 1 option"};
	
	function check_accommodationselect(){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		
		tmpEsito=one_is_checked('accommodationselect');	
		if(tmpEsito!=1){
			esito=false;
			firstError='accommodationselect';
			tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_3.code'+(tmpEsito*-1));
			showErrors($("[name='accommodationselect']"),tmpErrorMsg);
		}
		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}		
		return esito;
	}		
