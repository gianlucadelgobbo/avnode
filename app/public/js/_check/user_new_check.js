	function check_user_new(){
	
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		tmpElem=$("#consensoSI");
		tmpEsito=$("#consensoSI:checked").length;
		if(tmpEsito!=1){
			esito=false;
			firstError='consenso';
			tmpErrorMsg=eval('label_ctr_user_edit_is_checked_0.code'+(tmpEsito*-1));
			showErrors(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#citta');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="citta";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_2.code'+(tmpEsito*-1));
			showError($('#citta'),tmpErrorMsg);
		}
		
		tmpElem=$('#nazione');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nazione";
			tmpErrorMsg=eval('label_ctr_user_edit_is_selected_3.code'+(tmpEsito*-1));
			showError($('#nazione'),tmpErrorMsg);
		}
		
		tmpElem=$('#dataSogg');
		tmpEsito=checkIntervalDate(tmpElem,'1910-01-01',currentTime.getFullYear()+'-01-01');	
		if(tmpEsito!=1){
			esito=false;
			firstError="dataSogg";
			tmpErrorMsg=eval('label_ctr_user_edit_checkIntervalDate_14.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		
		tmpElem=$('#sesso');
		tmpEsito=checkTextLenght(tmpElem,'1','1');	
		if(tmpEsito!=1){
			esito=false;
			firstError="sesso";
			tmpErrorMsg=eval('label_ctr_user_edit_is_selected_13.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		
		tmpElem=$('#nome');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nome";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_10.code'+(tmpEsito*-1));
			showError($('#nome'),tmpErrorMsg);
		}
		
		tmpElem=$('#cognome');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="cognome";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_11.code'+(tmpEsito*-1));
			showError($('#cognome'),tmpErrorMsg);
		}

		tmpElem=$("#email");
		tmpEsito=checkEmail(tmpElem,"6","255");
		if(tmpEsito!=1){	
			esito=false;
			firstError="email";
			tmpErrorMsg=eval("label_ctr_user_edit_checkEmail_12.code"+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
	
		tmpElem=$('#passwd2');
		tmpEsito=passwdCheck2(tmpElem,'4','20', $('#passwd'));	
		if(tmpEsito!=1){
			esito=false;
			firstError="passwd2";
			tmpErrorMsg=eval('label_ctr_user_edit_passwdCheck_9.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#passwd');
		tmpEsito=passwdCheckEdit(tmpElem,'4','20');	
		if(tmpEsito!=1){
			esito=false;
			firstError="passwd";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_8.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#login2');
		tmpEsito=checklogin(tmpElem,'1','20','login_path');	
		if(tmpEsito!=1){
			esito=false;
			firstError="login2";
			tmpErrorMsg=eval('label_ctr_user_edit_checklogin_7.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#nomearte');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nomearte";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_1.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}


		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}
		
		return esito;
	}
