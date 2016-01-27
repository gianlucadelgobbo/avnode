var config = require('getconfig');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill.key);

exports.sendVerificationMail = function(to) {
  var message = {
    "text": "Test Content",
    "subject": "AVNode E-mail Verification",
    "from_email": "info@avnode.net",
    "from_name": "AVNode",
    "to": [{
      "email": to,
      "type": "to"
    }],
    "headers": {
      "Reply-To": "no_reply@avnode.net"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "tags": [
      "email-verification"
    ]
  };
  mandrill_client.messages.send({
      "message": message,
      "async": false,
      "ip_pool": "",
      "send_at": "",
    }, function(result) {
      console.log(result);
    }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    }
  );
}
