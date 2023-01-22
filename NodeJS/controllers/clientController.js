const express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
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
          user: "anitatantely@gmail.com", // generated ethereal user
          pass: "xzdsopensecdlmtt", // generated ethereal password
        },
        tls: {
        rejectUnauthorized: false
        }
      });
      let info = transporter.sendMail({
        from: "anitatantely@gmail.com", // sender address
        to:  req.body.email, // list of receivers
        subject: "Confirmation de compte ", // Subject line
        text: "Veuillez cliquez sur le lien pour vous connecter SVP : http://localhost:4200/navbar ", // plain text body
        html: "Veuillez cliquez sur le lien pour vous connecter SVP : http://localhost:4200/navbar ", // html body
      });
    
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