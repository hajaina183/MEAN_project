const mongoose = require('mongoose');

var Olona = mongoose.model('Olona', {
    nom: { type: String },
    voiture: { type: Array }
});

module.exports = { Olona };