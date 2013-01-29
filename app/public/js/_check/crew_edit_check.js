
/* MEMBER */
	function unlinkMember(elObj,id_a,id_p){
		if(window.confirm(label_ctr_crew_member_18.code0)){
			$(elObj).parent().remove();
			$.ajax({
				url: "/_php/ajax/crewMembersAddDel.php?id_a="+id_a+"&id_p="+id_p,
				type: 'GET',
				success: function(data) {
				}
			});
		}
	}

	function onCloseMemberWin(id){
		members = [];
		$("#selectedList input[name='members[]']:checked").each(function(){
			members.push($(this).val());
		});
		$.ajax({
			url: "/_php/ajax/crewMembersAddAct.php",
			type: "POST",
			dataType: "json",
			data: {id_a:id,id_p:members},
			success: function(data) {
				str = '';
				artisti = '';
				for(item in data.members) {
					str+= '<li><a onclick="unlinkPerformance(this,'+data.id+','+data.members[item].id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <strong class="actions">'+data.members[item].titolo+'</strong></li>';
				}
				for(item in data.members_notconfirmed) {
					str+= '<li style="padding-left:20px"><strong class="actions">'+data.members_notconfirmed[item].titolo+'</strong><br /><span>'+label_ctr_evento_new_del_perf.code1+'</span></li>';
				}
				$('#multiple_members').html(str);
				//multiPerformancesMaker.addEl(transport.responseJSON.id,transport.responseJSON.nome,id);
			}
		});
		$("#msgBox").dialog("destroy");
	}
	function showMembersSearchResults(elem){
		if(checkTextLenght($('#'+elem),2,255)!=1){
			showError($('#'+elem),label_ctr_crew_textLenght_0.code0);		
		}else{
			$.ajax({
				url: "/_php/ajax/crewMembersAddSearch.php?n="+escape($('#'+elem).val()),
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

	function checkAndSendNotification(id_a){
		//controlla i dati
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		
		document.getElementById("addMemMsg").innerHTML="";
		
		tmpElem=$('#addMemName');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			tmpErrorMsg=eval('label_ctr_crew_textLenght_10.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		tmpElem=$('#addMemSurname');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			tmpErrorMsg=eval('label_ctr_crew_textLenght_11.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		tmpElem=$('#addMemEmail');
		tmpEsito=checkEmail(tmpElem,'6','255');	
		if(tmpEsito!=1){
			esito=false;
			tmpErrorMsg=eval('label_ctr_crew_checkEmail_12.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}
		//invia notifica
		if(esito){
			$.ajax({
				url: "/_php/ajax/crewMembersAddAct.php",
				type: "POST",
				dataType: "json",
				data: {id_a:id_a,email:escape($("#addMemEmail").val()),nome:escape($("#addMemName").val()),cognome:escape($("#addMemSurname").val())},
				success: function(data) {
					str = '';
					for(item in data.members) {
						str+= '<li><a onclick="unlinkPerformance(this,'+data.id+','+data.members[item].id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <strong class="actions">'+data.members[item].titolo+'</strong></li>';
					}
					for(item in data.members_notconfirmed) {
						str+= '<li style="padding-left:20px"><strong class="actions">'+data.members_notconfirmed[item].titolo+'</strong><br /><span>'+label_ctr_evento_new_del_perf.code1+'</span></li>';
					}
					$('#multiple_members').html(str);
					$("#msgBox").dialog("destroy");
				}
			});
		}
	}


	function validate_crew_edit(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
	
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
		
		tmpElem=$('#login');
		tmpEsito=checklogin(tmpElem,'1','20','login_path');	
		if(tmpEsito!=1){
			esito=false;
			firstError="login";				
			tmpErrorMsg=eval('label_ctr_crew_checklogin_7.code'+(tmpEsito*-1));
			showError(tmpElem,tmpErrorMsg);
		}

		tmpElem=$('#nomearte');
		tmpEsito=checkTextLenght(tmpElem,'1','255');	
		if(tmpEsito!=1){
			esito=false;
			firstError="nomearte";
			tmpErrorMsg=eval('label_ctr_crew_textLenght_1.code'+(tmpEsito*-1));
			showError($('#nomearte'),tmpErrorMsg);
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
