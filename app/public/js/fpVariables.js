var AC_FL_RunContent = 0;
var DetectFlashVer = 0;
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Revision of Flash required
var requiredRevision = 28;
// the version of javascript supported
var jsVersion = 1.0;
// GLOBAL FUNCTION
var flashToLoad = new Array();
//
var sitePath = "";

var tmp;

var flashErrMess = new Array();
flashErrMess['it'] = "Questo contenuto richiede JAVASCRIPT abilitato e Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Scarica Adobe Flash Player<\/a>";
flashErrMess['en'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['es'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['fr'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['pl'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";

var langArray = new Array("it","en","es","fr","pl");
var langArrayLabel = new Array("italiano","english","espa&ntilde;ol","fran&ccedil;aise","polish");

var defaultLang = "en";
var urlPlayer = "/_fp/flxerPlayer.swf?cnt=";
var currentLang = defaultLang;

