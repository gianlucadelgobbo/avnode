/* global $, document, google, window, navigator */
var ajax;

// GENERAL
window.deleteTemp = function(t,id) {
  var divremove = $(t).parent().parent().parent();
  $(t).parent().parent().html('<div class="text-center"><span class="loading-box"><img src="/img/loading-small.gif" /></span></div>');
  $.ajax({
    url: '/controlpanel/ajax/deleteTemp/',
    type: 'POST',
    data:{id:id},
    success: function() {
      divremove.remove();
      if (!$('.main-list-notconfirmed').children().length) $('.main-list-notconfirmed-title').hide();
    }
  });
};

function __(t){
  return t;
}
/*
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
*/

/* WEBSITES */

window.websiteAdd = function(){
  var tmp = $($('#websites').children()[0]).clone();
  tmp.find('input').val('');
  $('#websites').append(tmp);
  disableOnEnter('websites');
};

window.websiteRemove = function(t){
  if ($('#websites').children().length==1) {
    $(t).parent().parent().find('input').val('');
  } else {
    $(t).parent().parent().parent().remove();
  }
};

$(document).ready(function() {
  disableOnEnter('websites');
});
function disableOnEnter(field_name) {
  $('[name="'+field_name+'[]"]').keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
}
// PERMALINK

$(function () {
  $('.permalink').keyup(function() {
    checkPermalink($(this));
  });
});
function checkPermalink(field) {
    //field.parent().parent().find(".help-inline").text("")
    //field.parent().parent().parent().removeClass("error");
  var _id = $('[name="_id"]').val();
  var collection = field.parent().find('[name="collection"]').val();
  var permalink = field.val().toLowerCase();

  field.parent().find('.permalink_print').text(permalink);
  field.parent().find('.control-label.pull-right').html('<img src="/img/loading-small.gif" />');
  if (ajax) ajax.abort();
  ajax = $.ajax({
    url: '/controlpanel/ajax/checkPermalink/',
    type: 'POST',
    data:{_id:_id, permalink:permalink, collection:collection},
    success: function(data) {
      if(data.success){
        field.parent().find('.control-label').html(data.msg);
        field.parent().addClass('has-success has-feedback');
        field.parent().find('.glyphicon').addClass('glyphicon-ok');
        field.parent().find('.glyphicon').removeClass('glyphicon-remove');
        field.parent().removeClass('has-error');
      } else {
        field.parent().find('.control-label').html(data.msg);
        field.parent().addClass('has-error has-feedback');
        field.parent().find('.glyphicon').addClass('glyphicon-remove');
        field.parent().find('.glyphicon').removeClass('glyphicon-ok');
        field.parent().removeClass('has-success');
      }
    }
  });
}

// EVENTS

window.invitePartner = function(id) {
  var _id = $('[name="_id"]').val();
  var event_name = $('[name="title"]').val();
  var collection = 'events';
  var data = JSON.parse($('#'+id).val());
  $('#'+id).parent().find('button').parent().prepend('<span class="loading-box"><img src="/img/loading-small.gif" /></span>');
  $('#'+id).parent().find('button').attr('disabled','disabled');
  $('#'+id).parent().find('button').html(__('Inviting'));
  $.ajax({
    url: '/controlpanel/ajax/invitePartner/',
    type: 'POST',
    data:{doc_id:_id, data:data, event_name:event_name, collection:collection},
    success: function(data) {
      if(data.success){
        $('#'+id).parent().find('button').html(__('Invited'));
        $('#'+id).parent().find('.loading-box').remove();
        $('.main-list-notconfirmed').append('<div class="alert alert-info"><div class="clearfix"><div class="pull-left"><b>'+data.display_name+'</b><input type="hidden" value="'+JSON.stringify(data)+'" name="partnersnotconfirmed[]"></div><div class="pull-right"><a onclick="deleteTemp(this,\''+data._id.toString()+'\');return false;" href="#"><i class="glyphicon glyphicon-remove"></i></a>&nbsp;&nbsp;&nbsp;<a target="_blank" href="/'+data.permalink+'/"><i class="glyphicon glyphicon-eye-open"></i></a></div></div></div>');
        $('.main-list-notconfirmed-title').show();
        $('.main-list-notconfirmed-title').removeClass('hide');
      } else {
        $('#'+id).parent().find('button').removeAttr('disabled');
        $('#'+id).parent().find('button').html(__('Invite'));
      }
    }
  });
};
window.updatePartners = function() {
  var _id = $('[name="_id"]').val();
  var collection = $('[name="collection"]').val();
  var partners = [];
  $('.main-list').find('input').each(function(){
    partners.push(JSON.parse($(this).val()));
  });
  $.ajax({
    url: '/controlpanel/ajax/updatePartners/',
    type: 'POST',
    data:{_id:_id, partners:partners, collection:collection},
    success: function(data) {
      console.log(data);
      console.log($('#permalink').parent().parent());
    }
  });
};

