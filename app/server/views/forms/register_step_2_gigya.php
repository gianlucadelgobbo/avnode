<div>
<script type="text/javascript">
var login_params=
{
	showTermsLink: 'false'
	,height: '65'
	,width: '230'
	,containerID: 'componentDiv'
	,UIConfig: '<config><body><background frame-color="Transparent"></background></body></config>'
	,useFacebookConnect: 'true'
	,"redirectURL":"<? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/controlpanel/new/gigya.php"
}
var chek_login_params=
{
	"callback":checkLoginCallback
}
function checkLoginCallback(response){
	if(response.loggedIn){
		gigya.services.socialize.getUserInfo(conf,{callback:getUserInfoCallback});
	}else{
		window.location.href="<? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/controlpanel/new/";
	}
}
function getUserInfoCallback(response){
	if ( response['status'] == 'OK' ) {     
        var user = response['user'];  	
		var str="imgthumb="+escape(user['photoURL']);
		str+="&firstName="+escape(user['firstName']);
		str+="&lastName="+escape(user['lastName']);
		str+="&gender="+escape(user['gender']);
		str+="&birthDay="+escape(user['birthDay']);
		str+="&birthMonth="+escape(user['birthMonth']);
		str+="&birthYear="+escape(user['birthYear']);
		str+="&email_from="+escape(user['email']);
		str+="&country="+escape(user['country']);
		str+="&city="+escape(user['city']);
		str+="&zip="+escape(user['zip']);
		str+="&profileURL="+escape(user['profileURL']);
		str+="&photoURL="+escape(user['photoURL']);
		var rObj = false; // XMLHttpRequest Object
		if (window.XMLHttpRequest) // try to create XMLHttpRequest
			rObj = new XMLHttpRequest();	
		if (window.ActiveXObject)	// if ActiveXObject use the Microsoft.XMLHTTP
			rObj = new ActiveXObject("Microsoft.XMLHTTP");		
		rObj.open("GET", "/_php/ajax/setSession.php?param="+escape(str) , true);
		rObj.onreadystatechange = function(){
			if (rObj.readyState==4) {
				gigya.services.socialize.logout(conf,{callback:actionCompleteCallback});
			}		
		};
		rObj.send(null);
    }  
    else {  
        alert('Error :' + response['statusMessage']);  
    }   	
}
function actionCompleteCallback(response){
	window.location.href="/controlpanel/new/register.php";
}
</script>
<div id="componentDiv"></div>
<script type="text/javascript">
gigya.services.socialize.isLoggedIn(conf,chek_login_params);
</script>
<form method="post" action="register.php">
<div id="imgthumb">&nbsp;</div>
<label>firstName<input type="text" name="firstName" id="firstName" value="" /></label><br />
<label>lastName<input type="text" name="lastName" id="lastName" value="" /></label><br />
<label>gender<input type="text" name="gender" id="gender" value="" /></label><br />
<label>birthDay<input type="text" name="birthDay" id="birthDay" value="" /></label><br />
<label>birthMonth<input type="text" name="birthMonth" id="birthMonth" value="" /></label><br />
<label>birthYear<input type="text" name="birthYear" id="birthYear" value="" /></label><br />
<label>email<input type="text" name="email_from" id="email_from" value="" /></label><br />
<label>country<input type="text" name="country" id="country" value="" /></label><br />
<label>city<input type="text" name="city" id="city" value="" /></label><br />
<label>zip<input type="text" name="zip" id="zip" value="" /></label><br />
<label>profileURL<input type="text" name="profileURL" id="profileURL" value="" /></label><br />
<label>photoURL<input type="text" name="photoURL" id="photoURL" value="" /></label><br />

<input type="submit" name="submit_register_form" value="submit" />
</form>
</div>