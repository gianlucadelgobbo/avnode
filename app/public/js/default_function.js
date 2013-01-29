// JavaScript Document
var errorClassName="errorMsgField";

function clearHtmlError( editorInstance ){
	clearHtmlEditorErrors(editorInstance.Name,"msgErrorCnt_"+editorInstance.Name);
}

function showErrors(elem,errorMsg){
	clearErrors(elem);
	elem.last().parent().parent().append("<span class=\"errorMsg\">"+errorMsg+"</span>");
	elem.last().parent().parent().find('label').addClass(errorClassName);
}

function showError(elem,errorMsg){
	clearError(elem);
	elem.parent().append("<span class=\"errorMsg\">"+errorMsg+"</span>");
	elem.addClass(errorClassName);
}
function clearErrors(elem){
	$(elem).parent().parent().find('.errorMsg').remove();
	$(elem).parent().parent().find('label').removeClass(errorClassName);
}
function clearError(elem){
	$(elem).parent().find('label').removeClass(errorClassName);
	$(elem).parent().find('.errorMsg').remove();
	$(elem).removeClass(errorClassName);
}
/*
function showErrors(elemName,msgErrorCntId,errorMsg){
	elem.append('<span class="errorMsg">'+errorMsg+'</span>');
	//document.getElementById(msgErrorCntId).innerHTML=errorMsg;
	//document.getElementById(msgErrorCntId).style.display="block";
	var elems=document.getElementsByName(elemName+"[]");
	for(var i=0;i<elems.length; i++){
		addClassAttribute(document.getElementById("label_"+elems[i].id),errorClassName);
		//document.getElementById("label_"+elems[i].id).setAttribute('class',errorClassName);
		//document.getElementById("label_"+elems[i].id).style.backgroundColor="#FADADD";
	}
}
function clearErrors(elemName,msgErrorCntId){
	document.getElementById(msgErrorCntId).innerHTML="";
	document.getElementById(msgErrorCntId).style.display="n_";
	var elems=document.getElementsByName(elemName+"[]");
	for(var i=0;i<elems.length; i++){
		removeClassAttribute(document.getElementById("label_"+elems[i].id),errorClassName);
		//document.getElementById("label_"+elems[i].id).setAttribute('class','');	
		//document.getElementById("label_"+elems[i].id).style.backgroundColor="";
	}
}
*/
function showHtmlEditorErrors(elemName,msgErrorCntId,errorMsg){
	document.getElementById(msgErrorCntId).innerHTML=errorMsg;
	document.getElementById(msgErrorCntId).style.display="block";
	addClassAttribute(document.getElementById("label_"+elemName),errorClassName);
}
function clearHtmlEditorErrors(elemName,msgErrorCntId){
	document.getElementById(msgErrorCntId).innerHTML="";
	document.getElementById(msgErrorCntId).style.display="none";
	removeClassAttribute(document.getElementById("label_"+elemName),errorClassName);	
}

function checkTextLenght(elem,min,max){
	var res=0;
	min=parseInt(min);
	max=parseInt(max);		
	var str=trim(elem.val());
	if(str.length>=min && str.length<=max){
		res=1
	}
	return res;
}
function checkTextAreaLenght(elem,min,max){
	var res=0;
	min=parseInt(min);
	max=parseInt(max);		
	var str=trim(elem.val());
	if(str.length>=min && str.length<=max){
		res=1
	}
	return res;
}
function isNumber(elem){

	var floatValue = parseFloat(elem.val());
	if (isNaN(floatValue) || floatValue!=elem.val()) {
		return false;
	} else {
		return true;
	}
}
function trim(str) {
	var res="";
	if(str){
		if(str.length>0){
			res=ltrim(rtrim(str, "\\s"), "\\s");
		}
	}
	return res;
}
 
