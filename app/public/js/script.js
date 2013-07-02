var ajax;
var int;

function showModal(t, m, callback) {
	if (m) $('.modal-'+t+' .modal-body p').html(m);
	$('.modal-'+t).modal('show');
	if ($.isFunction(callback)) {
		$('.modal-'+t).on('hidden', function () {
		  callback();
		})
	}
}

// PERMALINK

$(function () {
	$('[name="permalink"]').keyup(function() {
		$('#permalink').parent().parent().find(".help-inline").text("")
		$('#permalink').parent().parent().parent().removeClass("error");
		clearTimeout(int);
		int = setTimeout("checkPermalink()", 500);
	});
});
function checkPermalink() {
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var permalink = $('[name="permalink"]').val().toLowerCase();
	$('#permalink').parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />");
	$('#permalink').text(permalink);
	if (ajax) ajax.abort();
	ajax = $.ajax({
		url: "/ajax/checkPermalink/",
		type: 'POST',
		data:{_id:_id, permalink:permalink, collection:collection},
		success: function(data) {
			console.log(data);
			console.log($('#permalink').parent().parent());
			if(data.success){
				$('#permalink').parent().parent().find(".help-inline").html("<i class=\"icon-ok\"></i> "+data.msg)
				$('#permalink').parent().parent().parent().removeClass("error");
			} else {
				$('#permalink').parent().parent().find(".help-inline").html("<i class=\"icon-remove\"></i> "+data.msg)
				$('#permalink').parent().parent().parent().addClass("error");
			}
		}
	});
}

// EVENTS

function invitePartner(id) {
	var _id = $('[name="_id"]').val();
	var event_name = $('[name="title"]').val();
	var collection = "events";
	var data = JSON.parse($('#'+id).val());
	$('#'+id).parent().find("button").parent().prepend("<span class=\"loading-box\"><img src=\"/img/loading-small.gif\" /></span>");
	$('#'+id).parent().find("button").attr("disabled","disabled")
	$('#'+id).parent().find("button").html(__("Inviting"));
	$.ajax({
		url: "/ajax/invitePartner/",
		type: 'POST',
		data:{doc_id:_id, data:data, event_name:event_name, collection:collection},
		success: function(data) {
			console.log(data);
			if(data.success){
				$('#'+id).parent().find("button").html(__("Invited"));
				$('#'+id).parent().find(".loading-box").remove();
			} else {
				$('#'+id).parent().find("button").removeAttr("disabled")
				$('#'+id).parent().find("button").html(__("Invite"));
			}
		}
	});
}
function updatePartners( event, ui ) {
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var partners = [];
	$(".main-list").find("input").each(function(){
		partners.push(JSON.parse($(this).val()));
	});
	console.log(partners);
	$.ajax({
		url: "/ajax/updatePartners/",
		type: 'POST',
		data:{_id:_id, partners:partners, collection:collection},
		success: function(data) {
			console.log(data);
			console.log($('#permalink').parent().parent());
		}
	});
}

function deletePartner(t,id) {
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var toremove = $(t).parent().parent().parent();
	$(t).parent().parent().html("<div class=\"text-center\"><span class=\"loading-box\"><img src=\"/img/loading-small.gif\" /></span></div>");
	var partners = [];
	$(".main-list").find("input").each(function(){
		partners.push(JSON.parse($(this).val()));
	});
	console.log(partners);
	$.ajax({
		url: "/ajax/updatePartners/",
		type: 'POST',
		data:{_id:_id, partners:partners, collection:collection},
		success: function(data) {
			$.ajax({
				url: "/ajax/deletePartner/",
				type: 'POST',
				data:{_id:_id, id_partner:id, collection:collection},
				success: function(data) {
					toremove.remove();
					/*
					$.ajax({
						url: "/ajax/recreatePartnersEvent/",
						type: 'POST',
						data:{id:$('[name="_id"]').val()},
						success: function(data) {
							toremove.remove();
							console.log($(t));
							console.log($('#permalink').parent().parent());
						}
					});
					*/
				}
			});
		}
	});
}

function recreatePartnersEvent() {
	$.ajax({
		url: "/ajax/recreatePartnersEvent/",
		type: 'POST',
		data:{id:$('[name="_id"]').val()},
		success: function(data) {
			$(t).parent().parent().parent().remove();
			console.log(data);
			console.log($('#permalink').parent().parent());
		}
	});
}


// MEMBERS

function updateMembers( event, ui ) {
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var members = [];
	$(".main-list").find("input").each(function(){
		members.push(JSON.parse($(this).val()));
	});
	console.log(members);
	$.ajax({
		url: "/ajax/updateMembers/",
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			console.log(data);
			console.log($('#permalink').parent().parent());
		}
	});
}

function deleteMember(t,id) {
	$(t).parent().parent().html("<div class=\"text-center\"><span class=\"loading-box\"><img src=\"/img/loading-small.gif\" /></span></div>");
	updateMembers(undefined,undefined);
	$.ajax({
		url: "/ajax/recreateUserCrews/",
		type: 'POST',
		data:{id:id},
		success: function(data) {
			$(t).parent().parent().parent().remove();
			console.log(data);
			console.log($('#permalink').parent().parent());
		}
	});
}

function inviteMember(id) {
	var _id = $('[name="_id"]').val();
	var crew_name = $('[name="crew_name"]').val();
	var collection = "users";
	var data = JSON.parse($('#'+id).val());
	$('#'+id).parent().find("button").parent().prepend("<span class=\"loading-box\"><img src=\"/img/loading-small.gif\" /></span>");
	$('#'+id).parent().find("button").attr("disabled","disabled")
	$('#'+id).parent().find("button").html(__("Inviting"));
	$.ajax({
		url: "/ajax/inviteMember/",
		type: 'POST',
		data:{doc_id:_id, data:data, crew_name:crew_name, collection:collection},
		success: function(data) {
			console.log(data);
			if(data.success){
				$('#'+id).parent().find("button").html(__("Invited"));
				$('#'+id).parent().find(".loading-box").remove();
			} else {
				$('#'+id).parent().find("button").removeAttr("disabled")
				$('#'+id).parent().find("button").html(__("Invite"));
			}
		}
	});
}
function findMembers(val) {
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	ajax = $.ajax({
		url: "/ajax/findMembers/",
		type: 'POST',
		data:{_id:_id, search:val, collection:collection},
		success: function(data) {
			console.log(data);
			var str = "";
			for (var a=0;a<data.length;a++) {
				str+="<div class=\"alert alert-info\"><div class=\"clearfix\">\n";
				str+="<h4 class=\"pull-left\">"+data[a].display_name+"</h4>\n";
				str+="<span class=\"pull-right\">\n";
				str+="<input type=\"hidden\" id=\""+data[a]._id+"\" value='"+JSON.stringify(data[a])+"' />\n";
				str+="<button class=\"btn btn-small\" onclick=\"inviteMember('"+data[a]._id+"')\">"+__("Invite")+"</button>\n";
				str+="</span>\n";
				str+="</div></div>\n";
			}
			if (str) {
				str = "<hr />"+str+"\n";
			} else {
				str = __("No members found");
			}
			$("#search_result").append(str);
			console.log($('#permalink').parent().parent());
			if(data.success){
				$('#permalink').parent().parent().find(".help-inline").html("<i class=\"icon-ok\"></i> "+data.msg)
				$('#permalink').parent().parent().parent().removeClass("error");
			} else {
				$('#permalink').parent().parent().find(".help-inline").html("<i class=\"icon-remove\"></i> "+data.msg)
				$('#permalink').parent().parent().parent().addClass("error");
			}
		}
	});
}

