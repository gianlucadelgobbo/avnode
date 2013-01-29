(function($){
$.fn.cloneElements = function (ctrl,l,c){
	var limit = l;
	if (ctrl) var controls = $('#'+ctrl);
	var div = $(this);
	if (c) var callback = c;
	var myclone = div.children().first().clone();
	var index = 0;
	div.children().each(function(){
		myCloneSetup($(this));
		index++;
	});
	index--;
	if (controls) controls.find('.multiple_minus').click(function(){myRemove();return false;});
	if (controls) controls.find('.multiple_plus').click(function(){myClone();return false;});

	updateButtons();

	function createNew() {
		item = myclone.clone();
		item.find('input').val('');
		item.find('select').find('option:first').attr("selected","selected");
		myCloneSetup(item);
		return item;
	}

	function myCloneSetup(item) {
		item.find('label, div,input, select').each(function(){
			var that = $(this);
			nameAttr = that.attr("name");
			idAttr = that.attr("id");
			/* Normalize field name attributes */
			if(nameAttr){
				if (nameAttr.indexOf("[0]")){
					that.attr("name", nameAttr.replace("[0]","["+index+"]"));
				} else {
					prefix = nameAttr.replace('[0]','');
					//This is a subform (thus prefix is not the same as below)
					that.attr("name", prefix+"["+index+"]");
				}
			}				
			/* Normalize field id attributes */
			if (idAttr) {
				/* Normalize attached label */
				idAttr = idAttr.replace("0","");
				item.find("label[for='"+idAttr+"']").each(function(){
					$(this).attr("for", idAttr + index);
				});
				that.attr("id", idAttr + index);
			}
		});
		return item;
	}
	
	function updateButtons() {
		var a = 0;
		div.children().each(function(item){
			//$(this).attr('id','item'+a);
			$(this).find('.counter').html(a+1);
			if (controls) controls.find('.multiple_minus').toggle(a>0);
			if (controls) controls.find('.multiple_plus').toggle(a<limit);
			a++;
		});
	}
	
	function myRemove(item) {
		div.children().last().remove();
		updateButtons();
	}
	
	function myClone(item) {
		index++;
		item = createNew();
		div.append(item);
		updateButtons();
		if (callback) callback(item);
	}
}
})(jQuery);
