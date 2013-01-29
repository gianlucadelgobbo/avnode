// JavaScript Document
var label_ctr_one_is_checked_0={"code0":"please select 1 option"};
var label_ctr_theme={
	"code648":"Only Mapping performance are allowed for this theme",
	"code653":"Only VJ Sets are allowed for this theme",
	"code671":"Only VJ Sets are allowed for this theme",
	"code672":"Only VJ Sets are allowed for this theme"
	};

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(searchElement /*, fromIndex */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = 0;
    if (arguments.length > 0)
    {
      n = Number(arguments[1]);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n >= len)
      return -1;

    var k = n >= 0
          ? n
          : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++)
    {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}

	function checkTheme(elemName){
		/*
		allowedType = {"topic642":[],"topic643":[],"topic644":[]};
		if(allowedType["topic"+elemName.value].length){
			if(!inArray(performance_type,allowedType["topic"+elemName.value])) {
				alert(eval('label_ctr_theme.code'+elemName.value));
				elemName.checked = false;
			}
		}
		var res=0;
		var elems=document.getElementsByName(elemName+"[]");
		for(var i=0;i<elems.length; i++){
			if(elems[i].checked){
				res=1;
				break;
			}
		}
		return res;
		*/
		clearErrors(elemName);
	}

		function check_topic(){
			var esito=true;
			var tmpEsito;
			var tmpElem;
			var tmpErrorMsg;
			var firstError=false;
			
				tmpEsito=one_is_checked('topic');
				
				if(tmpEsito!=1){
					esito=false;
					firstError='topic';
					//alert(eval('label_ctr_one_is_checked_0.code'+(tmpEsito*-1)));
					tmpErrorMsg=eval('label_ctr_one_is_checked_0.code'+(tmpEsito*-1));
					showErrors($("[name='topic']"),tmpErrorMsg);
				}
				
	
			if(!esito && firstError!=false){
				window.location.hash="#label_"+firstError;
			}		
			return esito;
		}		
		