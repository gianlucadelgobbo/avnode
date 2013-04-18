<div class="cntTitPalette"><h3><? echo($this->getLabel("Importa playlist XML")); ?></h3></div>
<form method="post" name="playlist_new" id="playlist_new" action="#" enctype="multipart/form-data">
	<div id="avatar">
		<label><? echo($this->getLabel("FLxER playlist file")) ?></label>	
		<div id="file-uploader">       
			<noscript>          
				<p><? echo($this->getLabel("Please enable JavaScript to Upload.")) ?></p>
			</noscript>
		</div>
		<div id="uploadcomplete">&nbsp;</div>
	</div>

	<div class="boxFormLpmSubmit right">
		<input type="submit" name="submit_playlist_new" id="submit_playlist_new" value="<? echo($this->getLabel("Salva")) ?>" onclick="return check_playlist_new();" class="pulsBig" />
	</div>
	<br class="myClear" />
</form>

<script type="text/javascript"><!--
	$(document).ready(function () {
		//nuovo uploader
		var uploader = new qq.FileUploader({
			element: document.getElementById('file-uploader'),   				
			action: '/_php/ajax/upload.playlist.php?userid=<? echo $_SESSION['user_id']; ?>',
	        multiple: 			false,
	        maxConnections: 	3,
	        allowedExtensions: 	["xml"],	// .zip, .jpg, .png, .gif, .mov, .mp4, .m4v, .mpg, .mpeg, .flv, .f4v, .wmv, .avi
	        sizeLimit: 			1024000,   
	        minSizeLimit: 		0,                             
			onSubmit: function(id, fileName){
				clearError(this);
			},
			onComplete: function(id, fileName, responseJSON){
				var json = eval(responseJSON);
				var response = "res=success&name="+responseJSON['filename']+"&tmp_name="+responseJSON['filename']+"&ff=55x55,90x68,280x210,400x300&type=img&dir_name="+responseJSON['dir_name'];
				ajax_upload_res_param=response;
				str = "";
				str2 = "";
				//for (a=0;a<json.lib.length;a++) str+="<li>"+json.lib[a][0]+" "+json.lib[a][1]+"<input type='hidden' name='lib[]' value='"+json.lib[a][0]+"' /></li>";
				for (a=0;a<json.lib.length;a++) str+="<li>"+json.lib[a][1]+"<input type='hidden' name='lib[]' value='"+json.lib[a][0]+"' /></li>";
				str = "<h3><? echo($this->getLabel("Nuova playlist")) ?>: "+json.name+"<input type='hidden' name='title' value='"+json.name+"' /></h3><h4 id='label_found'><? echo($this->getLabel("Footage found")) ?></h4><ol id='found'>"+str+"</ol>";
				//for (a=0;a<json.libNo.length;a++) str2+="<li>"+json.libNo[a][0]+" "+json.libNo[a][1]+"</li>";
				for (a=0;a<json.libNo.length;a++) str2+="<li>"+json.libNo[a][1]+"</li>";
				str2 = "<h4><? echo($this->getLabel("Footage NOT found")) ?></h4><ol>"+str2+"</ol>";
				document.getElementById('uploadcomplete').innerHTML = str+str2;
				document.getElementById('uploadcomplete').style.display = "block";
			}
		});	
	});		
//-->
</script>
<?
//}
?>
