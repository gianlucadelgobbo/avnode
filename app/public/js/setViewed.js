
	jQuery(document).ready(function(){
		jQuery.ajax({
			url: 'https://flxer.net/_php/ajax/setViewed.php',
			data:{tab:tab,id:id},
			type: 'GET',
			success: function(data) {
				console.log(data);
			}
		});
	});