/* EMAILS */

function emailAdd(t){
	$('#email_add').parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />&nbsp;&nbsp;Checking email");
	$('#email_add').parent().parent().find("button").attr("disabled","disabled");
	var email = $("#email_add").val();
	if (Validators.is_email(email)) {
		console.log("Sending verification email");
		$('#email_add').parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />&nbsp;&nbsp;Sending verification email");
		var _id = $('[name="_id"]').val();
		var collection = $('[name="collection"]').val();
		$.ajax({
			url: "/ajax/sendVerificationEmail/",
			type: 'POST',
			data:{doc_id:_id, email:email, collection:collection},
			success: function(data) {
				console.log(data);
				console.log($('#permalink').parent().parent());
				if(data.success){
					$('#email_add').parent().parent().find(".help-inline").html("<i class=\"icon-ok\"></i> "+data.msg)
					$('#email_add').parent().parent().parent().removeClass("error");
				} else {
					$('#email_add').parent().parent().find(".help-inline").html("<i class=\"icon-remove\"></i> "+data.msg)
					$('#email_add').parent().parent().parent().addClass("error");
				}
			}
		})
	} else {
		$('#email_add').parent().parent().find(".help-inline").html("Wrong email format");
		$('#email_add').parent().parent().parent().addClass("error");
	}
	$('#email_add').bind("keyup",function() {
		$('#email_add').parent().parent().find(".help-inline").html("");
		$('#email_add').parent().parent().find("button").removeAttr("disabled");
		$('#email_add').parent().parent().parent().removeClass("error");
	});
}

function emailRemove(t){
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var email = $($(t).parent().parent().parent().find('input')[0]).val();
	console.log($($(t).parent().parent().parent().find('input')[0]).val());
	$(t).parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />&nbsp;&nbsp;Deleting");
	
	$.ajax({
		url: "/ajax/deleteEmail/",
		type: 'POST',
		data:{doc_id:_id, email:email, collection:collection},
		success: function(data) {
			console.log(data);
			console.log($('#permalink').parent().parent());
			if(data.success){
				$(t).parent().parent().parent().remove()
			} else {
				$('#email_add').parent().parent().find(".help-inline").html("<i class=\"icon-remove\"></i> "+data.msg)
				$('#email_add').parent().parent().parent().addClass("error");
			}
		}
	})
	/*
	*/
}

function setPrimary(t){
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var email = $($(t).parent().parent().parent().find('input')[0]).val();
	var div = $(t).parent().parent().parent();
	console.log($($(t).parent().parent().parent().find('input')[0]).val());
	var oldHelp = $(t).parent().parent().find(".help-inline").html();
	console.log(oldHelp);
	var oldDelete = $(t).parent().parent().find(".add-on");
	console.log(oldDelete);
	$(t).parent().parent().find(".add-on").remove();
	$(t).parent().parent().find(".input-append").append("<span class=\"add-on\"><i class=\"icon-lock\"></i></span>");
	console.log($(t).parent().parent());
	$(t).parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />&nbsp;&nbsp;Deleting");
	$.ajax({
		url: "/ajax/setPrimary/",
		type: 'POST',
		data:{doc_id:_id, email:email, collection:collection},
		success: function(data) {
			console.log(data);
			if(data.success){
				div.find(".help-inline").html("");
			} else {
			}
		}
	})
	/*
	*/
}

function setNewsletter(email, t){
	var _id = $('[name="_id"]').val();
	var collection = $('[name="collection"]').val();
	var val = [];
	$(t).parent().parent().find(".help-inline").html("<img src=\"/img/loading-small.gif\" />&nbsp;&nbsp;Updating");
	$(t).parent().parent().find("input").each(function() {
		if (this.checked) val.push($(this).attr("name"));
	});
	var lang = $(t).parent().parent().find("select").val();
	console.log(val);
	$.ajax({
		url: "/ajax/setNewsletter/",
		type: 'POST',
		data:{doc_id:_id, newsletters:val.concat(","), email:email, lang:lang},
		success: function(data) {
			$(t).parent().parent().find(".help-inline").html("");
		}
	})
}
function __(t){
	return t;
}
function renamer(t){
	for (var a=0;a<blocks.length;a++) {
		$(blocks[a]).find("input").each(function() {
			if($(this).attr("name")){
				var name = $(this).attr("name");
				var name1 = name.substring(0,name.indexOf("[")+1);
				var name2 = name.substring(name.indexOf("]"));
				console.log(name1+a+name2);
				$(this).attr("name",name1+a+name2);
			}
		});
	}
}


/* WEBSITES */

function websiteAdd(t){
	var tmp = $($("#websites").children()[0]).clone();
	tmp.find("input").val("");
	$("#websites").append(tmp);
}

function websiteRemove(t){
	if ($("#websites").children().length==1) {
		$(t).parent().parent().find("input").val("");
	} else {
		$(t).parent().parent().remove();
	}
}

/* MAPS */
var map;
var bounds;
var map_add;
var allMarkers = [];

function showMapAdd(){
	showModal('search_map', false, addOnClose)
	if (!map_add) if(navigator.geolocation) navigator.geolocation.getCurrentPosition(createMapAdd);
}

