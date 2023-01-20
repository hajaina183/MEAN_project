const mongoose = require('mongoose');

var Reparation = mongoose.model('Reparation', {
    modele: { type: String },
    type: { type: String },
    prix: { type: Number }
});

module.exports = { Reparation };