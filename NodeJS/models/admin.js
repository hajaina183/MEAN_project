const mongoose = require('mongoose');

var Admin = mongoose.model('Admin', {
    nom: { type: String },
    email: { type: String },
    mdp: { type: String },
    grade: { type: Number }
});

module.exports = { Admin };