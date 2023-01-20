const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ReparationVoiture } = require('../models/reparationVoiture');

// => localhost:3000/admin/
router.route("/find").get(function(req, res) {
    ReparationVoiture.find({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        var comm;
        var repVoiture = Array;
        for (var i = 0, l = result.length; i < l; i++) {
            comm = result[i];
            console.log('------------------------------');
            console.log('nom : ' + comm.voiture.length);
            console.log('------------------------------');
        }
        res.json(result);
      }
    });
  });

router.get('/', (req, res) => {
    ReparationVoiture.find((err, docs) => {
        if (!err) {
            res.send(docs); 
        }
        else { console.log('Error in Retriving ReparationVoiture :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        ReparationVoiture.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/insertPersoVoiture', (req, res) => {
    var rep = new ReparationVoiture({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
    });
    rep.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ReparationVoiture Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.put('/insertVoiture', (req, res) => {
    const filter = { nom : req.body.nom , email: req.body.email };
    const updateDoc = {
        $push:{
            voiture:{
                modele: req.body.modele,
                numero: req.body.numero,
                diagnostique: 0,
            }
        },
      };
        ReparationVoiture.updateOne(filter, updateDoc, function (err, docs) {
            if (err){
                res.send(err);
            }
            else{
                res.send(docs);
            }
        });
});

router.put('/insertVoitureReparation', (req, res) => {
    console.log(req.body.voiture[0].modele);
    var voi = new ReparationVoiture({
        nom: req.body.nom,
        email: req.body.email,
        voiture: req.body.voiture
    });
    const filter = { nom : req.body.nom , email: req.body.email , "voiture.modele": req.body.voiture[0].modele, "voiture.numero": req.body.voiture[0].numero };
    const updateDoc = {
        $push:{
            "voiture.$.reparation": 
                {
                    daty: "2023-18-1",
                    type: "embrayage",
                    prix: 100000,
                    etat: 0
                }    
        },
      };
      const updateDoc2 = {
        $set:{
            "voiture.$.diagnostique": 1 
        },
      };
        ReparationVoiture.updateOne(filter, updateDoc, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                ReparationVoiture.updateOne(filter, updateDoc2, function (err1, doc) {
                    if (err1){
                        console.log(err1);
                    }
                    else{
                        res.send(docs);
                    }
                });
            }
        });
        
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        ReparationVoiture.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ReparationVoiture Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;