/* MAPS USER GLOBAL*/
function initializeMap(data) {	
	var myOptions = {
		zoom: 17,
		center: new google.maps.LatLng(1,1) ,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: true
	}; 

	map= new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	bounds=new google.maps.LatLngBounds();
	/*
	infowindow = new google.maps.InfoWindow({
		content: 'oi'
	});
	*/
	$.each(data, function(index, c) {
		console.log(c);
		var latlng = new google.maps.LatLng(c.lat,c.lng); 
		var marker = new google.maps.Marker({
			map: map,
			position: latlng,
			title:'pk:'+c.pk
		});
		allMarkers.push(marker);
		bounds.extend(latlng);
		/*
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.close();
			infowindow.setContent('pk:'+c.pk);
			infowindow.open(map, marker);
		});
		*/
	});
	map.fitBounds(bounds);
}

/* MAPS PICKER*/
var defaultLat = 41.8929163;
var defaultLng = 12.482519899999943;
var center;

function createMapAdd(){
	center = new google.maps.LatLng(defaultLat,defaultLng),
	defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(defaultLat,defaultLng),
		new google.maps.LatLng(defaultLat,defaultLng)
	);
	
    //if(navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

	var options = {
		map: "#map_canvas_add",
		location: [defaultLat,defaultLng],
		markerOptions: {draggable: true},
		details: "form#search-map-form",
		types: ["geocode", "establishment"],
		bounds: defaultBounds
	};
		
	$("#find").click(function(){
		$("#geocomplete").trigger("geocode");
	});
							
	$("#geocomplete").geocomplete(options)
		.bind("geocode:result", function(event, result){
			geo_add = result;
			console.log("Result: " + result.formatted_address);
		})
		.bind("geocode:error", function(event, status){
			console.log("ERROR: " + status);
		})
		.bind("geocode:multiple", function(event, results){
			console.log("Multiple: " + results.length + " results found");
		});
	map_add =  $("#geocomplete").geocomplete("map");
	map_add.setCenter(center);
	map_add.setZoom(8);
	$("#geocomplete").bind("geocode:dragged", function(event, latLng){
		$("input[name=lat]").val(latLng.lat());
		$("input[name=lng]").val(latLng.lng());
		$("input[name=bounds]").val(latLng.lat(),latLng.lng(),latLng.lat(),latLng.lng());
		$("input[name=viewport]").val(latLng.lat(),latLng.lng(),latLng.lat(),latLng.lng());
	});
}

function addOnClose() {
	var obj = $("#search-map-form").serializeObject();
	if (obj.lat && obj.lng) {
		var tmp = $("#sortable .alert:first").clone();
		tmp.find(".pull-left").html("<h4>"+obj.country+(obj.locality ? ", "+obj.locality : "")+"</h4><div>"+obj.lat+" / "+obj.lng+"</div><input type=\"hidden\" name=\"locations[]\" value='"+JSON.stringify(obj)+"' />");
		$("#sortable").append(tmp);
		tmp.show();
		var latlng = new google.maps.LatLng(obj.lat,obj.lng); 
		var marker = new google.maps.Marker({
			map: map,
			position: latlng
		});
		allMarkers.push(marker);
		bounds.extend(latlng);
		map.fitBounds(bounds);
	}
}

function deleteLocation(button) {
	var div = $(button).parent().parent().parent();
	var obj = $.parseJSON(div.find('input').val())
	console.log(div);
	console.log(obj);
	for (item in allMarkers) {
		console.log(allMarkers[item].position.lat()+" - "+allMarkers[item].position.lng());
		if (allMarkers[item].position.lat()==obj.lat && allMarkers[item].position.lng()==obj.lng) {
			allMarkers[item].setMap(null);
			delete allMarkers[item];
			if (div.parent().children().length>1) {
				div.remove();
			} else {
				div.find(".pull-left").html("");
				div.hide();
			}
		}
	}
}

function onPositionUpdate(position) {
	defaultLat = position.coords.latitude;
	defaultLng = position.coords.longitude;
	var latlng = new google.maps.LatLng(defaultLat,defaultLng); 
	var marker = new google.maps.Marker({
		map: map_add,
		position: latlng,
		draggable: true
	});
	map_add.setCenter(latlng);
	map_add.setZoom(17);
	alert("Current position: " + lat + " " + lng);
}


