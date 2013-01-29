	function check_event_new(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
				
		for(a=0;a<$('#multiple_location').children().length;a++){
			tmpElem=$('#data_evento'+a);
			tmpEsito=isDate(tmpElem.val());	
			if(tmpEsito==false){
				esito=false;
				firstError="data_evento"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_data_evento.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			
			tmpElem=$('#ora_inizio'+a);
			tmpEsito=is_time(tmpElem.val());	
			if(tmpEsito==false){
				esito=false;
				firstError="ora_inizio"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_ora_inizio.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			
			tmpElem=$('#ora_fine'+a);
			tmpEsito=is_time(tmpElem.val());	
			if(tmpEsito!=1){
				esito=false;
				firstError="ora_fine"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_ora_fine.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			
			tmpElem=$('#luogo'+a);
			tmpEsito=checkTextLenght(tmpElem,'1','255');
			if(tmpEsito!=1){
				esito=false;
				firstError="luogo"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_luogo.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			
			tmpElem=$('#citta'+a);
			tmpEsito=checkTextLenght(tmpElem,'1','255');
			if(tmpEsito!=1){
				esito=false;
				firstError="citta"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_citta.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			
			tmpElem=$('#nazione'+a);
			tmpEsito=checkTextLenght(tmpElem,'1','255');
			if(tmpEsito!=1){
				esito=false;
				firstError="nazione"+a;
				tmpErrorMsg=eval('label_ctr_evento_new_nazione.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
		}

		if ($("[name='performers']").attr('type')=='radio') {
			tmpEsito=one_is_checked('performers');	
			if(tmpEsito!=1){
				esito=false;
				firstError='performers';
				tmpErrorMsg=eval('label_ctr_evento_new_one_is_checked_3.code'+(tmpEsito*-1));
				showErrors($("[name='performers']"),tmpErrorMsg);
			}
		}

		tmpEsito=one_is_checked('type');	
		if(tmpEsito!=1){
			esito=false;
			firstError="type";
			tmpErrorMsg=eval('label_ctr_evento_new_one_is_selected_2.code'+(tmpEsito*-1));
			showErrors($("[name='type']"),tmpErrorMsg);
		}

		for(a=0;a<$('#multiple_website').children().length;a++){
			tmpElem=$('#website'+a);
			tmpEsito=checkWebsite(tmpElem,'1','255');
			if(tmpEsito!=1){
				esito=false;
				firstError="website"+a;
				tmpErrorMsg=eval('label_ctr_user_edit_checkWebsite_4.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
		}
		
		tmpElem=$('#titolo');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="titolo";
			tmpErrorMsg=eval('label_ctr_evento_new_textLenght_1.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		if(!$('#avatar_old_img').length){
			tmpElem=$('#file-uploader');
			if(!$('#avatar_name').length){
				esito=false;
				firstError="avatar";
				tmpEsito=0;
				tmpErrorMsg=eval('label_ctr_post_new_textLenght_0.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
		}

		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}
		return esito;
	}
		