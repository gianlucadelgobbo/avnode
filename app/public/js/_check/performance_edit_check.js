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
	
/* MEMBER */
	function unlinkMember(elObj,id_a,id_p){
		if($('#multiple_members').find('.confirmed').length>1){
			if(window.confirm(label_ctr_perf_edit_members_8.code0)){
				$(elObj).parent().remove();
				$.ajax({
					url: "/_php/ajax/performanceMembersAddDel.php?id_perf="+id_a+"&id_sogg="+id_p,
					type: 'GET',
					success: function(data) {
					}
				});
			}
		} else {
			alert(label_ctr_perf_edit_members_8.code2);
		}
	}
	
	function showEditGalleryInline(id){
		$('#galleryEditCnt').html("<div class=\"loadingWhite\">&nbsp;</div>");
		$('#galleryEdit').show();
		$('#galleryList').hide();
		$('#galleryList').html('');
		$.ajax({
			url: "/_php/ajax/galleryEdit.php?act=edit&id_gallery="+id,
			type: "GET",
			success: function(data) {
				$('#galleryEditCnt').html("<ul id=\"gal"+id+"\" class=\"gallery\">"+data+"</ul>");
				mysort(id);
			}
		});
	}

	function hideEditGalleryInline(id){
		gallery = {'perfid':id,'type': '','folder': '','filename': '','zipname': '','items': []};
		$('#galleryList').html("<div class=\"loadingWhite\">&nbsp;</div>");
		$('#galleryList').show();
		$('#galleryEdit').hide();
		$("#galleryUpload").hide();
		$('#galleryEditCnt').html('');
		$.ajax({
			url: "/_php/ajax/galleryEditList.php?tab=performance&id="+id,
			type: "GET",
			success: function(data) {
				$('#galleryList').html(data);
			}
		});
	}

	function onCloseMemberWin(id){
		members = [];
		$("#selectedList input[name='members[]']:checked").each(function(){
			members.push($(this).val());
		});
		$.ajax({
			url: "/_php/ajax/performanceMembersAddAct.php",
			type: "POST",
			dataType: "json",
			data: {id_perf:id,id_sogg:members},
			success: function(data) {
				str = '';
				for(item in data.performers) {
					str+= '<li><a onclick="unlinkMember(this,'+data.id+','+data.performers[item].id+'); return false;" href="#"><img src="/_images/deleteBig.gif" width="16" alt="'+label_multiple_fields_del+'" /></a> <strong class="actions">'+data.performers[item].titolo+'</strong></li>';
				}
				for(item in data.performers_notconfirmed) {
					str+= '<li style="padding-left:20px"><strong class="actions">'+data.performers_notconfirmed[item].titolo+'</strong><br /><span>'+label_ctr_evento_new_del_perf.code1+'</span></li>';
				}
				$('#multiple_members').html(str);
			}
		});
		$("#msgBox").dialog("destroy");
	}
	function showMembersSearchResults(elem){
		if(checkTextLenght($('#'+elem),2,255)!=1){
			showError($('#'+elem),label_ctr_performance_textLenght_0.code0);		
		}else{
			$.ajax({
				url: "/_php/ajax/performanceMembersAddSearch.php?n="+escape($('#'+elem).val()),
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







/*

	function onCloseMemberWin(id){
		//aggiunge i membri al form
		for(i=0;i<selectedMemberObj.length;i++){
			new Ajax.Request("/_php/ajax/performanceMembersAdd.php?id_perf="+id+"&id_sogg="+selectedMemberObj[i], {method: 'get',onSuccess: function(transport) {																																					
				multiMembersMaker.addEl(transport.responseJSON.id,transport.responseJSON.nome,id,transport.responseJSON.confirmed);
				}
			}); 
		}
		selectedMemberObj=new Array();
		Shadowbox.close();
	}
	function showMerbersSearchResults(elem,elemDest){
		if(checkTextLenght($(elem),2,255)!=1){
			showError($(elem),'msgErrorCnt_searchMem',label_ctr_crew_textLenght_0.code0);		
		}else{
			searchResultsDivDest=elemDest;
			new ajaxLoader("/_php/ajax/performanceMembersSearch.php?n="+escape($(elem).value),elemDest);
		}
	}
	
	function updateMerbersSearchResults(url){
		new ajaxLoader(url,searchResultsDivDest);
	}

	function setMemberSelected(elem){
		if($("selectMeb").style.display=="none"){
			$("selectMeb").style.display="block";
		}
		if(elem.checked==true){	//aggiungo ai selezionati
			//verifico se esiste
			if(selectedMemberObj.indexOf(elem.value)==-1){
				selectedMemberObj.push(elem.value);
				var p=elem.ancestors();
				var curr_li=p[0];
				$("ul_selectMeb").insert(curr_li.remove());
			}else{
				elem.checked=false;
				////alert(label_ctr_crew_members_16.code0);
			}
		}else{//rimuovo dai selezionati e aggiungo in coda ai risultati della ricerca
			selectedMemberObj=selectedMemberObj.without(elem.value);
			var p=elem.ancestors();
			var curr_li=p[0];
			curr_li.remove();
		}	
	}
*/
	function validate_performance_edit(myform){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		
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
	