const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Reparation } = require('../models/reparation');

// => localhost:3000/reparation/
router.get('/', (req, res) => {
    Reparation.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Reparations :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Reparation.findById(req.params.id, (err, doc) => {
        if (!err) { 
            console.log("rep : "+doc.voiture[0].modele);
            res.send(doc); 
        }
        else { console.log('Error in Retriving Reparation :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Reparation({
        voiture: req.body.voiture
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reparation Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        nom: req.body.nom,
        voiture: req.body.voiture,
    };
    Reparation.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reparation Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Reparation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reparation Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;