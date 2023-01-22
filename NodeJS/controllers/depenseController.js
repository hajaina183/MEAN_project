const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Depense } = require('../models/depense');

// => localhost:3000/depense/
router.get('/', (req, res) => {
    Depense.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Depenses :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Depense.findById(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { console.log('Error in Retriving Depense :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var dep = new Depense({
        mois: req.body.mois,
        annee: req.body.annee,
        salaire: req.body.salaire,
        loyer: req.body.loyer,
        piece: req.body.piece,
        autres: req.body.autres,
    });
    dep.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Depense Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var dep = {
        mois: req.body.mois,
        annee: req.body.annee,
    };
    Depense.findByIdAndUpdate(req.params.id, { $set: dep }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Depense Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Depense.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Depense Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;