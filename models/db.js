const mongoose = require('mongoose');
const config = require('../config');


mongoose.connect(config.databaseInfo.mongodbUrl, { useNewUrlParser: true }, (err) => {
    if(!err) {
        console.log('Mongodb Connection success.');
    }
});

require('./employee.model');