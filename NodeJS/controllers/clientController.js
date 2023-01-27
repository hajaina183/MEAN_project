const express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const fs = require('fs');
const hogan = require('hogan.js');
const inlineCss = require('inline-css');
var ObjectId = require('mongoose').Types.ObjectId;


var { Client } = require('../models/client');

// => localhost:3000/client/
router.get('/', (req, res) => {
    Client.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Clients :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Client.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Client :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var cli = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        mdp: req.body.mdp,
    });
    cli.save((err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { 
            console.log('Error in Client Save :' + JSON.stringify(err, undefined, 2));
         }
    });
});


router.post('/envoieMail', (req, res) => {
    var adm = new Client({
        email: req.body.email,
        mdp: req.body.mdp
    });
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "m1p10meananitahajaina@gmail.com", // generated ethereal user
          pass: "dvxslbyyyvlztvtw", // generated ethereal password
        },
        tls: {
        rejectUnauthorized: false
        }
    });
    let info = transporter.sendMail({
        from: "m1p10meananitahajaina@gmail.com", // sender address
        to:  req.body.email, // list of receivers
        subject: "Confirmation de compte ", // Subject line
        html: '<html>' +
        '<head>' +
        '<style>'+
        ' body { background: white; display: block; margin-left: auto; margin-right: auto }'+
        '.container  {'+
        ' position: absolute;'+
            'left: 50%;'+
        ' top: 50%;'+
            'transform: translate(-50%, -50%);'+
        ' height: 400px;'+
            'width: 600px;'+
            'background: #f2f2f2;'+
            'overflow: hidden;'+
            'border-radius: 20px;'+
            'cursor: pointer;'+
            'box-shadow: 0 0 20px 8px #d0d0d0;'+
        '}'+
        
        ' .content {'+
            'position: absolute;'+
            'top: 50%;'+
            'transform: translatey(-50%);'+
            'text-align: justify;'+
            'color: black;'+
            'padding: 40px;'+
            'font-family: "Merriweather", serif;'+
        ' }'+
        
        'h1 {font-weight: 900;  text-align: center; }'+
        
        'h3 { font-weight: 300; }' +
        
        '.flap { width: 100%;  height: 100%; }' +
        
        ' .flap::before { position: absolute; content: ""; height: 100%; width: 50%; background: url("https://pbs.twimg.com/profile_images/1347260174176710658/2GfSZ1i__400x400.jpg") white;background-position: 100px; background-repeat: no-repeat;transition: 1s;}' +
        
        ' .flap::after {  position: absolute; content: ""; height: 100%; width: 50%; right: 0; background: url("https://pbs.twimg.com/profile_images/1347260174176710658/2GfSZ1i__400x400.jpg") white; background-position: -200px; background-repeat: no-repeat; transition: 1s; }' +
        
        '.container:hover .flap::after { transform: translatex(300px);}' +
        
        '.container:hover .flap::before{ transform: translatex(-300px); }'+

        'button { display: inline-block;background-color: #7b38d8;border-radius: 10px; border: 4px double #cccccc; color: #ffffff; text-align: center; font-size: 28px; padding: 20px; width: 200px; transition: all 0.5s;  cursor: pointer; margin: 5px; }' +
        'button span { cursor: pointer; display: inline-block; position: relative;  transition: 0.5s; }' +
        'button span:after { content: "\00bb"; position: absolute; opacity: 0; top: 0; right: -20px;transition: 0.5s; }' +
        'button:hover { background-color: #f7c2f9; }' + 
        'button:hover span { padding-right: 25px; }' +
        'button:hover span:after { opacity: 1; right: 0; }'+
        '</style>'+
        '</div><div class="container">'+
            '<div class="content">'+
            '<h1>Bonjour</h1>'+
            '<h3>Merci de vous enregistrer auprès de nous. Vous faites désormais partie d une grande communauté</h3>'+
            '<h3>Veuillez cliquer <a href="http://localhost:5000/inscription">ici<a>  pour vous connecter.</h3>'+
            '</div>'+
            '<div class="flap"></div>'+
        '</div>' +
        '<body>'+
        '</html>'
    
    });
    res.send('{"msg": "mail envoyer"}');
    
});

router.post('/traitementLogin', (req, res) => {
    var adm = new Client({
        email: req.body.email,
        mdp: req.body.mdp
    });
    Client.find({ email: req.body.email, mdp: req.body.mdp }, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs.length == 1) {
                res.send(docs[0])
            } else {
                res.send(docs[0])
            }
        }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var cli = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        tel: req.body.tel,
        mdp: req.body.mdp,
    };
    Client.findByIdAndUpdate(req.params.id, { $set: cli }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Client Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Client.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Client Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;