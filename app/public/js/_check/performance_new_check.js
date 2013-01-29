// JavaScript Document
	var lastID;
	function showTechnique(id) {
		if (lastID) $('#cnt'+lastID).hide();
		if (id=='381' || id=='382') {
			$('#genre').show();
		} else {
			$('#genre').hide();
		}
		if ($('#cnt'+id)) {
			lastID = id;
			$('#cnt'+id).show();
		} else {
			lastID = '';
		}
		$("input[name='technique381']:checked").removeAttr('checked');
	}
	
	function check_performance_new(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;

		if ($("[name='performers']").attr('type')=='radio') {
			tmpEsito=one_is_checked('performers');	
			if(tmpEsito!=1){
				esito=false;
				firstError='performers';
				tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_5.code'+(tmpEsito*-1));
				showErrors($("[name='performers']"),tmpErrorMsg);
			}
		}
		tmpEsito=one_is_checked('type');	
		if(tmpEsito!=1){
			esito=false;
			firstError="type";
			tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_2.code'+(tmpEsito*-1));
			showErrors($("[name='type']"),tmpErrorMsg);
		}

		typeres = $("input[name='type']:checked").first().val();
		if (typeres=="381" || typeres=="382") {
			tmpEsito=one_is_checked('technique'+typeres);	
			if(tmpEsito!=1){
				esito=false;
				firstError='technique'+typeres;
				tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_3.code'+(tmpEsito*-1));
				showErrors($('input[name=\'technique'+typeres+'\']'),tmpErrorMsg);
			}

			tmpEsito=one_is_checked('genre');	
			if(tmpEsito!=1){
				tmpElem=$('#tag');
				tmpEsito=checkTextLenght(tmpElem,'1','255');	
				if(tmpEsito!=1){
					esito=false;
					firstError="genre";
					tmpErrorMsg=eval('label_ctr_perf_new_one_is_checked_4.code'+(tmpEsito*-1));
					showErrors($("input[name='genre']"),tmpErrorMsg);
				}
			}
		}

		tmpElem=$('#duration');
		tmpEsito=isNumber(tmpElem);
		if(tmpEsito!=1){
			esito=false;
			firstError="duration";
			tmpErrorMsg=eval('label_ctr_perf_new_textLenght_3.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		
		tmpElem=$('#titolo');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="titolo";
			tmpErrorMsg=eval('label_ctr_perf_new_textLenght_1.code'+(tmpEsito*-1));
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
