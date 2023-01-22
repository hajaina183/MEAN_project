const mongoose = require('mongoose');

var MarqueVoiture = mongoose.model('MarqueVoiture', {
    marque: { type: String },

});

module.exports = { MarqueVoiture };