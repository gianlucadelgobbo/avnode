var _config = {
	"dbName": 			"avnode",
	"sitepath":			"/development/avnode",
	"siteurl":			"http://127.0.0.1:8002",
	"uploadpath":		"",
	"uploadtmp":		"/tmp",
	"emaildispatcher":	{
		"nameFrom":		"AVnode",
		"emailFrom":	"",
		"server":	{
			"user":		"", 
			"password":	"", 
			"host":		"smtp.gmail.com", 
			"ssl":		true
			
		}
	}
}
if (typeof exports !== "undefined") exports._config = _config;
