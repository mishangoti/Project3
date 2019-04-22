var soc = require('social-oauth-client');
var config = require('../config');

var github = new soc.GitHub({
	"CLIENT_ID": config.github.client_key,
	"CLIENT_SECRET": config.github.client_secret_key,
	"code": 'session_code'
});

exports.login = (req, res) => {
    // var url = github.getAuthorizeUrl(); // default scope "user"
	var url = github.getAuthorizeUrl(['repo', 'gist']);
	res.redirect(url);    
}

exports.github_callback = (req, res) => {
    // delegate to social-oauth-client
	github.callback(req, res).then((user) => {
		// oauth token & user basic info will be shown
		res.send(user);
		// console.log(user);
	}, (err) => {
		res.send(err);
	});
}