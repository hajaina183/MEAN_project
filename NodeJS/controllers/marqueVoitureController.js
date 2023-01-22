const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { MarqueVoiture } = require('../models/marqueVoiture');
// => localhost:3000/admin/

router.get('/', (req, res) => {
    MarqueVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving MarqueVoiture :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        MarqueVoiture.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        MarqueVoiture.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in MarqueVoiture Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;