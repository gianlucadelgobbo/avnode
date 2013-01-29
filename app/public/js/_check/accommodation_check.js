// JavaScript Document
	var label_ctr_one_is_checked_0={"code0":"please select 1 option"};

	function setChecked(item,price){
		$(item).attr('checked','checked');
		setPrice(item,price);
	}
	function setPresence(id){
		clearError($("#utenti"));
		if($("#presente"+id).attr('checked')){
			$("#rowTitPresenza"+id).show();
			$("#rowPresenza"+id).show();
			$("#rowTitAccommodation"+id).show();
			$("#rowAccommodation"+id).show();
			$("#presenteSI"+id).show();
			$("#presenteNO"+id).hide();
			$("#presente"+id).parent().addClass("greenbox");
			$("#presente"+id).parent().removeClass("redbox");
		} else {
			$("#rowTitPresenza"+id).hide();
			$("#rowPresenza"+id).hide();
			$("#rowTitAccommodation"+id).hide();
			$("#rowAccommodation"+id).hide();
			$("#presenteSI"+id).hide();
			$("#presenteNO"+id).show();
			$("#presente"+id).parent().removeClass("greenbox");
			$("#presente"+id).parent().addClass("redbox");
		}
		setTotal();
	}
	function setDays(id){
		aa = $("#accArrDate"+id).parent().parent().find('select');
		data_i = aa[0].value.split('-');
		data_f = aa[1].value.split('-');
		one_day=1000*60*60*24;
		daysTot = 0;
		if (data_i.length+data_f.length==6) {
			days = (new Date(data_f[0],data_f[1]-1,data_f[2])-new Date(data_i[0],data_i[1]-1,data_i[2]))/one_day;
		} else {
			days = 0;
		}
		$("#days"+$("#accArrDate"+id).parent().parent().parent().attr('id').replace("rowPresenza","")).val(days);
		setAccType(id);
	}
	function setTotal(){
		tottot = 0;
		$(".price").each(function(index){
		    if ($("#presente"+$(this).parent().attr('id').replace("rowAccommodation","")).attr("checked")=="checked") tottot+= parseInt($(this).html().split(',')[0]);
		});
		$("#total b").html(tottot+",00 €");
	}
	function setAccType(id){
		tot = (price[$("#accType"+id).val()]['price']*$("#days"+id).val());
		$("#price"+id).html(tot+",00 €");
		if (tot) {
			$("#price"+id).removeClass("price0");
		} else {
			$("#price"+id).addClass("price0");
		}
		$("#"+$("#accType"+id).val()+id).parent().children().hide();
		$("#"+$("#accType"+id).val()+id).show();
		setTotal();
	}
	function setPrice(item,price){
		aa = $(item).parent().parent().find('select');
		data_i = aa[0].value.split('-');
		data_f = aa[1].value.split('-');
		one_day=1000*60*60*24;
		daysTot = 0;
		if (data_i.length+data_f.length==6) {
			days = (new Date(data_f[0],data_f[1]-1,data_f[2])-new Date(data_i[0],data_i[1]-1,data_i[2]))/one_day;
			if (!$(item+':checked').length && $(item).parent().parent().find('select')) {
				str = "<span style=\"color:#EEE\">00,00 €</span>";
				$(item).parent().parent().find('.days').val(0);
			} else {
				str = "<span>"+(price*days)+",00 €</span>";
				$(item).parent().parent().find('.days').val(days);
				
			}
			$(item).parent().parent().find('.price').html(str);
			$(item).parent().parent().parent().find('tr').each(function() {
				tmp = $(this).find('.days').val();
				if (tmp>0) daysTot+= parseInt(tmp);
			});
			
			$('#total').html("<b>"+(price*daysTot)+",00 €</b>");
		}
	}
	function check_accommodation(){
		var esito=true;
		var tmpEsito;
		var tmpElem;
		var tmpErrorMsg;
		var firstError=false;
		items = $("#accommodation").find("input[type='checkbox']:checked");
		$.fn.reverse = [].reverse;
		items.reverse();
		atleastone=false;
		items.each(function () {
			if ($("#presente"+$(this).val()).val()) atleastone = true;
			tmpElem=$("#accPhone"+$(this).val());
			if ($("#accPhone"+$(this).val()).val()==defaultPhone) {
				tmpEsito = 0;
			} else {
				tmpEsito=checkTextLenght(tmpElem,'1','255');
			}
			if(tmpEsito!=1){
				esito=false;
				firstError="accPhone"+$(this).val();
				tmpErrorMsg=eval('label_ctr_lpm_step_2.code2');
				showError(tmpElem,tmpErrorMsg);
			}
		    //console.log($("#accPhone"+$(this).val()).val());
		    //console.log($("#accArrDate"+$(this).val()).val());
		    //console.log($("#accDepDate"+$(this).val()).val());
			tmpElem=$("#accArrDate"+$(this).val());
			tmpEsito=isDate(tmpElem.val());	
			if(tmpEsito==false){
				esito=false;
				firstError="accPhone"+$(this).val();
				tmpErrorMsg=eval('label_ctr_lpm_step_2.code4');
				showError(tmpElem,tmpErrorMsg);
			}
			tmpElem=$("#accDepDate"+$(this).val());
			tmpEsito=isDate(tmpElem.val());	
			if(tmpEsito==false){
				esito=false;
				firstError="accPhone"+$(this).val();
				tmpErrorMsg=eval('label_ctr_lpm_step_2.code3');
				showError(tmpElem,tmpErrorMsg);
			}
		});
		if(atleastone==false){
			esito=false;
			
			firstError="utenti";
			tmpErrorMsg=eval('label_ctr_lpm_step_2.code5');
			showError($("#utenti"),tmpErrorMsg);
		}
		
	/*
		
	var str = "";
	var elems=document.getElementsByName("item[]");
	alert(elems.length);
	for(var i=0;i<elems.length; i++){
		if(elems[i][0].checked){
			str = elems[i][0].value+"\n";
		}
	}
		
			tmpEsito=one_is_checked('accommodation');	
			if(tmpEsito!=1){
				esito=false;
				firstError="accommodation";
				//alert('label_ctr_one_is_checked_0.code'+(tmpEsito*-1));
				tmpErrorMsg=eval('label_ctr_one_is_checked_0.code'+(tmpEsito*-1));
				showErrors('accommodation','errordiv',tmpErrorMsg);
			}
			
			
*/

		if(!esito && firstError!=false){
			window.location.hash="#label_"+firstError;
		}		
		return esito;
	}		