window.deletePartner = function(t,id) {
  var _id = $('[name="_id"]').val();
  var collection = $('[name="collection"]').val();
  var toremove = $(t).parent().parent().parent();
  $(t).parent().parent().html('<div class="text-center"><span class="loading-box"><img src="/img/loading-small.gif" /></span></div>');
  var partners = [];
  $('.main-list').find('input').each(function(){
    partners.push(JSON.parse($(this).val()));
  });
  $.ajax({
    url: '/controlpanel/ajax/updatePartners/',
    type: 'POST',
    data:{_id:_id, partners:partners, collection:collection},
    success: function() {
      $.ajax({
        url: '/controlpanel/ajax/deletePartner/',
        type: 'POST',
        data:{_id:_id, id_partner:id, collection:collection},
        success: function() {
          toremove.remove();
          /*
          $.ajax({
            url: "/controlpanel/ajax/recreatePartnersEvent/",
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
};

window.recreatePartnersEvent = function() {
  $.ajax({
    url: '/controlpanel/ajax/recreatePartnersEvent/',
    type: 'POST',
    data:{id:$('[name="_id"]').val()},
    success: function(data) {
      //$(t).parent().parent().parent().remove();
      console.log(data);
      console.log($('#permalink').parent().parent());
    }
  });
};

window.searchPartners = function() {
  var partners = [];
  var partnersnotconfirmed = [];
  $('input[name=partners\\[\\]]').each(function(){
    partners.push(JSON.parse($(this).val())._id);
  });
  $('input[name=partnersnotconfirmed\\[\\]]').each(function(){
    partnersnotconfirmed.push(JSON.parse($(this).val())._id);
  });
  ajax = $.ajax({
    url: '/controlpanel/ajax/searchPartners/',
    type: 'POST',
    data:{search:$('#search_input').val()},
    success: function(data) {
      var str = '';
      for (var a=0;a<data.length;a++) {
        var status = '';
        if (partners.length && partners.indexOf(data[a]._id.toString())!=-1){
          status = 'partner';
        } else if (partnersnotconfirmed.length && partnersnotconfirmed.indexOf(data[a]._id.toString())!=-1){
          status = 'partnernotconfirmed';
        }
        str+='<div class="alert alert-info"><div class="clearfix">\n';
        str+='<h4 class="pull-left">'+data[a].display_name+'</h4>\n';
        str+='<span class="pull-right">\n';
        str+='<input type="hidden" id="'+data[a]._id+'" value=\''+JSON.stringify(data[a])+'\' />\n';
        str+='<button class="btn btn-small'+(status ? ' disabled' : '')+'" '+(!status ? 'onclick="invitePartner(\''+data[a]._id.toString()+'\');"' : '')+'>'+(status=='partner' ? __('Already partner') : (status=='partnernotconfirmed' ? __('Already invited') : __('Invite')))+'</button>\n';
        str+='</span>\n';
        str+='</div></div>\n';
      }
      if (str) {
        str = '<hr />'+str+'\n';
      } else {
        str = __('No partners found');
      }
      $('#search_result').html(str);
    }
  });
};

// MEMBERS

window.updateMembers = function() {
  var _id = $('[name="_id"]').val();
  var collection = $('[name="collection"]').val();
  var members = [];
  $('.main-list').find('input').each(function(){
    members.push(JSON.parse($(this).val()));
  });
  $.ajax({
    url: '/controlpanel/ajax/updateMembers/',
    type: 'POST',
    data:{_id:_id, members:members, collection:collection},
    success: function(data) {
      console.log(data);
      console.log($('#permalink').parent().parent());
    }
  });
};

window.deleteMember = function(t,id) {
  if($('input[name=members\\[\\]]').length>1) {
    $(t).parent().parent().html('<div class="text-center"><span class="loading-box"><img src="/img/loading-small.gif" /></span></div>');
    window.updateMembers();
    $.ajax({
      url: '/controlpanel/ajax/recreateUserCrews/',
      type: 'POST',
      data:{id:id},
      success: function(data) {
        $(t).parent().parent().parent().remove();
        console.log(data);
        console.log($('#permalink').parent().parent());
      }
    });
  } else {
    window.showModal('errors', __('Crews need at least 1 member'));
  }
};

window.inviteMember = function(id) {
  var _id = $('[name="_id"]').val();
  var crew_name = $('[name="crew_name"]').val();
  var permalink = $('[name="permalink"]').val();
  var data = JSON.parse($('#'+id).val());
  $('#'+id).parent().find('button').parent().prepend('<span class="loading-box"><img src="/img/loading-small.gif" /></span>');
  $('#'+id).parent().find('button').attr('disabled','disabled');
  $('#'+id).parent().find('button').html(__('Inviting'));
  $.ajax({
    url: '/controlpanel/ajax/inviteMember/',
    type: 'POST',
    data:{doc_id:_id, data:data, crew_name:crew_name, permalink:permalink},
    success: function(res) {
      console.log(res);
      if(res.success){
        $('#'+id).parent().find('button').html(__('Invited'));
        $('#'+id).parent().find('.loading-box').remove();
        $('.main-list-notconfirmed').append('<div class="alert alert-info"><div class="clearfix"><div class="pull-left"><b>'+data.display_name+'</b><input type="hidden" value="'+JSON.stringify(data)+'" name="membersnotconfirmed[]"></div><div class="pull-right"><a onclick="deleteTemp(this,\''+data._id.toString()+'\');return false;" href="#"><i class="glyphicon glyphicon-remove"></i></a>&nbsp;&nbsp;&nbsp;<a target="_blank" href="/'+data.permalink+'/"><i class="glyphicon glyphicon-eye-open"></i></a></div></div></div>');
        $('.main-list-notconfirmed-title').show();
        $('.main-list-notconfirmed-title').removeClass('hide');
      } else {
        $('#'+id).parent().find('button').removeAttr('disabled');
        $('#'+id).parent().find('button').html(__('Invite'));
      }
    }
  });
};
window.searchMembers = function() {
  var members = [];
  var membersnotconfirmed = [];
  $('input[name=members\\[\\]]').each(function(){
    members.push(JSON.parse($(this).val())._id);
  });
  $('input[name=membersnotconfirmed\\[\\]]').each(function(){
    membersnotconfirmed.push(JSON.parse($(this).val())._id);
  });
  ajax = $.ajax({
    url: '/controlpanel/ajax/searchMembers/',
    type: 'POST',
    data:{search:$('#search_input').val()},
    success: function(data) {
      var str = '';
      for (var a=0;a<data.length;a++) {
        var status = '';
        if (members.length && members.indexOf(data[a]._id.toString())!=-1){
          status = 'member';
        } else if (membersnotconfirmed.length && membersnotconfirmed.indexOf(data[a]._id.toString())!=-1){
          status = 'membernotconfirmed';
        }
        str+='<div class="alert alert-info"><div class="clearfix">\n';
        str+='<h4 class="pull-left">'+data[a].display_name+'</h4>\n';
        str+='<span class="pull-right">\n';
        str+='<input type="hidden" id="'+data[a]._id+'" value=\''+JSON.stringify(data[a])+'\' />\n';
        str+='<button class="btn btn-small'+(status ? ' disabled' : '')+'" '+(!status ? 'onclick="inviteMember(\''+data[a]._id.toString()+'\');"' : '')+'>'+(status=='member' ? __('Already member') : (status=='membernotconfirmed' ? __('Already invited') : __('Invite')))+'</button>\n';
        str+='</span>\n';
        str+='</div></div>\n';
      }
      if (str) {
        str = '<hr />'+str+'\n';
      } else {
        str = __('No members found');
      }
      $('#search_result').html(str);
    }
  });
};

/* EMAILS */

window.emailAdd = function(){
  $('#email_add').parent().parent().find('.help-inline').html('<img src="/img/loading-small.gif" />&nbsp;&nbsp;Checking email');
  $('#email_add').parent().parent().find('button').attr('disabled','disabled');
  var email = $('#email_add').val();
  if (window.Validators.is_email(email)) {
    $('#email_add').parent().parent().find('.help-inline').html('<img src="/img/loading-small.gif" />&nbsp;&nbsp;Sending verification email');
    var _id = $('[name="_id"]').val();
    var collection = $('[name="collection"]').val();
    $.ajax({
      url: '/controlpanel/ajax/sendVerificationEmail/',
      type: 'POST',
      data:{doc_id:_id, email:email, collection:collection},
      success: function(data) {
        if(data.success){
          $('#email_add').parent().parent().find('.help-inline').html('<i class="glyphicon glyphicon-ok"></i> '+data.msg);
          $('#email_add').parent().parent().parent().removeClass('error');
        } else {
          $('#email_add').parent().parent().find('.help-inline').html('<i class="glyphicon glyphicon-remove"></i> '+data.msg);
          $('#email_add').parent().parent().parent().addClass('error');
        }
      }
    });
  } else {
    $('#email_add').parent().parent().find('.help-inline').html('Wrong email format');
    $('#email_add').parent().parent().parent().addClass('error');
  }
  $('#email_add').bind('keyup',function() {
    $('#email_add').parent().parent().find('.help-inline').html('');
    $('#email_add').parent().parent().find('button').removeAttr('disabled');
    $('#email_add').parent().parent().parent().removeClass('error');
  });
};

window.emailRemove = function(t){
  var _id = $('[name="_id"]').val();
  var collection = $('[name="collection"]').val();
  var email = $($(t).parent().parent().parent().find('input')[0]).val();
  $(t).parent().parent().find('.help-inline').html('<img src="/img/loading-small.gif" />&nbsp;&nbsp;Deleting');
  var divremove = $(t).parent().parent().parent();

  $.ajax({
    url: '/controlpanel/ajax/deleteEmail/',
    type: 'POST',
    data:{doc_id:_id, email:email, collection:collection},
    success: function(data) {
      if(data.success){
        divremove.remove();
      } else {
        $('#email_add').parent().parent().find('.help-inline').html('<i class="glyphicon glyphicon-remove"></i> '+data.msg);
      }
    }
  });
};

window.setPrimary = function(t){
  var _id = $('[name="_id"]').val();
  var collection = $('[name="collection"]').val();
  var email = $($(t).parent().parent().parent().find('input')[0]).val();
  var div = $(t).parent().parent().parent();
  $(t).parent().parent().find('.help-inline').html();
  $(t).parent().parent().find('.add-on');
  $(t).parent().parent().find('.add-on').remove();
  $(t).parent().parent().find('.input-append').append('<span class="add-on"><i class="glyphicon glyphicon-lock"></i></span>');
  $(t).parent().parent().find('.help-inline').html('<img src="/img/loading-small.gif" />&nbsp;&nbsp;Deleting');
  $.ajax({
    url: '/controlpanel/ajax/setPrimary/',
    type: 'POST',
    data:{doc_id:_id, email:email, collection:collection},
    success: function(data) {
      if(data.success){
        div.find('.help-inline').html('');
      }
    }
  });
};

window.setNewsletter = function(email, t){
  var _id = $('[name="_id"]').val();
  $('[name="collection"]').val();
  var val = [];
  $(t).parent().parent().find('.help-inline').html('<img src="/img/loading-small.gif" />&nbsp;&nbsp;Updating');
  $(t).parent().parent().find('input').each(function() {
    if (this.checked) val.push($(this).attr('name'));
  });
  var lang = $(t).parent().parent().find('select').val();
  $.ajax({
    url: '/controlpanel/ajax/setNewsletter/',
    type: 'POST',
    data:{doc_id:_id, newsletters:val.concat(','), email:email, lang:lang},
    success: function() {
      $(t).parent().parent().find('.help-inline').html('');
    }
  });
};
/* MAPS */
var map;
var bounds;
var map_add;
var allMarkers = [];

window.showMapAdd = function(){
  window.showModal('search_map', false, addOnClose);
  if (!map_add) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(createMapAdd);
    }
  }
};

/* MAPS USER GLOBAL*/
window.initializeMap = function(data) {
  var myOptions = {
    zoom: 17,
    center: new google.maps.LatLng(1,1) ,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: true
  };

  map= new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  bounds=new google.maps.LatLngBounds();
  /*
  infowindow = new google.maps.InfoWindow({
    content: 'oi'
  });
  */
  $.each(data, function(index, c) {
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
};

/* MAPS PICKER*/
var defaultLat = 41.8929163;
var defaultLng = 12.482519899999943;
var defaultBounds = null;
var center;

function createMapAdd(){
  center = new google.maps.LatLng(defaultLat,defaultLng),
  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(defaultLat,defaultLng),
    new google.maps.LatLng(defaultLat,defaultLng)
  );

    //if(navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

  var options = {
    map: '#map_canvas_add',
    location: [defaultLat,defaultLng],
    markerOptions: {draggable: true},
    details: 'form#search-map-form',
    types: ['geocode', 'establishment'],
    bounds: defaultBounds
  };

  $('#find').click(function(){
    $('#geocomplete').trigger('geocode');
  });

  $('#geocomplete').geocomplete(options)
    .bind('geocode:result', function(event, result){
      //geo_add = result; // ?
      console.log('Result: ' + result.formatted_address);
    })
    .bind('geocode:error', function(event, status){
      console.log('ERROR: ' + status);
    })
    .bind('geocode:multiple', function(event, results){
      console.log('Multiple: ' + results.length + ' results found');
    });
  map_add =  $('#geocomplete').geocomplete('map');
  map_add.setCenter(center);
  map_add.setZoom(8);
  $('#geocomplete').bind('geocode:dragged', function(event, latLng){
    $('input[name=lat]').val(latLng.lat());
    $('input[name=lng]').val(latLng.lng());
    $('input[name=bounds]').val(latLng.lat(),latLng.lng(),latLng.lat(),latLng.lng());
    $('input[name=viewport]').val(latLng.lat(),latLng.lng(),latLng.lat(),latLng.lng());
  });
}

function addOnClose() {

  var obj = $('#search-map-form').serializeObject();
  if (obj.lat && obj.lng) {
    var tmp = $('#sortable .alert:first').clone();
    tmp.removeClass('hide');
    tmp.find('.pull-left').html('<h4>'+obj.country+(obj.locality ? ', '+obj.locality : '')+'</h4><div>'+obj.lat+' / '+obj.lng+'</div><input type="hidden" name="locations[]" value=\''+JSON.stringify(obj)+'\' />');
    $('#sortable').append(tmp);
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

window.deleteLocation = function(button) {
  var div = $(button).parent().parent().parent();
  var obj = $.parseJSON(div.find('input').val());
  for (var item in allMarkers) {
    if (allMarkers[item].position.lat()==obj.lat && allMarkers[item].position.lng()==obj.lng) {
      allMarkers[item].setMap(null);
      delete allMarkers[item];
      if (div.parent().children().length>1) {
        div.remove();
      } else {
        div.find('.pull-left').html('');
        div.hide();
      }
    }
  }
};

window.onPositionUpdate = function(position) {
  defaultLat = position.coords.latitude;
  defaultLng = position.coords.longitude;
  var latlng = new google.maps.LatLng(defaultLat,defaultLng);
  new google.maps.Marker({
    map: map_add,
    position: latlng,
    draggable: true
  });
  map_add.setCenter(latlng);
  map_add.setZoom(17);
};

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
