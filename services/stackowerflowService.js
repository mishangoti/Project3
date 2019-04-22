var config = require('../config');
// var User = require('../models/User');
var stackexchange = require('stackexchange');
var options = { version: 2.2 };
var context = new stackexchange(options);


exports.question = (req, res) => {
    var filter = {
        key: config.stackoverflow.key,
        pagesize: 50,
        tagged: 'php',
        sort: 'activity',
        order: 'asc'
    };
    context.questions.questions(filter, function(err, results){
        if (err) throw err;
        res.json(results.items);
        // console.log(results.items);
        // console.log(results.has_more);
    });
};

exports.allquestions = (req, res) => {
    var filter = {
        key: config.stackoverflow.key,
        pagesize: 50,
        tagged: 'node.js',
        sort: 'activity',
        order: 'asc'
    };
    filter.site = 'softwareengineering';
    context.questions.questions(filter, function(err, results){
        if (err) throw err;
        res.json(results.items);        
        // console.log(results.items);
        // console.log(results.has_more);
    });
}

exports.allusers = (req, res) => {
    var filter = {
        key: config.stackoverflow.key,
        pagesize: 50,
        // tagged: 'node.js',
        // sort: 'activity',
        // order: 'asc'
    };
    // filter.site = 'softwareengineering';
    context.users.users(filter, function(err, results){
        if (err) throw err;
        res.json(results.items);        
        // console.log(results.items);
        // console.log(results.has_more);
    });
}

// exports.jobs = (req, res) => {
//     var filter = {
//         key: config.stackoverflow.key,
//         pagesize: 50,
//         tagged: 'node.js',
//         // sort: 'activity',
//         // order: 'asc'
//     };
//     filter.site = 'softwareengineering';
//     context.jobs.jobs(filter, function(err, results){
//         if (err) throw err;
//         res.json(results.items);        
//         // console.log(results.items);
//         // console.log(results.has_more);
//     });
// }