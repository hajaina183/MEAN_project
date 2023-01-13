const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Client } = require('../models/client');
console.log("aaaaaaaaaaaaaaaa");


router.post('/', (req, res) => {
    console.log("tongaaaaaaa");
    var emp = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        mdp: req.body.mdp,
    });
    
    console.log(req.body.nom);
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;