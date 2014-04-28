var _config = {
	"dbName": 			"avnode",
	"sitepath":			"/development/avnode",
	"siteurl":			"http://127.0.0.1:8002",
	"uploadpath":		"",
	"uploadtmp":		"/tmp",
	"emaildispatcher":	{
		"nameFrom":		"AVnode",
		"emailFrom":	"g.delgobbo@flyer.it",
		"server":	{
			"user":		"g.delgobbo@flyer.it", 
			"password":	"22724gia", 
			"host":		"smtp.gmail.com", 
			"ssl":		true
			
		}
	}
}
if (typeof exports !== "undefined") exports._config = _config;
