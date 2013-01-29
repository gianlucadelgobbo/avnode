
function ajaxSlideShowLoader(id,size){	
	var img_array=new Array();
	var trgt = this;
	var current_obj=0;
	$.ajax({
		url: "/_php/ajax/playlistPreview.php?id="+id+"&size="+size,
		type: 'GET',
		dataType: "json",
		success: function(data) {
			for (i = 0; i < data.length; i++) {
				img_array.push(data[i])
				MM_preloadImages(data[i]);
			}
			$("#a"+id).mouseover(function() {
				trgt.startFnc();
			});
			$("#a"+id).mouseout(function() {
				trgt.stopFnc();
			});
		}
	});
	this.stopFnc=function(){
		clearInterval(this.timerId);
	}
	this.startFnc=function(){
		trgt.current_obj = 0;
		trgt.img_array = img_array;
		trgt.timerId = setInterval(
            function(){
                trgt._ss(trgt); 
            },
            500);		
           
	}
	this._ss=function(trgt){
		document.getElementById("slide"+id).src=trgt.img_array[trgt.current_obj];
		trgt.current_obj=((trgt.current_obj+1)<trgt.img_array.length ? trgt.current_obj+1 : 0);
	}
}
