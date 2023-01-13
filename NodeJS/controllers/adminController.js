const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Admin } = require('../models/admin');

// => localhost:3000/admin/
router.get('/', (req, res) => {
    Admin.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Admins :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Admin.findById(req.params.id, (err, doc) => {
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
        else { console.log('Error in Admin Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var adm = {
        nom: req.body.nom,
        email: req.body.email,
        mdp: req.body.mdp,
        grade: req.body.grade,
    };
    Admin.findByIdAndUpdate(req.params.id, { $set: adm }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Admin Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Admin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Admin Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;