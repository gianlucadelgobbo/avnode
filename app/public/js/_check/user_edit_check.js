	var newmaildiv;
	$(document).ready(function() {
		newmaildiv = $('#newmaildiv').html();
		$('#newmaildiv').remove();
	});
	function addEmail(emailsCloner,id){		
		var newEmail=window.prompt(label_ctr_user_edit_email_msg_18.code3);
		if(is_email(newEmail)==1){
			//controllo sia valida
			$.ajax({
				url: "/_php/ajax/checkEmail.php?m="+newEmail,
				type:"get",
				success:function(data){
					if(data=="<root>ok</root>") {
						str = newmaildiv.replace("##############",newEmail);
						$('#multiple_emails').append(str);
						emailsCloner = $("#multiple_emails").cloneElements(null,5);
						$.ajax({
							url: "/_php/ajax/sendEmailConfirm.php?email="+newEmail+"&id="+id,
							type:"get",
							success:function(data){
							}
						});
					}else{
						alert(label_ctr_user_edit_email_msg_18.code4);						
					}
				}
			}); 		
		}else{
			alert(label_ctr_user_edit_email_msg_18.code5);
		}
		return false;
	};
	function deleteEmail(elem){
		if(window.confirm(this.label_ctr_user_edit_email_msg_18.code2)){
			$(elem).parent().parent().remove();
		}
	};

	function sendVerificationCode(elem,id){
		bella = $('#multiple_emails').children();
		$($(bella[elem]).find('.msg')[0]).html(label_ctr_user_edit_email_msg_18.code1);
		$.ajax({
			url: "/_php/ajax/sendEmailConfirm.php?email="+$(bella[elem]).find('.email')[0].value+"&id="+id,
			type:"get",
			success:function(data){
				$($(bella[elem]).find('.msg')[0]).html(data);
			}
		});
	}

	function setPrimary(elem){
		console.log($(elem).parent().parent().parent().find(".primary"));
		$(elem).parent().parent().parent().find(".primary").each(function(){
		console.log($(this).attr('id'));
		console.log($(elem).attr('id'));
			if($(this).attr('id')==$(elem).attr('id')){
				$(this).attr('checked','checked');
				$(this).parent().parent().find(".delete").hide();
			} else {
				$(this).removeAttr('checked');
				$(this).parent().parent().find(".delete").show();
			}
		});
	};

	function validate_user_edit(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		
		tmpElem=$('#sesso');
		tmpEsito=checkTextLenght(tmpElem,'1','1');	
		if(tmpEsito!=1){
			esito=false;
			firstError="sesso";
			tmpErrorMsg=eval('label_ctr_user_edit_is_selected_13.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#dataSogg');
		tmpEsito=checkIntervalDate(tmpElem,'1910-01-01',currentTime.getFullYear()+'-01-01');	
		if(tmpEsito!=1){
			esito=false;
			firstError="dataSogg";
			tmpErrorMsg=eval('label_ctr_user_edit_checkIntervalDate_14.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#cognome');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="cognome";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_11.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#nome');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nome";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_10.code'+(tmpEsito*-1));
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

		tmpElem=$('#login');
		tmpEsito=checklogin(tmpElem,'1','20','login_path');	
		if(tmpEsito!=1){
			esito=false;
			firstError="login";
			tmpErrorMsg=eval('label_ctr_user_edit_checklogin_7.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
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

		for(a=0;a<$('#multiple_location').children().length;a++){
			tmpElem=$('#city'+a);
			tmpEsito=checkTextLenght(tmpElem,'1','255');
			if(tmpEsito!=1){
				esito=false;
				firstError="city"+a;
				tmpErrorMsg=eval('label_ctr_crew_textLenght_2.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
			tmpElem=$('#country'+a);
			tmpEsito=tmpElem.val();
			if(tmpEsito==""){
				esito=false;
				firstError="city"+a;
				tmpErrorMsg=eval('label_ctr_crew_is_selected_3.code'+(tmpEsito*-1));
				showError(tmpElem,tmpErrorMsg);
			}
		}

		tmpElem=$('#nomearte');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nomearte";
			tmpErrorMsg=eval('label_ctr_user_edit_textLenght_1.code'+(tmpEsito*-1));
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
		
		
