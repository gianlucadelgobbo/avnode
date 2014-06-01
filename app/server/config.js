var _config = {
	"dbName": 			"avnode",
	"sitepath":			"/development/avnode",
	"siteurl":			"http://127.0.0.1:8002",
	"uploadpath":		"",
    "uploadedFilesPath":"/development/avnode/tmp/",
    "maxFileSize":      1 * 1024 * 1024 * 1024,
    "emaildispatcher":	{
        "nameFrom":		"AVnode",
        "emailFrom":	"",
        "server":	{
            "user":		"",
            "password":	"",
            "host":		"smtp.gmail.com",
            "ssl":		true

        }
    },
    "socials":	{
        "facebook":		"AVnode",
        "emailFrom":	"",
        "facebook_login":	{
            clientID: "1420745254855757",
            clientSecret: "74a8e87a644964eeffbfcc4628954d00",
            callbackURL: "http://localhost:8002/controlpanel/login/facebook/callback"
        },
        "facebook_signup":	{
            clientID: "1420745254855757",
            clientSecret: "74a8e87a644964eeffbfcc4628954d00",
            callbackURL: "http://localhost:8002/controlpanel/signup/facebook/callback"
        },
        "google_login":	{
            realm: "http://localhost:8002/",
            returnURL: "http://localhost:8002/controlpanel/login/google/callback"

        },
        "google_signup":	{
            realm: "http://localhost:8002/",
            returnURL: "http://localhost:8002/controlpanel/signup/google/callback"

        },
        "twitter_login":	{
            consumerKey: "3rJBZw4OEH4k8TpjK98FBFxpf",
            consumerSecret: "hDBU8rzd7rY0PBH1kp7yo83obb4CgUwHSn1aex5kiTKNN9Mcut",
            callbackURL: "http://localhost:8002/signup/twitter/callback"
        }
    }
}
if (typeof exports !== "undefined") exports._config = _config;
