const mongoose = require('mongoose');

var Client = mongoose.model('Client', {
    nom: { type: String },
    prenom: { type: String },
    adresse: { type: String },
    tel: { type: String },
    email : {type: String},
    mdp : { type: String }
});

module.exports = { Client };