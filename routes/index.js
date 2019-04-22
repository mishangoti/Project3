
var express = require('express');
var router = express.Router();
var employee = require('../controllers/employeeController');
var employee_pdf = require('../controllers/employeePrdController');
var passport = require('passport-instagram');
var config = require('../config');
var soc = require('social-oauth-client');

// get services
var authUser = require('../services/instagramService');
var stack = require('../services/stackowerflowService');
var facebook = require('../services/facebookService');
var github = require('../services/githubService');
var google = require('../services/googleService');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Login with third partys' });
});


/* ***********************************INSTAGRAM LOGIN METHOD 1 ******************************************** */
// (1) login with instagram redirect
// go to Instagram authorize page
router.get('/login/instagram_login', function (req, res) {
	res.redirect(config.insta.auth_url);
});
// Instagram redirection url
router.get('/auth/instagram/callback', authUser);


/* ***********************************INSTAGRAM LOGIN METHOD 2********************************************* */
// (2) login with instagram 
var instagram = new soc.Instagram({
	"CLIENT_ID": config.insta.client_id,
	"CLIENT_SECRET": config.insta.client_secret,
	"REDIRECT_URL": config.insta.redirect_url
});
// go to Instagram authorize page
router.get('/instagram_authorize', function (req, res) {
	var url = instagram.getAuthorizeUrl();  // default scope "public_content"
	// var url = instagram.getAuthorizeUrl(['follower_list', 'likes']);
	res.redirect(url);
});
// Instagram redirection url
router.get('/service/oauth/instagram_callback', function (req, res) {
	// delegate to social-auth-client
	instagram.callback(req, res).then(function (user) {
		// oauth token & user basic info will be shown
		res.send(user);
	}, function (err) {
		res.send(err);
	});
});

/* **************************************STACKOVERFLOW LOGIN****************************************** */
// STACKOVERFLOW LOGIN
// question from stackoverflow
router.get('/stackowerflow/questions', stack.question);
// question from allsites
router.get('/stackowerflow/allquestions', stack.allquestions);
// all user 
router.get('/stackowerflow/allusers', stack.allusers);
// jobs
// router.get('/stackowerflow/jobs', stack.jobs);

/* ****************************************FACEBOOK LOGIN********************************************* */
// FACEBOOK LOGIN
// go to Facebook authorize page
router.get('/login/facebook_authorize', facebook.login);
// Facebook OAuth redirection url
router.get('/service/oauth/facebook_callback', facebook.facebook_callback);

// get wallpost from facebook
// router.get('/facebookdata/wallpost', facebookData.wallpost);

/* *****************************************GITHUB LOGIN*********************************************** */
// GITHUB LOGIN
// go to GitHub authorize page
router.get('/login/github_authorize', github.login);
// GitHub OAuth redirection url
router.get('/service/oauth/github_callback', github.github_callback);

/* *****************************************GOOGLE LOGIN*********************************************** */
// GOOGLE LOGIN
// google login url
router.get('/login/google_authorize', google.login);
// google callback url
router.get('/service/oauth/google_callback', google.google_callback);
/* *****************************************EMPLOYEE API*********************************************** */
// EMPLOYEE API
// show all
router.get('/employee', employee.list);
router.get('/employee/all', employee.list);
// show single 
router.get('/employee/show/:id', employee.show);
// add new employee
router.post('/employee/add', employee.add);
// update employee
router.post('/employee/update/:id', employee.update);
//delete employee
router.get('/employee/delete/:id', employee.delete);


/* ***********************************GENERATE PDF********************************************* */
// GENERATE PDF
router.get('/employee/pdf', employee_pdf.list_pdf);

module.exports = router;
