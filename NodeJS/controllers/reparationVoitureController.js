const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ReparationVoiture } = require('../models/reparationVoiture');

// => localhost:3000/admin/
router.get('/', (req, res) => {
    ReparationVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
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

router.post('/', (req, res) => {
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
    console.log(req.body);
    var voi = new ReparationVoiture({
        nom: req.body.nom,
        email: req.body.email 
    });
    const filter = { nom : req.body.nom , email: req.body.email };
    const updateDoc = {
        $push:{
            voiture:{
                modele: "BMW",
                numero: "1236wwt",
                diagnostique: 1,
                reparation: [
                    {
                        daty: "2023-47-7",
                        type: "pneu",
                        prix: 25000,
                        etat: 0
                    }
                ]
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



router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        ReparationVoiture.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ReparationVoiture Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;