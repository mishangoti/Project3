var soc = require('social-oauth-client');
var config = require('../config');

// get instance for Google (REPLACE WITH YOUR OWN APP SETTINGS)
var google = new soc.Google({
    "CLIENT_ID": config.google.client_id,
    // "CLIENT_ID": ,
    "CLIENT_SECRET": config.google.client_secret_key,
    "REDIRECT_URL": config.google.client_redirect_url
});

// go to Google authorize page
exports.login = (req, res) => {
    var url = google.getAuthorizeUrl(); // default scope 'https://www.googleapis.com/auth/plus.me'
    // var url = google.getAuthorizeUrl(['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar']);
    res.redirect(url);
}

exports.google_callback = (req, res) => {
    google.callback(req, res).then(function(user) {
        console.log(JSON.stringify(user));
        res.send(user);
    }, function(err) {
      res.send(err);
    });
}