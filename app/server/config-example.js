//var siteurl = "http://dev.avnode.net:88";
var siteurl = "http://127.0.0.1:8002";
var _config = {
	"port": 			8002,
	"dbHost":			"localhost",
	"dbPort":			27017,
	"sitename": 		"AVnode",
	"dbName": 			"avnode",
	"sitepath":			"/Users/admin/github/avnode",
	"siteurl":			siteurl,
	"uploadpath":		"",
	"uploadedFilesPath":"/Users/admin/github/avnode/tmp/",
	"maxFileSize":      1 * 1024 * 1024 * 1024,
	"defaultLocale": 	"en",
	"locales":			["it","en", "es", "fr", "pl", "ru", "hu", "by", "gr"],
	"locales_labels":	{
		"it":"Italiano",
		"en":"English",
		"es":"Espa&ntilde;ol",
		"fr":"Fran&ccedil;aise",
		"pl":"Polski",
		"ru":"Russian",
		"hu":"Hungarian",
		"by":"Belarusian",
		"gr":"Greek"
	},
	"thumbnails":		[{"width":400,"height":300},{"width":55,"height":55}],
	"googleAnalytics":	"UA-8844617-6",
	"mailinglists":		["livevisuals","flxer","flyer","updates"],
	"emaildispatcher":	{
		"nameFrom":		"AV node",
		"emailFrom":	"g.delgobbo@flyer.it",
		"server":	{
			"user":		"g.delgobbo@flyer.it",
			"password":	"",
			"host":		"smtp.gmail.com",
			"ssl":		true

		}
	},
	"signature":	"\n\nAVnode Team\n______________________________________\nAVnode\navnode.org | avnode.net",
	"socials":	{
		"facebook":		"AVnode",
		"emailFrom":	"",
		"facebook_login":	{
			clientID: "1420745254855757",
			clientSecret: "74a8e87a644964eeffbfcc4628954d00",
			callbackURL: siteurl+"/controlpanel/login/facebook/callback"
		},
		"facebook_signup":	{
			clientID: "1420745254855757",
			clientSecret: "74a8e87a644964eeffbfcc4628954d00",
			callbackURL: siteurl+"/controlpanel/signup/facebook/callback"
		},
		"google_login":	{
			clientID: "345974507894-vo7uv0vqpf9eetekjoovk6ijs27tqqoj.apps.googleusercontent.com",
			clientSecret: "-14m41fdFULwMlFv_HPB-5ul",
			callbackURL: siteurl+"/controlpanel/login/google/callback"
		},
		"google_signup":	{
			clientID: "345974507894-vo7uv0vqpf9eetekjoovk6ijs27tqqoj.apps.googleusercontent.com",
			clientSecret: "-14m41fdFULwMlFv_HPB-5ul",
			callbackURL: siteurl+"/controlpanel/signup/google/callback"

		},
		"twitter_login":	{
			consumerKey: "3rJBZw4OEH4k8TpjK98FBFxpf",
			consumerSecret: "hDBU8rzd7rY0PBH1kp7yo83obb4CgUwHSn1aex5kiTKNN9Mcut",
			callbackURL: siteurl+"/controlpanel/login/twitter/callback"
		}
	}
}
if (typeof exports !== "undefined") exports._config = _config;