function ltrim(str, chars) {
//	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
function textCounter(field,cntfield,maxlimit) {
	if (field.val().length > maxlimit) 
		field.val() = field.val().substring(0, maxlimit);
	else
		document.getElementById(cntfield).val() = maxlimit - field.val().length;
}

function is_email(email){
	var res=0;
	email=trim(email);
	if(window.RegExp){
		var rexp=new RegExp("^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.([a-zA-Z]){2,4})$");
		if(rexp.test(email))
			res=1;
	}else{
		if((email.indexOf("@") > 0) && (email.indexOf(".") > 0))
			res=1;
	}
	return res;
}

function is_date(aaaa,mm,gg){
	var res=1;
	mmNew = parseFloat(mm)-1;
	mm = (mmNew.toString().length==1 ? "0"+mmNew : mmNew);
	var dteDate=new Date(aaaa,mm,gg);
	if (!((gg==dteDate.getDate()) && (mm==dteDate.getMonth()) && (aaaa==dteDate.getFullYear())))
		res=0;
	return res;
}
function getValidName(str){
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz";
	var n_str=str;
	var nn_str="";
	var nnn_str="";
	var i=0;
	while(i<str.length && SAFECHARS.indexOf(str.charAt(i))==-1){
		i++;
		n_str=str.substr(i);
	}
	i=n_str.length;
	nn_str=n_str;
	while(i>0){ // && SAFECHARS.indexOf(n_str.charAt(i))==-1){
		i--;
		if(SAFECHARS.indexOf(n_str.charAt(i))!=-1){
			break;
		}else{
			nn_str=n_str.substring(0,i);
		}
	}
	SAFECHARS+="-_";
	for(i=0;i<nn_str.length;i++){
		if(SAFECHARS.indexOf(nn_str.charAt(i))!=-1){
			nnn_str+=nn_str.charAt(i);
		}
	}
	return nnn_str;
}
function stripHTMLTag(strInputCode){
 	 	/*strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
 		 	return (p1 == "lt")? "<" : ">";
 		});
		*/
 		return jsHtmlEntitiesDecode(strInputCode.replace(/<\/?[^>]+(>|$)/g, ""));
}
function jsHtmlEntitiesDecode(str){
    try
	{
		var  tarea=document.createElement('textarea');
		tarea.innerHTML = str; 
		tarea.parentNode.removeChild(tarea);
		return tarea.val();
	}
	catch(e)
	{
		document.getElementById("htmlconverter").innerHTML = '<textarea id="innerConverter">' + str + '</textarea>';
		var content = document.getElementById("innerConverter").val();
		document.getElementById("htmlconverter").innerHTML = "";
		return content;
	}	
}
function checkMultipleLocation(functionName,elemName,minVal,maxVal,errMsgName,errMsgCnt){
	var res=1;
	//per ogni elemento
	var figli=$("multiple_location").childElements();
	var currId=0;
	var tmpEsit=0;
	var errMsg="";
	for(var i=0;i<figli.length;i++){
		currId=figli[i].id.substring(figli[i].id.lastIndexOf("_")+1);
		tmpEsit=eval(functionName)($(elemName+currId),minVal,maxVal);
		if(tmpEsit!=1){
			errMsg=eval(errMsgName+".code"+(tmpEsit*-1))
			showError($(elemName+currId),errMsgCnt+currId,errMsg);
			res=0;
		}
	}
	return res;
}
function checkMultiple(functionName,elemName,minVal,maxVal,errMsgName,errMsgCnt){
	var res=1;
	//per ogni elemento
	var figli=$("#multiple_"+elemName).children();
	var currId=0;
	var tmpEsit=0;
	var errMsg="";
	for(var i=0;i<figli.length;i++){
		currId=figli[i].id.substring(figli[i].id.lastIndexOf("_")+1);
		tmpEsit=eval(functionName)($("#"+elemName+currId),minVal,maxVal);
		if(tmpEsit!=1){
			errMsg=eval(errMsgName+".code"+(tmpEsit*-1))
			showError($(elemName+currId),errMsg);
			res=0;
		}
	}
	return res;
}
function ajaxLoaderCallFunction(url,fnct){	
	this.url=url;
	this.divDest=divDest;	
	this.rObj = false; // XMLHttpRequest Object
	if (window.XMLHttpRequest) // try to create XMLHttpRequest
		this.rObj = new XMLHttpRequest();	
	if (window.ActiveXObject)	// if ActiveXObject use the Microsoft.XMLHTTP
		this.rObj = new ActiveXObject("Microsoft.XMLHTTP");		
	var thisobj=this	
	this.rObj.open("GET", this.url , true);
	this.rObj.onreadystatechange = function(){
		if (thisobj.rObj.readyState==4) {
			eval(fnct)(thisobj.rObj.responseText);
		}		
	};
	this.rObj.send(null); 	
}
// JavaScript Document

	function textAreaLenght(elem,min,max){
		return checkTextAreaLenght(elem,min,max);
	}

	function is_selected(elem,arg1,arg2){
		var res=0;
		if(elem.selectedIndex > 0)
			res=1
		return res;	
	}

	function one_is_checked(elemName){
		elems=$("[name='"+elemName+"']:checked");
		res = (elems.length ? 1 : 0);
		return res;
	}
	/*
	function is_checked(elemName){
		var res=0;
		elem=document.getElementById(elemName);
		if(elem.checked)
			res=1;
		return res;
	}

	function is_checked(elem){
		var res=0;
		if(elem.checked)
			res=1;
		return res;
	}
	*/
	
	function checkWebsite(elem,min,max){
		var res=0;
		if(elem.val()!="" && elem.val()!="http://"){
			if(checkTextLenght(elem,min,max)){
				if(elem.val().substring(0,4)=="http"){
					res=1;
				}
			}
		}else{
			res=1;
		}
		return res;
	}

	function checkEmail(elem,min,max){
		var res=0;
		var email=elem.val();
		if(checkTextLenght(elem,min,max)==1 && is_email(email)==1)
			res=1;
		return res;	
	}	

	function checkIntervalDate(cdstr,mindstr,maxdstr){
		var res=0;
		if(cdstr.val().length==10 && cdstr.val().substr(4,1)=="-" && cdstr.val().substr(7,1)=="-"){
			var curDateArray=cdstr.val().split("-");
			if(is_date(parseInt(curDateArray[0],10),(parseInt(curDateArray[1],10)),parseInt(curDateArray[2],10))==1){
				var currDate = new Date();	
				currDate.setFullYear(parseInt(curDateArray[0],10),(parseInt(curDateArray[1],10)-1),parseInt(curDateArray[2],10));
				var minDateArray=mindstr.split("-");
				var maxDateArray=maxdstr.split("-");
				var minDate = new Date();
				var maxDate = new Date();				
				minDate.setFullYear(parseInt(minDateArray[0],10),(parseInt(minDateArray[1],10)-1),parseInt(minDateArray[2],10));
				maxDate.setFullYear(parseInt(maxDateArray[0],10),(parseInt(maxDateArray[1],10)-1),parseInt(maxDateArray[2],10));
				if(currDate>=minDate && currDate<=maxDate){
					res=1;
				}else{
					res=-1;
				}
			}
		}
		return res;
	}
	function isInt(x) { 
		var y=parseInt(x); 
		if (isNaN(y)) return false; 
		return x==y && x.toString()==y.toString(); 
	} 
	function is_time(t){
   		res=true;
   		if (!isInt(t.substring(0,1))) res=false;
   		if (!isInt(t.substring(1,2))) res=false;
   		if (t.substring(2,3)!=":") res=false;
   		if (!isInt(t.substring(3,4))) res=false;
   		if (!isInt(t.substring(4,5))) res=false;
		return res;
	}
	
	function isDate(sDate) {
		if (sDate == "0000-00-00") {
			return false;
		} else {
			d = sDate.split("-");
			var scratch = new Date(d[0],d[1]-1,d[2]);
			if (scratch.toString() == "NaN" || scratch.toString() == "Invalid Date") {
				return false;
			} else {
				return true;		
			}
		}
	}
	
	/*
	function showLangDiv(elObj,el_cnt,lng){
		document.getElementById(el_cnt).innerHTML=elObj.innerHTML;
		document.getElementById("cnt_bio_"+lng).style.display="block";
	}
	*/
	function showLangDiv(lng){
		document.getElementById("label_"+lng).innerHTML=document.getElementById("a_bio_"+lng).innerHTML;
		document.getElementById("cnt_bio_"+lng).style.display="block";
		if (document.getElementById("cnt_tech_req_"+lng)) {
			document.getElementById("label_tech_req_li_"+lng).innerHTML=document.getElementById("a_tech_req_"+lng).innerHTML;
			document.getElementById("cnt_tech_req_"+lng).style.display="block";		
		}
	}
	
	function checklogin(elem,min,max,otherElem){
		var res=1;
		var uname=$(elem).val();		
		var gnuname=getValidName(uname);
		$("#"+otherElem).html(gnuname);
		if(checkTextLenght($(elem),min,max)==0){
			res=-2;
		}else if(gnuname!=uname){
			res=0;
		}
		return res;
	}
	
	function checkloginOnKeyUp(elem,min,max,otherElem,id_a){
		var tmpEsito=checklogin(elem,min,max,otherElem);
		if(tmpEsito!=1){
			tmpErrorMsg=eval('label_ctr_crew_checklogin_7.code'+(tmpEsito*-1));
			showError($(elem),tmpErrorMsg);
		}else{
			$.ajax({
				url: "/_php/ajax/checkLogin.php?u="+escape($(elem).val())+(id_a ? "&id="+id_a : ""),
				type: 'GET',
				success: function(data) {
					if(data=="<root>ko</root>"){
						showError($(elem),eval('label_ctr_crew_checklogin_7.code1'));					
					}
				}
			});
		}
	}

		
	function passwdCheckEdit(elem,min,max){
		res=1;
		var p1=elem.val();
		if(p1!="")
			res=checkTextLenght(elem,min,max);
		return res;	
	}

	function passwdCheck2(elem,min,max,otherElem){
		var res=-1;
		//otherElem=$(otherElem);
		var p1=elem.val();
		var p2=otherElem.val();
		if(passwdCheckEdit(otherElem,min,max)==1 && p1==p2)
			res=1;
		return res;	
	}
