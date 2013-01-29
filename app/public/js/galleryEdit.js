// JavaScript Document


function showEditGallery(id_gallery,elemName){
	//$("#"+elemName).html("");
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=edit&id_gallery="+id_gallery,
		type: 'GET',
		success: function(data) {
			$("#"+elemName).html(data);
			mysort(id_gallery);
		}
	}); 	
}

function updateTitleGallery(id_gallery,elemName){
	if($("#label_"+elemName)) $("#label_"+elemName).html($("#"+elemName).val());
	$("#"+elemName).attr('disabled','disabled');
	$("#out_"+id_gallery).show();
	$("#out_"+id_gallery).html(label_gallery_edit.code2);
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=updateTitle&id_gallery="+id_gallery+"&tit="+encodeURIComponent($("#"+elemName).val()),
		type: 'GET',
		success: function(d) {
			data = eval("(" + d + ')');
			$("#"+elemName).removeAttr('disabled');
			$("#out_"+id_gallery).html(data.msg);
			$("#out_"+id_gallery).hide();
			$(".gallItemListSave input").attr("onclick","window.location.href='../"+data.permalink+"/'");
		}
	}); 	
}
function updateDateGallery(id_gallery,elemName){
	$("#"+elemName).attr('disabled','disabled');
	$("#data_out_"+id_gallery).show();
	$("#data_out_"+id_gallery).html(label_gallery_edit.code2);
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=updateDate&id_gallery="+id_gallery+"&date="+encodeURIComponent($("#"+elemName).val()),
		type: 'GET',
		success: function(data) {
			$("#"+elemName).removeAttr('disabled');
			$("#data_out_"+id_gallery).html(data);
			$("#data_out_"+id_gallery).hide();
		}
	});
}
function updateTitleFileFromGallery(id_gallery,elemName,id_file){
	$("#"+elemName).attr('disabled','disabled');
	$("#out_"+id_gallery+"_"+id_file).show();
	$("#out_"+id_gallery+"_"+id_file).html(label_gallery_edit.code2);
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=updateFileTitle&id_gallery="+id_gallery+"&id_file="+id_file+"&tit="+encodeURIComponent($("#"+elemName).val()),
		type: 'GET',
		success: function(data) {
			$("#"+elemName).removeAttr('disabled');
			$("#out_"+id_gallery+"_"+id_file).html(data);
			$("#out_"+id_gallery+"_"+id_file).hide();
		}
	});
}
function showGalleryUpload(){
	//new Ajax.Request("/_php/ajax/sessionSet.php?act=delete&gallery_inserita=0", {method: 'get',
	//	onSuccess: function(data) {
			$("#galleryUpload").show();
			if ($("#uploadcomplete-gallery")) $("#uploadcomplete-gallery").html("&nbsp;");
			if ($("#galleryUp_upload_option")) $("#galleryUp_upload_option").html("&nbsp;");
			if ($("ul .qq-upload-list")) {
				$('ul .qq-upload-list').each(function(element) {
        	  		$(this).html("");
     			});
     		}
//		}
//	}); 	
}
function deleteGallery(id_gallery){
	//cambia act in listAndDelete
	if(window.confirm(label_gallery_edit.code0)){
		if ($("#p_gal"+id_gallery)) $("#p_gal"+id_gallery).html("");
		$("#gal"+id_gallery).html("<img src=\"/_images/loading-small.gif\" class=\"cntPadd\" />");
		$.ajax({
			url: "/_php/ajax/galleryEdit.php?act=listAndDeleteAll&id_gallery="+id_gallery,
			type: 'GET',
			success: function(data) {
				$("#gal"+id_gallery).html(data);
			}
		});
	}
}
function deleteFileFromGallery(elem,id_gallery,id_file){
	if(window.confirm(label_gallery_edit.code1)){
		$(elem).parent().parent().css('opacity','.3');
		//ajax cancella
		$.ajax({
			url: "/_php/ajax/galleryEdit.php?act=deleteFile&id_gallery="+id_gallery+"&id_file="+id_file,
			type: 'GET',
			success: function(data) {
				$(elem).parent().parent().remove();
			}
		});
	}
	return false;
}
function updateResults(div) {
	if(uploaderGallery.getInProgress()===0 && gallery.items.length) {
		$(div).find('input').removeAttr('disabled');
		$(div).show();
	}
}
function saveGallery(div) {
	$(div).html("<div class=\"loadingWhite\"><img src=\"/_images/loading-small.gif\" /></div>");
	$.ajax({
		url: "/_php/ajax/gallerySave.php",
		type: "POST",
		dataType: "json",
		data: gallery,
		success: function(data) {
			$(div).html(data.strout);
		}
	});
}
function mysort(id) {
	$( "#sort"+id ).sortable({
		update: function(event, ui) {
			$.ajax({
				url: "/_php/ajax/saveImageOrder.php",
				type: 'POST',
				data: {data: $( "#sort"+id ).sortable("serialize"), id:id},
				success: function(data) {
				}
			});
		}
	});
}
/*
function getEditGallery(id_gallery,div){
	$('#'+div).show();
	$('#'+div).html("<img src=\"/_images/loading-small.gif\" />");
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=edit&id_gallery="+id_gallery,
		type: 'GET',
		success: function(data) {
			$('#'+div).html(data);
		}
	}); 	
}
function deleteEmptyGallery(id_gallery){
	//cambia act in listAndDelete
	if ($("#p_gal"+id_gallery)) $("#p_gal"+id_gallery).html("");
	$("#gal"+id_gallery).html("<img src=\"/_images/loading-small.gif\" />");
	$.ajax({
		url: "/_php/ajax/galleryEdit.php?act=listAndDelete&id_gallery="+id_gallery,
		type: 'GET',
		success: function(data) {
			$("#gal"+id_gallery).html(data);
		}
	});
}
function showGalleryCnt(divid){
	if($(divid).style.display=="none"){
		var elms=$(".galleryCnt");
		for(var i=0; i<elms.length; i++){
			$(elms[i].id).setStyle({display: 'none'});
			$("#p_"+elms[i].id).setStyle({backgroundImage: 'url(/_images/freccia_close.gif)'});
		}
		Effect.SlideDown(divid, { duration: 0.7 });
		//$(divid).setStyle({display: 'block'});
		$("#p_"+divid).setStyle({backgroundImage: 'url(/_images/freccia_open.gif)'});
	}
}
function closeGalleryUploadAndLoadGalleries(idperf){
	$("#galleryUpload").hide();
	$("#uploadcomplete-gallery").innerHTML = "&nbsp;";
	$("#videoGalleryCnt").show();
	new Ajax.Request("/_php/ajax/galleryEdit.php?act=list&idperf="+idperf, {method: 'get',onSuccess: function(data) { $("#videoGalleryCnt").html(data); }}); 	
}
*/
