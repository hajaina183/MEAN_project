const mongoose = require("mongoose");
var { ReparationVoiture } = require('../models/reparationVoiture');



const getFacture = async (numeroVoiture = null) =>{
    if (!numeroVoiture) throw "Invalid Car number!";
    const VoitureQuery = [
        {
          '$unwind': {
            'path': '$voiture'
          }
        }, {
          '$match': {
            'voiture.numero': numeroVoiture.trim(), 
            'voiture.reparation.paye': 0
          }
        }
    ]

    const total = [
        {
            '$unwind': {
                'path': '$voiture.reparation'
            }
        }, {
            '$group': {
                '_id': '$voiture.numero',
                'factureTotal': {
                    '$sum': '$voiture.reparation.prix'
                }, 
                'nbrReparation': {
                    '$sum': 1
                }
            }
        }
    ]
    const totalFactureQuery = VoitureQuery.concat(total);
    const listVoiture = await ReparationVoiture.aggregate(VoitureQuery);
    if(listVoiture.length == 0 ) throw 'no result found !';
    const totalresult = await ReparationVoiture.aggregate(totalFactureQuery);
    const {factureTotal , nbrReparation} = totalresult.length != 0 ? totalresult[0] : 0;
    return {...listVoiture[0],factureTotal,nbrReparation};
}

module.exports = {
    getFacture
}