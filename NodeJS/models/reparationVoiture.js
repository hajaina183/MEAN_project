const mongoose = require('mongoose');

var ReparationVoiture = mongoose.model('ReparationVoiture', {
    nom: { type: String },
    prenom: { type: String },
    adresse: { type: String },
    tel: { type: String },
    email : {type: String},
    voiture : { type: Array }
});

module.exports = { ReparationVoiture };