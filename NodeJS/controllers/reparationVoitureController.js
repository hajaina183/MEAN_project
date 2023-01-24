const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ReparationVoiture } = require('../models/reparationVoiture');
const factureService = require('../services/factureService');

// => localhost:3000/admin/
router.get('/', (req, res) => {
    ReparationVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving ReparationVoitures :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.route("/find").get(function(req, res) {
    ReparationVoiture.find({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        var comm;
        var repVoiture = Array;
        for (var i = 0, l = result.length; i < l; i++) {
            comm = result[i];
            for (var j = 0, ll = comm.voiture.length; j < ll; j++) {
                var d = comm.voiture[j];
                console.log("voiture == "+JSON.stringify(d));
              }
            console.log('------------------------------');
            console.log('nom : ' + comm.voiture.length);
            console.log('------------------------------');
        }
        res.json(result);
      }
    });
  });

  router.put('/listeVoiturePerso', (req, res) => {
    ReparationVoiture.find({ nom: req.body.nom, email: req.body.email }, function (err, docs) {
        if (!err) 
        { 
            res.send(docs); 
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

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        ReparationVoiture.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/getFacture', async (req, res) => {
    try {
        const numberCar = req.body.numberCar;
        const result = await factureService.getFacture(numberCar);
        res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(`Error : ${error}`);
    }
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




router.put('/insertVoitureReparation/:date/:type/:prix', (req, res) => {
    var voi = new ReparationVoiture({
        voiture: req.body.voiture
    });
    const filter = { "voiture.modele": req.body.modele, "voiture.numero": req.body.numero };
    const updateDoc = {
        $push:{
            "voiture.$.reparation": 
                {
                    daty: req.params.date,
                    type: req.params.type,
                    prix: parseInt(req.params.prix),
                    etat: 0,
                    paye: 0
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


router.put('/terminerReparation/:date/:type', (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconde = date.getSeconds();
    let currentDate = `${year}-${month}-${day} ${hour}:${minute}:${seconde}`;
    const filter = { 
        "voiture.modele": req.body.modele, 
        "voiture.numero": req.body.numero 
    };
    const updateDoc = {
        $set:{
            "voiture.$.reparation.$[element].etat": 1,
            "voiture.$.reparation.$[element].dateFin": currentDate
        },
    };
    const arrayfiltre = {
        arrayFilters: [
            { 
                "element.daty": req.params.date,
                "element.type": req.params.type,
                "element.etat": 0
            } 
        ]
    }
    console.log(arrayfiltre);
    console.log(filter);
    ReparationVoiture.updateOne(filter, updateDoc, arrayfiltre, function (err, docs) {
        if (err){
            console.log(err);
            res.send(err);
        } else {
            //console.log(docs);
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