$.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};
/*
$(function () {
	if ($('.user_dettaaa').height()>$('.user_dett .pull-left img').height()) {
		$('.user_dett .media-body .more').show();
		$('.user_dett .media-body').attr('style','position:relative');
		var user_dett_height = $('.user_dett .pull-left img').height()-15-$('.user_dett .media-body .more').height()-$('.user_dett .media-body .cnt').position().top;
		$('.user_dett .media-body .cnt').attr('style','overflow:hidden;height:'+user_dett_height+'px');
		$('.user_dett .media-body .more button').click(function() {
			$('.user_dett .media-body .cnt').attr('style','height:auto');
			$('.user_dett .media-body .more').hide();
			$('.user_dett .pull-left img').css("width", "200px");
			$('.user_dett .media-body .less').show();
		});
		$('.user_dett .media-body .less button').click(function() {
			$('.user_dett .media-body .cnt').attr('style','overflow:hidden;height:'+user_dett_height+'px');
			$('.user_dett .media-body .less').hide();
			$('.user_dett .pull-left img').css("width", "400px");
			$('.user_dett .media-body .more').show();
		});
		console.log(user_dett_height);
	}
});
function moreShowHide(div) {
	if ($('.user_dett')) {
		$('#BoxPerfPrimoPiano').attr('style','height:385px');
	}
	if (div=="#cntHide") {
		$(div).attr('style','height:300px');
	} else {
		$(div).attr('style','height:30px');
	}
	$(div+"Hide").hide();
	$(div+"More").attr('style','display:inline');
}
function adda() {
	var t = "search_map";
	showModal(t, false, function() {
		console.log($("#search_map").val());
	});
}

var timerID;
var myWidthOLD;
var myHeightOLD;
var currentFocus;
var currentFocusInt;
var oldPerf = 0;
var rate_id;

$(document).ready(function () {
	$('.dropdown-toggle').dropdown();
	caricaFlashAvvio();
	if($("rateBox") && rate_id && !isNaN(rate_id)){
		initRateAct();
	}
	init = $("#menu").position().top;
	console.log(init);
});
var docked;
$(window).scroll(function () {
	menu = $("#menu");
    if (!docked && (menu.offset().top - menu.scrollTop() < 0)) {
        menu.style.top = 0;
        menu.style.position = 'fixed'; 
        menu.className = 'docked'; 
        docked = true;
    } else if (docked && menu.scrollTop() <= init) { 
        menu.style.position = 'absolute'; 
        menu.style.top = init + 'px';
        menu.className = menu.className.replace('docked', ''); 
        docked = false;  
    }
});
function moveMenu(t){
	$('#menuNew').css('left',($(t).position().left));
}
function checkLoginCallback(t){
}

function createSend(t,url){
	//console.log(jQuery(t).serialize());
	if (is_email(jQuery('[name=email]').val())) {
		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: url,
			data: jQuery(t).serialize(),
			success: function(data) {
				//console.log(data);
				jQuery('#nl_res').html(data.msg);
			    //alert('Load was performed.');
			}
		});
	}
	return false;
}

function tagUsers(id_media, id_sogg, x, y) {
	$.ajax({
		url: '/_php/ajax/tagUsers.php?act=add&id_media='+id_media+'&id_sogg='+id_sogg+'&x='+x+'&y='+y+'&url='+document.location.href,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$('#taggedUsers').show();
			$('#taggedUsersList').html(data);
		}
	})
}

function tagUsersRemove(id_media, id_sogg) {
	$.ajax({
		url: '/_php/ajax/tagUsers.php?act=remove&id_media='+id_media+'&id_sogg='+id_sogg,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			if (data.indexOf("href")>0) {
				$('#taggedUsers').show();
			} else {
				$('#taggedUsers').hide();
			}
			$('#taggedUsersList').html(data);
		}
	});
}
// HOME SLIDESHOW
function setNewPerf() {
	$.ajax({
		url: '/_php/ajax/randomPerf.php',
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$('#BoxPerfPrimoPiano').html(data);
			$('#cntHide').attr('style','height:auto');
			if ($('#cntHide').height()>300) {
				$('#more').show();
				moreHide('#cntHide');
			} else {
				$('#cntHide').attr('style','height:auto');
			}
		}
	});
}
function moreShow(div) {
	if ($('#BoxPerfPrimoPiano')) {
		$('#BoxPerfPrimoPiano').attr('style','height:auto');
	}
	$(div).attr('style','height:auto');
	$(div+"Hide").attr('style','display:inline');
	$(div+"More").hide();
}
function moreHide(div) {
	if ($('#BoxPerfPrimoPiano')) {
		$('#BoxPerfPrimoPiano').attr('style','height:385px');
	}
	if (div=="#cntHide") {
		$(div).attr('style','height:300px');
	} else {
		$(div).attr('style','height:30px');
	}
	$(div+"Hide").hide();
	$(div+"More").attr('style','display:inline');
}

function setNewAlert() {
	oldPerf++;
	if (oldPerf>2) oldPerf=0;
	$.ajax({
		url: '/_php/ajax/newAlert.php?n='+oldPerf,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$('#alertCnt').html(data);
		}
	});
}

// HOME POST
function loadHomePostAjax(url,div){
	$(div).html("<div style=\"text-align:center; padding:50px 0;background-color:#FFFFFF;\"><img src=\"/_images/loading_white.gif\" alt=\"please wait\" /></div>");
	$.ajax({
		url: url,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$(div).html(data);
		}
	}); 
}

function loadLista(sez,k,u){
	div = 'lista';
	if (u) {
		url = '?act='+k+'&sez='+sez+'&u='+u;
	} else {
		url = '?act='+k+'&sez='+sez;
	}
	loadListaBase(url);
	$.each($('#paletteMenu a'), function(item){
		$(this).removeClass('selected');
		if ($(this).attr('onclick').indexOf('\''+k+'\'')>=0) {
			//console.log(k);
			$(this).addClass('selected');
		}
	});
}

function loadListaBase(url){
	div = '#lista';
	$(div).html("<div style=\"text-align:center; padding:50px 0;background-color:#FFFFFF;\"><img src=\"/_images/loading_white.gif\" alt=\"please wait\" /></div>");
	$.ajax({
		url: '/_php/ajax/writeList.php'+url,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$(div).html(data);
			$('#tot_num_rows').html($('#tot_num_rows_pager').html());
		}
	}); 
	return false;
}


// FUNZIONI GENERICHE
function openShadowboxWin(modeOpt,winOpt){
	//modeOpt={"mode":"html"};
	//winOpt={"cnt":"BLA BLA","title":"window title","width":680,"height":190};
	
	//modeOpt={"mode":"ajax"};
	//winOpt={"url":"/path/to/my/file","title":"window title","width":680,"height":190};
	
	if(modeOpt.mode=="ajax"){
		$.ajax({
			url: winOpt.url,
			type: 'POST',
		data:{_id:_id, members:members, collection:collection},
			success: function(data) {
				$("#msgBox").html(data);
				$("#msgBox").dialog({ title: winOpt.title,modal: true,width: winOpt.width,height:winOpt.height});
			}
		});
	}else{
		$("#msgBox").html(winOpt.cnt);
		$("#msgBox").dialog({ title: winOpt.title, modal: true, width: winOpt.width, height:winOpt.height});
	}
}

var memuTimer;
function swapMenuRestore(){
	clearTimeout(memuTimer);
	memuTimer=window.setTimeout("hideMenu()", 500);
}
function stopSwapMenuRestore(){
	clearTimeout(memuTimer);
}
function hideMenu(){
	swapMenu(original_open_menu)
}
function swapMenu(id){
	clearInterval(memuTimer);
	$("#projectMenu").hide();
	$("#softwareMenu").hide();
	$("#communityMenu").hide();
	$(id).show();
}
function setHome() {
	if (document.all) {
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(window.location.href);
    } else if (window.sidebar) {
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch(e) {
				alert("This action was avoid by your browser. If you want to enable please enter about:config in your address line, and change the value of signed.applets.codebase_principal_support to true");
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',window.location.href);
	}
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function aprichiudi(actdiv){
	$("#"+actdiv).toggle();		
}


/*
function openWindow(modeOpt,winOpt){
	/*
	modeOpt:
	{mode:'div',id:'id_div_src'}
	{mode:'ajax',url:'path_del_file_da_caricare'}
	{mode:'string',str:'testo del messaggio'}
	*/
	/*
	winOpt:
	{width:numero_di_pixel,buttonClass:'nome_dello_stile',okLabel:'label_del_pulsante'}
	http://prototype-window.xilinus.com/documentation.html#alert
	*/
	/*
	es.
	openWindow({mode:'div',id:'login'},{width:600,buttonClass:'winButtonClass',okLabel:'chiudi'});
	openWindow({mode:'ajax',url:'ajaxContent.htm'},{width:600,okLabel:'close'});
	openWindow({mode:'string',str:'Attenzione bella pe te<br/>aho'},{width:600});
	if(modeOpt['mode']=='div'){
		Dialog.alert($(modeOpt['id']).innerHTML, winOpt);
	}else if(modeOpt['mode']=='ajax'){
		Dialog.alert({url: modeOpt['url'], options: {method: 'get'}}, winOpt);
	}else if(modeOpt['mode']=='string'){
		Dialog.alert(modeOpt['str'], winOpt);
	}
	WindowCloseKey.init();
}
function apriDIV(actdiv){
	$(actdiv).show();
}

function chiudiDIV(actdiv){
		$(actdiv).hide();		
}
function checkPostForumData(){
	var oEditor = FCKeditorAPI.GetInstance(window.FCKname);
	var tmp = oEditor.UpdateLinkedField();
	var tmptext = removeHTMLTags(HtmlDecode(oEditor.GetXHTML()));
	mf=document.post;
	tmp = mf.area;
	if(tmp.options[tmp.selectedIndex].value=="0"){
		alert(label_checkPostForumData.code0);
		tmp.focus();
		return false;
	}
	tmp = mf.titolo.value;
	if(tmp.length < 1){
		alert(label_checkPostForumData.code2);
		mf.titolo.focus();
		return false;
	}
	tmp = mf.testo.value;
	if(tmp.length < 1){
		alert(label_checkPostForumData.code3);
		mf.testo.focus();
		return false;
	}
	if(tmptext.length>6999){
		alert(label_checkPostForumData.code4);
		return false;
	}
	return true;
}

function fillCommentArea(divSrc,divDest,nome){
	$(divDest).value="[cite]"+nome+" "+label_fillCommentArea.code0+" "+removeHTMLTags(HtmlDecode($(divSrc).innerHTML))+"[/cite]\n";
	$(divDest).focus();
}


function ajaxLoader(url,divDest){
	$.ajax({
		url: url,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$(divDest).html(data);
		}
	}); 
}
function ajaxLoaderPlayer(url,divDest,fpUrl,listUrl,divDestList){	
	$.ajax({
		url: url,
		type: 'POST',
		data:{_id:_id, members:members, collection:collection},
		success: function(data) {
			$(divDest).html(data);
			flashWriter('flashPlayer',400,300,'/_fp/flxerPlayer.swf?cnt='+sitePath+'/_fp/fpGallery.php?id=p'+fpUrl,'window'); 
			ajaxLoader(listUrl,divDestList) 
		}
	}); 
}
function addClassAttribute(elem,styleName){
	if(elem.className.indexOf(styleName)==-1)
		elem.setAttribute('class',elem.className+' '+styleName);
}
function removeClassAttribute(elem,styleName){
	var strclassname=elem.className;
	elem.setAttribute("class",trim(strclassname.replace(styleName,"")));
}

var oldGall;
function divFiller(divid,pid,url){
	if (oldGall == divid && $(divid).is(':visible')) {
		$(divid).hide();
	} else {
		$(divid).show();
		if($(divid).innerHTML.blank()) {
			
			$(divid).innerHTML='<div class="loading"><img src="/_images/loading.gif" alt="Loading" /></div>';
			var elms=$$(".galleryCnt");
			for(var i=0; i<elms.length; i++){
				$(elms[i].id).setStyle({display: 'none'});
				$("p_"+elms[i].id).setStyle({backgroundImage: 'url(/_images/freccia_close.gif)'});
			}
			$(divid).show();
			$(pid).setStyle({backgroundImage: 'url(/_images/freccia_open.gif)'});
			$.ajax({
				url: url,
				type: 'POST',
		data:{_id:_id, members:members, collection:collection},
				success: function(data) {
					$(divid).html(data);
					Shadowbox.setup();
				}
			}); 
		}
	}
	oldGall = divid;
}
function divFiller2(divid,pid,url){
	if (oldGall == divid && $(divid).is(':visible')) {
		$(divid).hide();
	} else {
		$(divid).show();
		if($(divid).innerHTML.blank()) {
			$(divid).innerHTML='<div class="loading"><img src="/_images/loading.gif" alt="Loading" /></div>';
			var elms=$$(".galleryCnt");
			for(var i=0; i<elms.length; i++){
				$(elms[i].id).hide();
				//$("p_"+elms[i].id).setStyle({backgroundImage: 'url(/_images/freccia_close.gif)'});
			}
			$(divid).show();
			//$(pid).setStyle({backgroundImage: 'url(/_images/freccia_open.gif)'});
			urlCnt = document.location.href;

			if (urlCnt.indexOf('img=')>0){
				p = urlCnt.substring(urlCnt.indexOf('img=')+4,urlCnt.length);
				if (p.indexOf('&')>0){
					p = p.substring(0, p.indexOf('&'));
				}
			}
			new Ajax.Request(url, {method: 'get',onSuccess: function(transport) {
				$(divid).html(data);
				Shadowbox.setup();
				status = "";
				cells = $(divid).getElementsByTagName("a");

				openSB(cells,p);
			}});		
		}
	}
	oldGall = divid;
}
function openSB(cells,p) {
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].getAttribute("href")=='/warehouse'+p) {
			rel = cells[i].getAttribute("rel");
			relA = rel.split(";");
			if (relA.length>1) {
				w = relA[1].split("=")[1];
				h = relA[2].split("=")[1];
				Shadowbox.open({
					content:    '/warehouse'+p,
					player:     "flv",
					title:      cells[i].getAttribute("title"),
					width:		w,
					height:		h
				});
			} else {
				Shadowbox.open({
					content:    '/warehouse'+p,
					player:     "img",
					title:      cells[i].getAttribute("title")
				});
			}
		}
	}
}

function popupwindow(LarghezzaCont,AltezzaCont,Pagina,nome,scrol,stat) {
	var lsBrowser = navigator.appName;
	var navInfo = navigator.userAgent;
	if (scrol == "yes") {
		if (navInfo == "Mac" && lsBrowser.indexOf("Microsoft") >= 0) {
				aw = 0;
		} else {
		aw = 17;
		}		
	} else {
	aw = 0;
	}		
    var iMyWidth;
    var iMyHeight;
    var LarghezzaPagina;
    var AltezzaPagina;
    LarghezzaPagina = screen.availWidth;
    AltezzaPagina = screen.availHeight;
    LarghezzaCont=LarghezzaCont.toUpperCase()
    AltezzaCont=AltezzaCont.toUpperCase()
				
    if (LarghezzaCont == "FULL") {
            LarghezzaWindow = screen.availWidth;
        } else {
            LarghezzaWindow = parseInt(LarghezzaCont) + aw;
        }
    if (AltezzaCont == "FULL") {
            AltezzaWindow = screen.availHeight;
        } else {
            AltezzaWindow = AltezzaCont;
        }
    iMyWidth = (LarghezzaPagina/2) - (LarghezzaWindow/2);
    iMyHeight = (AltezzaPagina/2) - (AltezzaWindow/2);
    win = window.open(Pagina,nome,"height=" + AltezzaWindow + ",width="	+ LarghezzaWindow 
	+ ",menubar=0,resizable=yes,scrollbars=" + scrol + ",status=" + stat + ",titlebar=0,toolbar=0,left="
	+ iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + "");
    win.focus();
}
function removeHTMLTags(strInputCode){
	strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}

function HtmlDecode(s){
	var out = "";
	if (s==null) return;
	var l = s.length;
	for (var i=0; i<l; i++) {
		var ch = s.charAt(i);
		if (ch == '&') {
			var semicolonIndex = s.indexOf(';', i+1);
			if (semicolonIndex > 0) {
				var entity = s.substring(i + 1, semicolonIndex);
				if (entity.length > 1 && entity.charAt(0) == '#') {
					  if (entity.charAt(1) == 'x' || entity.charAt(1) == 'X')
							ch = String.fromCharCode(eval('0'+entity.substring(1)));
					  else
							ch = String.fromCharCode(eval(entity.substring(1)));
				} else {
					  switch (entity) {
							case 'quot': ch = String.fromCharCode(0x0022); break;
							case 'amp': ch = String.fromCharCode(0x0026); break;
							case 'lt': ch = String.fromCharCode(0x003c); break;
							case 'gt': ch = String.fromCharCode(0x003e); break;
							case 'nbsp': ch = String.fromCharCode(0x00a0); break;
							case 'iexcl': ch = String.fromCharCode(0x00a1); break;
							case 'cent': ch = String.fromCharCode(0x00a2); break;
							case 'pound': ch = String.fromCharCode(0x00a3); break;
							case 'curren': ch = String.fromCharCode(0x00a4); break;
							case 'yen': ch = String.fromCharCode(0x00a5); break;
							case 'brvbar': ch = String.fromCharCode(0x00a6); break;
							case 'sect': ch = String.fromCharCode(0x00a7); break;
							case 'uml': ch = String.fromCharCode(0x00a8); break;
							case 'copy': ch = String.fromCharCode(0x00a9); break;
							case 'ordf': ch = String.fromCharCode(0x00aa); break;
							case 'laquo': ch = String.fromCharCode(0x00ab); break;
							case 'not': ch = String.fromCharCode(0x00ac); break;
							case 'shy': ch = String.fromCharCode(0x00ad); break;
							case 'reg': ch = String.fromCharCode(0x00ae); break;
							case 'macr': ch = String.fromCharCode(0x00af); break;
							case 'deg': ch = String.fromCharCode(0x00b0); break;
							case 'plusmn': ch = String.fromCharCode(0x00b1); break;
							case 'sup2': ch = String.fromCharCode(0x00b2); break;
							case 'sup3': ch = String.fromCharCode(0x00b3); break;
							case 'acute': ch = String.fromCharCode(0x00b4); break;
							case 'micro': ch = String.fromCharCode(0x00b5); break;
							case 'para': ch = String.fromCharCode(0x00b6); break;
							case 'middot': ch = String.fromCharCode(0x00b7); break;
							case 'cedil': ch = String.fromCharCode(0x00b8); break;
							case 'sup1': ch = String.fromCharCode(0x00b9); break;
							case 'ordm': ch = String.fromCharCode(0x00ba); break;
							case 'raquo': ch = String.fromCharCode(0x00bb); break;
							case 'frac14': ch = String.fromCharCode(0x00bc); break;
							case 'frac12': ch = String.fromCharCode(0x00bd); break;
							case 'frac34': ch = String.fromCharCode(0x00be); break;
							case 'iquest': ch = String.fromCharCode(0x00bf); break;
							case 'Agrave': ch = String.fromCharCode(0x00c0); break;
							case 'Aacute': ch = String.fromCharCode(0x00c1); break;
							case 'Acirc': ch = String.fromCharCode(0x00c2); break;
							case 'Atilde': ch = String.fromCharCode(0x00c3); break;
							case 'Auml': ch = String.fromCharCode(0x00c4); break;
							case 'Aring': ch = String.fromCharCode(0x00c5); break;
							case 'AElig': ch = String.fromCharCode(0x00c6); break;
							case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
							case 'Egrave': ch = String.fromCharCode(0x00c8); break;
							case 'Eacute': ch = String.fromCharCode(0x00c9); break;
							case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
							case 'Euml': ch = String.fromCharCode(0x00cb); break;
							case 'Igrave': ch = String.fromCharCode(0x00cc); break;
							case 'Iacute': ch = String.fromCharCode(0x00cd); break;
							case 'Icirc': ch = String.fromCharCode(0x00ce ); break;
							case 'Iuml': ch = String.fromCharCode(0x00cf); break;
							case 'ETH': ch = String.fromCharCode(0x00d0); break;
							case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
							case 'Ograve': ch = String.fromCharCode(0x00d2); break;
							case 'Oacute': ch = String.fromCharCode(0x00d3); break;
							case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
							case 'Otilde': ch = String.fromCharCode(0x00d5); break;
							case 'Ouml': ch = String.fromCharCode(0x00d6); break;
							case 'times': ch = String.fromCharCode(0x00d7); break;
							case 'Oslash': ch = String.fromCharCode(0x00d8); break;
							case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
							case 'Uacute': ch = String.fromCharCode(0x00da); break;
							case 'Ucirc': ch = String.fromCharCode(0x00db); break;
							case 'Uuml': ch = String.fromCharCode(0x00dc); break;
							case 'Yacute': ch = String.fromCharCode(0x00dd); break;
							case 'THORN': ch = String.fromCharCode(0x00de); break;
							case 'szlig': ch = String.fromCharCode(0x00df); break;
							case 'agrave': ch = String.fromCharCode(0x00e0); break;
							case 'aacute': ch = String.fromCharCode(0x00e1); break;
							case 'acirc': ch = String.fromCharCode(0x00e2); break;
							case 'atilde': ch = String.fromCharCode(0x00e3); break;
							case 'auml': ch = String.fromCharCode(0x00e4); break;
							case 'aring': ch = String.fromCharCode(0x00e5); break;
							case 'aelig': ch = String.fromCharCode(0x00e6); break;
							case 'ccedil': ch = String.fromCharCode(0x00e7); break;
							case 'egrave': ch = String.fromCharCode(0x00e8); break;
							case 'eacute': ch = String.fromCharCode(0x00e9); break;
							case 'ecirc': ch = String.fromCharCode(0x00ea); break;
							case 'euml': ch = String.fromCharCode(0x00eb); break;
							case 'igrave': ch = String.fromCharCode(0x00ec); break;
							case 'iacute': ch = String.fromCharCode(0x00ed); break;
							case 'icirc': ch = String.fromCharCode(0x00ee); break;
							case 'iuml': ch = String.fromCharCode(0x00ef); break;
							case 'eth': ch = String.fromCharCode(0x00f0); break;
							case 'ntilde': ch = String.fromCharCode(0x00f1); break;
							case 'ograve': ch = String.fromCharCode(0x00f2); break;
							case 'oacute': ch = String.fromCharCode(0x00f3); break;
							case 'ocirc': ch = String.fromCharCode(0x00f4); break;
							case 'otilde': ch = String.fromCharCode(0x00f5); break;
							case 'ouml': ch = String.fromCharCode(0x00f6); break;
							case 'divide': ch = String.fromCharCode(0x00f7); break;
							case 'oslash': ch = String.fromCharCode(0x00f8); break;
							case 'ugrave': ch = String.fromCharCode(0x00f9); break;
							case 'uacute': ch = String.fromCharCode(0x00fa); break;
							case 'ucirc': ch = String.fromCharCode(0x00fb); break;
							case 'uuml': ch = String.fromCharCode(0x00fc); break;
							case 'yacute': ch = String.fromCharCode(0x00fd); break;
							case 'thorn': ch = String.fromCharCode(0x00fe); break;
							case 'yuml': ch = String.fromCharCode(0x00ff); break;
							case 'OElig': ch = String.fromCharCode(0x0152); break;
							case 'oelig': ch = String.fromCharCode(0x0153); break;
							case 'Scaron': ch = String.fromCharCode(0x0160); break;
							case 'scaron': ch = String.fromCharCode(0x0161); break;
							case 'Yuml': ch = String.fromCharCode(0x0178); break;
							case 'fnof': ch = String.fromCharCode(0x0192); break;
							case 'circ': ch = String.fromCharCode(0x02c6); break;
							case 'tilde': ch = String.fromCharCode(0x02dc); break;
							case 'Alpha': ch = String.fromCharCode(0x0391); break;
							case 'Beta': ch = String.fromCharCode(0x0392); break;
							case 'Gamma': ch = String.fromCharCode(0x0393); break;
							case 'Delta': ch = String.fromCharCode(0x0394); break;
							case 'Epsilon': ch = String.fromCharCode(0x0395); break;
							case 'Zeta': ch = String.fromCharCode(0x0396); break;
							case 'Eta': ch = String.fromCharCode(0x0397); break;
							case 'Theta': ch = String.fromCharCode(0x0398); break;
							case 'Iota': ch = String.fromCharCode(0x0399); break;
							case 'Kappa': ch = String.fromCharCode(0x039a); break;
							case 'Lambda': ch = String.fromCharCode(0x039b); break;
							case 'Mu': ch = String.fromCharCode(0x039c); break;
							case 'Nu': ch = String.fromCharCode(0x039d); break;
							case 'Xi': ch = String.fromCharCode(0x039e); break;
							case 'Omicron': ch = String.fromCharCode(0x039f); break;
							case 'Pi': ch = String.fromCharCode(0x03a0); break;
							case ' Rho ': ch = String.fromCharCode(0x03a1); break;
							case 'Sigma': ch = String.fromCharCode(0x03a3); break;
							case 'Tau': ch = String.fromCharCode(0x03a4); break;
							case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
							case 'Phi': ch = String.fromCharCode(0x03a6); break;
							case 'Chi': ch = String.fromCharCode(0x03a7); break;
							case 'Psi': ch = String.fromCharCode(0x03a8); break;
							case 'Omega': ch = String.fromCharCode(0x03a9); break;
							case 'alpha': ch = String.fromCharCode(0x03b1); break;
							case 'beta': ch = String.fromCharCode(0x03b2); break;
							case 'gamma': ch = String.fromCharCode(0x03b3); break;
							case 'delta': ch = String.fromCharCode(0x03b4); break;
							case 'epsilon': ch = String.fromCharCode(0x03b5); break;
							case 'zeta': ch = String.fromCharCode(0x03b6); break;
							case 'eta': ch = String.fromCharCode(0x03b7); break;
							case 'theta': ch = String.fromCharCode(0x03b8); break;
							case 'iota': ch = String.fromCharCode(0x03b9); break;
							case 'kappa': ch = String.fromCharCode(0x03ba); break;
							case 'lambda': ch = String.fromCharCode(0x03bb); break;
							case 'mu': ch = String.fromCharCode(0x03bc); break;
							case 'nu': ch = String.fromCharCode(0x03bd); break;
							case 'xi': ch = String.fromCharCode(0x03be); break;
							case 'omicron': ch = String.fromCharCode(0x03bf); break;
							case 'pi': ch = String.fromCharCode(0x03c0); break;
							case 'rho': ch = String.fromCharCode(0x03c1); break;
							case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
							case 'sigma': ch = String.fromCharCode(0x03c3); break;
							case 'tau': ch = String.fromCharCode(0x03c4); break;
							case 'upsilon': ch = String.fromCharCode(0x03c5); break;
							case 'phi': ch = String.fromCharCode(0x03c6); break;
							case 'chi': ch = String.fromCharCode(0x03c7); break;
							case 'psi': ch = String.fromCharCode(0x03c8); break;
							case 'omega': ch = String.fromCharCode(0x03c9); break;
							case 'thetasym': ch = String.fromCharCode(0x03d1); break;
							case 'upsih': ch = String.fromCharCode(0x03d2); break;
							case 'piv': ch = String.fromCharCode(0x03d6); break;
							case 'ensp': ch = String.fromCharCode(0x2002); break;
							case 'emsp': ch = String.fromCharCode(0x2003); break;
							case 'thinsp': ch = String.fromCharCode(0x2009); break;
							case 'zwnj': ch = String.fromCharCode(0x200c); break;
							case 'zwj': ch = String.fromCharCode(0x200d); break;
							case 'lrm': ch = String.fromCharCode(0x200e); break;
							case 'rlm': ch = String.fromCharCode(0x200f); break;
							case 'ndash': ch = String.fromCharCode(0x2013); break;
							case 'mdash': ch = String.fromCharCode(0x2014); break;
							case 'lsquo': ch = String.fromCharCode(0x2018); break;
							case 'rsquo': ch = String.fromCharCode(0x2019); break;
							case 'sbquo': ch = String.fromCharCode(0x201a); break;
							case 'ldquo': ch = String.fromCharCode(0x201c); break;
							case 'rdquo': ch = String.fromCharCode(0x201d); break;
							case 'bdquo': ch = String.fromCharCode(0x201e); break;
							case 'dagger': ch = String.fromCharCode(0x2020); break;
							case 'Dagger': ch = String.fromCharCode(0x2021); break;
							case 'bull': ch = String.fromCharCode(0x2022); break;
							case 'hellip': ch = String.fromCharCode(0x2026); break;
							case 'permil': ch = String.fromCharCode(0x2030); break;
							case 'prime': ch = String.fromCharCode(0x2032); break;
							case 'Prime': ch = String.fromCharCode(0x2033); break;
							case 'lsaquo': ch = String.fromCharCode(0x2039); break;
							case 'rsaquo': ch = String.fromCharCode(0x203a); break;
							case 'oline': ch = String.fromCharCode(0x203e); break;
							case 'frasl': ch = String.fromCharCode(0x2044); break;
							case 'euro': ch = String.fromCharCode(0x20ac); break;
							case 'image': ch = String.fromCharCode(0x2111); break;
							case 'weierp': ch = String.fromCharCode(0x2118); break;
							case 'real': ch = String.fromCharCode(0x211c); break;
							case 'trade': ch = String.fromCharCode(0x2122); break;
							case 'alefsym': ch = String.fromCharCode(0x2135); break;
							case 'larr': ch = String.fromCharCode(0x2190); break;
							case 'uarr': ch = String.fromCharCode(0x2191); break;
							case 'rarr': ch = String.fromCharCode(0x2192); break;
							case 'darr': ch = String.fromCharCode(0x2193); break;
							case 'harr': ch = String.fromCharCode(0x2194); break;
							case 'crarr': ch = String.fromCharCode(0x21b5); break;
							case 'lArr': ch = String.fromCharCode(0x21d0); break;
							case 'uArr': ch = String.fromCharCode(0x21d1); break;
							case 'rArr': ch = String.fromCharCode(0x21d2); break;
							case 'dArr': ch = String.fromCharCode(0x21d3); break;
							case 'hArr': ch = String.fromCharCode(0x21d4); break;
							case 'forall': ch = String.fromCharCode(0x2200); break;
							case 'part': ch = String.fromCharCode(0x2202); break;
							case 'exist': ch = String.fromCharCode(0x2203); break;
							case 'empty': ch = String.fromCharCode(0x2205); break;
							case 'nabla': ch = String.fromCharCode(0x2207); break;
							case 'isin': ch = String.fromCharCode(0x2208); break;
							case 'notin': ch = String.fromCharCode(0x2209); break;
							case 'ni': ch = String.fromCharCode(0x220b); break;
							case 'prod': ch = String.fromCharCode(0x220f); break;
							case 'sum': ch = String.fromCharCode(0x2211); break;
							case 'minus': ch = String.fromCharCode(0x2212); break;
							case 'lowast': ch = String.fromCharCode(0x2217); break;
							case 'radic': ch = String.fromCharCode(0x221a); break;
							case 'prop': ch = String.fromCharCode(0x221d); break;
							case 'infin': ch = String.fromCharCode(0x221e); break;
							case 'ang': ch = String.fromCharCode(0x2220); break;
							case 'and': ch = String.fromCharCode(0x2227); break;
							case 'or': ch = String.fromCharCode(0x2228); break;
							case 'cap': ch = String.fromCharCode(0x2229); break;
							case 'cup': ch = String.fromCharCode(0x222a); break;
							case 'int': ch = String.fromCharCode(0x222b); break;
							case 'there4': ch = String.fromCharCode(0x2234); break;
							case 'sim': ch = String.fromCharCode(0x223c); break;
							case 'cong': ch = String.fromCharCode(0x2245); break;
							case 'asymp': ch = String.fromCharCode(0x2248); break;
							case 'ne': ch = String.fromCharCode(0x2260); break;
							case 'equiv': ch = String.fromCharCode(0x2261); break;
							case 'le': ch = String.fromCharCode(0x2264); break;
							case 'ge': ch = String.fromCharCode(0x2265); break;
							case 'sub': ch = String.fromCharCode(0x2282); break;
							case 'sup': ch = String.fromCharCode(0x2283); break;
							case 'nsub': ch = String.fromCharCode(0x2284); break;
							case 'sube': ch = String.fromCharCode(0x2286); break;
							case 'supe': ch = String.fromCharCode(0x2287); break;
							case 'oplus': ch = String.fromCharCode(0x2295); break;
							case 'otimes': ch = String.fromCharCode(0x2297); break;
							case 'perp': ch = String.fromCharCode(0x22a5); break;
							case 'sdot': ch = String.fromCharCode(0x22c5); break;
							case 'lceil': ch = String.fromCharCode(0x2308); break;
							case 'rceil': ch = String.fromCharCode(0x2309); break;
							case 'lfloor': ch = String.fromCharCode(0x230a); break;
							case 'rfloor': ch = String.fromCharCode(0x230b); break;
							case 'lang': ch = String.fromCharCode(0x2329); break;
							case 'rang': ch = String.fromCharCode(0x232a); break;
							case 'loz': ch = String.fromCharCode(0x25ca); break;
							case 'spades': ch = String.fromCharCode(0x2660); break;
							case 'clubs': ch = String.fromCharCode(0x2663); break;
							case 'hearts': ch = String.fromCharCode(0x2665); break;
							case 'diams': ch = String.fromCharCode(0x2666); break;
							default: ch = ''; break;
					  }
				}
				i = semicolonIndex;
			}
		}
		out += ch;
	}
	return out;
}

*/