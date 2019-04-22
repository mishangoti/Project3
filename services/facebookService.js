var soc = require('social-oauth-client');
var config = require('../config');
var User = require('../models/User');

var facebook = new soc.Facebook({
    "APP_ID": config.facebook.app_key,
    "APP_SECRET": config.facebook.secret_key,
    // "CLIENT_ID": "xxxxxxxxxxbb9c0a2e597bdbaef07a9d",
    "REDIRECT_URL": config.facebook.redirect_url
});

exports.login = (req, res) => {
    // go to Facebook authorize page
    var url = facebook.getAuthorizeUrl(); // default scope public_profile
    // var url = facebook.getAuthorizeUrl(['user_likes','email','user_events']);
    res.redirect(url);
}
exports.facebook_callback = (req, res) => {
    // delegate to social-oauth-client
    facebook.callback(req, res).then(function (user) {
        // oauth token & user basic info will be shown
        res.send(user);

    }, function (err) {
        res.send(err);
    });
}
// var data = () => {
    
// }