const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hajaina:mdpprom13@cluster0.rcc3ot6.mongodb.net/CrudDB', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;