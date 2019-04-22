const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

var foo = () => {
    return ('foawdawdo');
}

exports.list = (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            let arr2 = []
            arr2[0] = {
                message: 'success',
                success: 'true',
                code: '200'
            }
            let all_employee = [...docs, ...arr2];
            res.json(all_employee);

        }else{
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    }); 
};

exports.show = (req, res) => {
    let id = req.params.id;
    Employee.findById({_id: id}, (err, docs) => {
        if(!err){
            if(!docs){
                let arr = [];
                arr[0] = {
                    message: 'Employee Not Available',
                    success: 'true',
                    code: '200'
                }
                res.json(arr);
            }else{
                let arr1 = [];
                arr1[0] = docs;
                let arr2 = [];
                arr2[0] = {
                    message: 'success',
                    success: 'true',
                    code: '200'
                }
                let employee = [...arr1, ...arr2];
                res.json(employee);
            }
        }else{
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    });
};

exports.add = (req, res) => {
    let email = req.body.email;
    Employee.findOne({email: email}, (err, docs) => {
        if(!err){
            if(!docs){
                employee = new Employee();
                employee.fullname = req.body.f_name;
                employee.email = req.body.email;
                employee.mobile = req.body.phone;
                employee.city = req.body.city;
                employee.save((err) => {
                    if (!err) {
                        let arr1 = [];
                        arr1[0] = req.body;
                        let arr2 = [];
                        arr2[0] = {
                            message: 'product adding success',
                            success: 'true',
                            code: '200'
                        };
                        var data = [...arr1, ...arr2];
                        res.json(data);
                    } else {
                        let arr = [];
                        arr[0] = {
                            message: 'product adding not success',
                            success: 'false',
                            code: '500'
                        };
                        res.json(arr);
                    }
                });
            }else{
                let arr = [];
                arr[0] = {
                    message: 'email address all ready exist',
                    success: 'true',
                    code: '200'
                }
                res.json(arr);
            }
        }else{
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    });
};

exports.delete = (req, res) => {
    let id = req.params.id;
    Employee.findById({_id: id}, (err, docs) => {
        if(!err){
            if(!docs){
                let arr = [];
                arr[0] = {
                    message: 'Employee is all ready deleted',
                    success: 'true',
                    code: '200'
                }
                res.json(arr);
            }else{
                Employee.findByIdAndDelete(id, (err) => {
                    if(!err){
                        let arr = [];
                        arr[0] = {
                            message: 'product deleted successfully',
                            success: 'true',
                            code: '200'
                        };
                        res.json(arr);
                    }else{
                        let arr = [];
                        arr[0] = {
                            message: 'product delete fail',
                            success: 'false',
                            code: '500'
                        };
                        res.json(arr);
                    }
                });
            }
        }else{
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    });
};

exports.update = (req, res) => {
    let id = req.params.id;
    let fullname = req.body.f_name;
    let email = req.body.email;
    let mobile = req.body.phone;
    let city = req.body.city;
    Employee.findById({_id: id}, (err, docs) => {
        if(!err){
            if(!docs){
                let arr = [];
                arr[0] = {
                    message: 'Employee is not available',
                    success: 'true',
                    code: '200'
                }
                res.json(arr);
            }else{
                docs.fullname = fullname;
                docs.email = email;
                docs.mobile = mobile;
                docs.city = city;
                docs.save((err) => {
                    if(!err){
                        let data = [];
                        data[0] = docs;
                        let arr = [];
                        arr[0] = {
                            message: 'employee is updated',
                            success: 'true',
                            code: '200'
                        }
                        let success = [...data, ...arr];
                        res.json(success);
                    }else{
                        let arr = [];
                        arr[0] = {
                            message: 'employee not updated',
                            success: 'false',
                            code: '500'
                        }
                        res.json(arr);
                    }
                });
                // Employee.findByIdAndUpdate(id, {  }, (err) => {
                // res.json(docs.email);
                // res.json('yes');
                // });
            }
        }else{
            let arr = []
            arr[0] = {
                message: 'some thing wrong',
                success: 'false',
                code: '500'
            }
            res.json(arr);
        }
    });

  
    // console.log(id);
    // console.log(fullname);
    // console.log(email);
    // console.log(mobile);
    // console.log(city);
}

exports = {
    foo: foo
}