<? if(!isset($_GET['act'])){ ?>
<h3><a href="/controlpanel/new/register.php"><? echo($this->getLabel("Metodo 1 (richiede conferma via mail)")) ?></a></h3>
<div>
<? echo($this->getLabel("Compila il form con i tuoi dati personali ed effettua la registrazione.")) ?> <a href="/controlpanel/new/register.php"><? echo($this->getLabel("Registrati")) ?></a></h3>
</div>
<div class="cntCol">
<? echo($this->getLabel("oppure")) ?>
</div>
<h3 class="cntCol"><? echo($this->getLabel("Metodo 2 (NON richiede conferma via mail)")) ?></h3>
<div>
<? echo($this->getLabel("Registrati utilizzando una registrazione effettuata su uno dei seguenti social network.")) ?>
</div>
<? }else{ ?>
<div>
redirection in progress. please wait.
</div>
<? } ?>
<script type="text/javascript">
var login_params=
{
	showTermsLink: 'false'
	,height: '65'
	,width: '230'
	,containerID: 'componentDiv'
	,UIConfig: '<config><body><background frame-color="Transparent"></background></body></config>'
	,useFacebookConnect: 'true'
	,redirectURL:"<? echo $this->community->initObj["protocol"] ?>://<? echo $_SERVER['HTTP_HOST'] ?>/controlpanel/new/"
}
function checkLoginCallback(response){
	if(response.loggedIn){
		gigya.services.socialize.getUserInfo(conf,{callback:getUserInfoCallback});
	}else{
		gigya.services.socialize.showLoginUI(conf,login_params);
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
<div id="componentDiv" class="cntCol"></div>
<script type="text/javascript">
 gigya.services.socialize.isLoggedIn(conf,{callback:checkLoginCallback});
</script>
