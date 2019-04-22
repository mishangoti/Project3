const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

var fs = require('fs');
var pdf = require('dynamic-html-pdf');
// var html = fs.readFileSync(__dirname+'/template1.ejs', 'utf8');

exports.list_pdf = (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            let arr2 = []
            arr2[0] = {
                message: 'success',
                success: 'true',
                code: '200'
            }
            let all_employee = [...docs, ...arr2];
            var all_employee_json = JSON.stringify(all_employee);
            // res.json(all_employee);
            console.log(all_employee_json);


        } else {
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    });
}