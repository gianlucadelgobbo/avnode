
function validate_tvshow_edit(myform){
	var esito=true;
	var tmpEsito;
	var tmpElem;
	var tmpErrorMsg;
	var firstError=false;
	
	tmpEsito=one_is_checked('type');	
	if(tmpEsito!=1){
		esito=false;
		firstError='label_type';
		tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_2.code'+(tmpEsito*-1));
		showErrors($("[name='type']"),tmpErrorMsg);
	}

	tmpElem=$('#titolo');
	tmpEsito=checkTextLenght(tmpElem,'1','255');	
	if(tmpEsito!=1){
		esito=false;
		firstError="titolo";
		tmpErrorMsg=eval('label_ctr_tvshow_textLenght_1.code'+(tmpEsito*-1));
		showError($('#titolo'),tmpErrorMsg);
	}
	
	if(!esito && firstError!=false){
		window.location.hash="#label_"+firstError;
	}
	return esito;
}
	
	