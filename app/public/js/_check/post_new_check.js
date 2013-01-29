	function writeSnapshotOk(myform){
	}
	function validate_post_new(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;

		tmpEsito=$("[name='privacy']:checked").length;	
		if(tmpEsito!=1){
			esito=false;
			firstError="privacy";										
			tmpErrorMsg=eval('label_ctr_post_new_is_checked_7.code'+(tmpEsito*-1));
			showErrors($("[name='privacy']"),tmpErrorMsg);
		}

		if($("[name='required_tag_type']").length){
			tmpEsito=one_is_checked('required_tag_type');	
			if(tmpEsito!=1){
				esito=false;
				firstError='label_required_tag_type';
				tmpErrorMsg=eval('label_ctr_post_edit_one_is_checked_4.code'+(tmpEsito*-1));
				showErrors($("[name='required_tag_type']"),tmpErrorMsg);
			}

		}
		
		if($("[name='required_tag']").length){
			tmpEsito=one_is_checked('required_tag');	
			if(tmpEsito!=1){
				esito=false;
				firstError='label_required_tag';
				tmpErrorMsg=eval('label_ctr_post_edit_one_is_checked_5.code'+(tmpEsito*-1));
				showErrors($("[name='required_tag']"),tmpErrorMsg);
			}

		}
		
		tmpEsito=one_is_checked('performers');	
		if(tmpEsito!=1){
			esito=false;
			firstError='performers';
			tmpErrorMsg=eval('label_ctr_post_new_one_is_checked_3.code'+(tmpEsito*-1));
			showErrors($("[name='performers']"),tmpErrorMsg);
		}

		
		tmpElem=$('#titolo');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="titolo";
			tmpErrorMsg=eval('label_ctr_post_new_textLenght_1.code'+(tmpEsito*-1));
			showError($('#titolo'),tmpErrorMsg);
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
	
	