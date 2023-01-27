const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var clientController = require('./controllers/clientController.js');
var olonaController = require('./controllers/olonaController.js');
var adminController = require('./controllers/adminController.js');
var reparationVoitureController = require('./controllers/reparationVoitureController.js');
var reparationController = require('./controllers/reparationController.js');
var depenseController = require('./controllers/depenseController.js');
var marqueVoitureController = require('./controllers/marqueVoitureController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.listen( process.env.PORT || 3000, () => console.log('Server started at port : 3000'));


app.use('/client', clientController);
app.use('/olona', olonaController);
app.use('/admin', adminController);
app.use('/reparationVoiture', reparationVoitureController);
app.use('/reparation', reparationController);
app.use('/depense', depenseController);
app.use('/marqueVoiture', marqueVoitureController);