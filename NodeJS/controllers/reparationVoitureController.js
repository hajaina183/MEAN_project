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
    var adm = new Admin({
        nom: req.body.nom,
        email: req.body.email,
        mdp: req.body.mdp,
        grade: req.body.grade,
    });
    adm.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ReparationVoiture Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/updatetVoiture', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var voi = {
        nom: req.body.nom,
        email: req.body.email 

    };
    console.log("nom "+req.body.nom);
    console.log("email "+req.body.email);
    voi.ReparationVoiture.updateOne({ email: req.body.email, nom: req.body.nom },
        {"nom" : req.body.nom , "email": req.body.email },
        {
            $push:{
                "voiture":{
                    "daty":"2023-47-7",
                    "numero":"1236wwt",
                    "reparation":{
                        "materiel" : "pneu",
                        "prix":"25000"
                    }
                }
            }
        }
    );
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