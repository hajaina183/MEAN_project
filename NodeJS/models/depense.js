const mongoose = require('mongoose');

var Depense = mongoose.model('Depense', {
    mois: { type: String },
    annee: { type: String },
    salaire: { type: Number },
    loyer: { type: Number },
    piece: { type: Number },
    autres: { type: Number }
});

module.exports = { Depense };