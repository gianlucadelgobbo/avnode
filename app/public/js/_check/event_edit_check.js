
	function showMembersSearchResults(elem){
		if(checkTextLenght($('#'+elem),2,255)!=1){
			showError($('#'+elem),label_ctr_performance_textLenght_0.code0);		
		}else{
			$.ajax({
				url: "/_php/ajax/eventPartnersAddSearch.php?n="+escape($('#'+elem).val()),
				type: 'GET',
				success: function(data) {
					$('#searchListCnt').show();
					$('#searchList').html(data);
				}
			});
		}
	}
	
	function setMemberSelected(elem){
		if ($(elem).parent().parent().attr('id') == "searchList") {
			$("#selectedListCnt").show();
			$("#selectedList").append($(elem).parent());
		} else {
			$('#searchList').append($(elem).parent());
			if($("#selectedList").children().length==0) $("#selectedListCnt").hide();
		}
	}

	function onCloseMemberWin(id,ruolo){
		members = [];
		$("#selectedList input[name='members[]']:checked").each(function(){
			members.push($(this).val());
		});
		$.ajax({
			url: "/_php/ajax/eventPartnersAddAct.php",
			type: "POST",
			dataType: "json",
			data: {id_event:id,id_sogg:members,ruolo:ruolo},
			success: function(data) {
				console.log(data);
				if (ruolo==746) {
					$('#multiple_production').html(drawProduction(data));
				} else {
					$('#multiple_partners').html(drawPartners(data));
				}
			}
		});
		$("#msgBox").dialog("destroy");
	}

	function saveRole(id,rel_id,ruolo){
		$('#multiple_partners').html('saving...');
		$.ajax({
			url: "/_php/ajax/eventPartnerEditAct.php",
			type: "POST",
			dataType: "json",
			data: {id:id,rel_id:rel_id,ruolo:ruolo},
			success: function(data) {
				console.log(data);
				$('#multiple_partners').html(drawPartners(data));
			}
		});
		$("#msgBox").dialog("destroy");
	}

	function unlinkPartner(div,id,rel_id){
		if ($(div).parent().parent().parent().attr('id')=="multiple_production" && $(div).parent().parent().children().length==1){
			alert(label_ctr_evento_new_members_1.code0);
		} else {
			$.ajax({
				url: "/_php/ajax/eventPartnersAddDel.php",
				type: "POST",
				dataType: "json",
				data: {id:id,rel_id:rel_id},
				success: function(data) {
					console.log(data);
					$(div).parent().remove();
				}
			});
		}
	}

	function drawPartners(data){
		str = '';
		for(block in data.partners) {
			str+= '<div class="actions">'+block+'</div>';
			str+= '<ul class="performancesList">';
			for(item in data.partners[block]) {
				str+= '<li><a onclick="unlinkPartner(this,'+data.id+','+data.partners[block][item].rel_id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <a onclick="openShadowboxWin({\'mode\':\'ajax\'},{\'url\':\'/_php/ajax/eventPartnerEdit.php?eventid='+data.id+'&uid='+data.partners[block][item].uid+'&rel_id='+data.partners[block][item].rel_id+'\',\'title\':\''+label_ctr_evento_new_del_perf.code1+'\', width:400,height:(\$(window).height()-100)});return false;" href="#"><img src="/_images/edit_16.gif" width="16" alt="'+label_multiple_fields_edit+'" /></a> <strong class="actions">'+data.partners[block][item].nomearte+'</strong></span></li>';
			}
			str+= '</ul><br />';
		}
		return str;
	}

	function drawProduction(data){
		str = '';
			str+= '<ul class="performancesList">';
			for(item in data.performers) {
				str+= '<li><a onclick="unlinkPartner(this,'+data.id+','+data.performers[item].rel_id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <strong class="actions">'+data.performers[item].nomearte+'</strong></span></li>';
			}
			str+= '</ul>';
		return str;
	}

	function drawPerformance(data){
		str = '';
		artisti = '';
		for(block in data.performances) {
			str+= '<div class="actions">'+block+'</div>';
			str+= '<ul class="performancesList">';
			for(item in data.performances[block]) {
				artisti = '';
				for(item2 in data.performances[block][item].performers) {
					artisti+= data.performances[block][item].performers[item2].nomearte+", ";
				}
				artisti = artisti.substring(0 ,artisti.length-2);
				str+= '<li><a onclick="unlinkPerformance(this,'+data.id+','+data.performances[block][item].id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <a onclick="openShadowboxWin({\'mode\':\'ajax\'},{\'url\':\'/_php/ajax/eventPerformanceEdit.php?eventid='+data.id+'&id='+data.performances[block][item].id+'&rel_id='+data.performances[block][item].rel_id+'\',\'title\':\''+label_ctr_evento_new_del_perf.code1+'\', width:400,height:(\$(window).height()-100)});return false;" href="#"><img src="/_images/edit_16.gif" width="16" alt="'+label_multiple_fields_edit+'" /></a> <a href="https://flxer.net/controlpanel/?edit=performances&perfid='+data.performances[block][item].id+'" target="_blank"><img src="/_images/edit_16.gif" width="16" alt="'+label_multiple_fields_edit+'" /></a>  <strong class="actions">'+data.performances[block][item].titolo+'</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+artisti+'</span><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+data.performances[block][item].typeStr+(data.salabase ? (data.performances[block][item].room ? " | "+data.performances[block][item].room : "ERROR") :"")+'</span></li>';
			}
			str+= '</ul><br />';
		}
		str+= '<ul class="performancesList">';
		for(item in data.performances_notconfirmed) {
			str+= '<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong class="actions">'+data.performances_notconfirmed[item].titolo+'</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+label_ctr_evento_new_del_perf.code1+'</span></li>';
		}
		str+= '</ul><br />';
		return str;
	}






	function savePerformance(obj){
		$('#multiple_performances').html('saving...');
		$.ajax({
			url: "/_php/ajax/eventPerformanceEditAct.php",
			type: "POST",
			dataType: "json",
			data: obj,
			success: function(data) {
				console.log(data);
				$('#multiple_performances').html(drawPerformance(data));
			}
		});
		$("#msgBox").dialog("destroy");
	}

	function unlinkPerformance(elObj,id_from,id_rel){
		if(window.confirm(label_ctr_evento_new_del_perf.code0)){
			$(elObj).parent().remove();
			$.ajax({
				url: "/_php/ajax/eventPerformanceDel.php?id_from="+id_from+"&id_rel="+id_rel,
				type: 'GET',
				success: function(data) {
				}
			});
		}
	}

	function onClosePerformanceWin(id){
		perf = [];
		$("#selectedList input[name='performances[]']:checked").each(function(){
			perf.push($(this).val());
		});
		$.ajax({
			url: "/_php/ajax/eventPerformanceAddAct.php",
			type: "POST",
			dataType: "json",
			data: {eventid:id,perf:perf},
			success: function(data) {
				$('#multiple_performances').html(drawPerformance(data));
				//multiPerformancesMaker.addEl(transport.responseJSON.id,transport.responseJSON.nome,id);
			}
		});
		$("#msgBox").dialog("destroy");
	}
	
	function showPerformancesSearchResults(elem){
		if(checkTextLenght($('#'+elem),2,255)!=1){
			showError($('#'+elem),label_ctr_evento_new_perf_textLenght_0.code0);		
		}else{
			$.ajax({
				url: "/_php/ajax/eventPerformanceSearch.php?n="+escape($('#'+elem).val()),
				type: 'GET',
				success: function(data) {
					$('#searchListCnt').show();
					$('#searchList').html(data);
				}
			});
		}
	}
	function setPerformanceSelected(elem){
		if ($(elem).parent().parent().attr('id') == "searchList") {
			$("#selectedListCnt").show();
			$("#selectedList").append($(elem).parent());
		} else {
			$('#searchList').append($(elem).parent());
			if($("#selectedList").children().length==0) $("#selectedListCnt").hide();
		}
	}

	function check_event_edit(myform){
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

		tmpEsito=one_is_checked('type');	
		if(tmpEsito!=1){
			esito=false;
			firstError='type';
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
		