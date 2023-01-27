const mongoose = require("mongoose");
var { ReparationVoiture } = require('../models/reparationVoiture');



const getFacture = async (numeroVoiture = null) =>{
    if (!numeroVoiture) throw "Invalid Car number!";

    const query = [
        {
            '$unwind': {
                'path': '$voiture'
            }
        }, {
            '$match': {
                'voiture.numero': numeroVoiture.trim()
            }
        }, {
          '$unwind': {
            'path': '$voiture.reparation'
          }
        }, {
          '$match': {
            'voiture.reparation.paye': { $lt: 3 }
          }
        }, {
          '$group': {
            '_id': '$voiture.numero', 
            'factureTotal': {
              '$sum': { $multiply: [ '$voiture.reparation.prix', '$voiture.reparation.quantite' ] }
            }, 
            'nbrReparation': {
              '$sum': 1
            }, 
            'document': {
              '$first': '$$ROOT'
            }, 
            'listreparation': {
              '$push': '$voiture.reparation'
            }
          }
        },
        {
            '$project': {
              'document._id': 1, 
              'document.nom': 1, 
              'document.prenom': 1, 
              'document.adresse': 1, 
              'document.email': 1,
              'document.tel': 1, 
              'document.totalReparation': '$factureTotal', 
              'document.nbReparation': '$nbrReparation', 
              'document.voiture.modele': 1, 
              'document.voiture.numero': 1, 
              'document.voiture.diagnostique': 1, 
              'document.voiture.reparation': '$listreparation'
            }
        }, {
            '$replaceRoot': {
              'newRoot': '$document'
            }
        }
    ]
    const totalresult = await ReparationVoiture.aggregate(query);
    if(totalresult.length == 0 ) throw 'no result found !';
    return totalresult;
}

module.exports = {
    getFacture
}