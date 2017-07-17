const path = require('path');
require('node-env-file')(path.join(__dirname, '../../.env'));
const dynamicResponder = require('./models/dynamicResponders.js');
const staticResponderIndividual = require('./models/staticResponderIndividuals.js');
const staticResponderStorefront = require('./models/staticResponderStorefronts.js');
const beacon = require('./models/beacons.js')
const test = require('./testData.js');


dynamicResponder.sync({ force: true })
  .then(() => staticResponderIndividual.sync({ force: true}))
  .then(() => staticResponderStorefront.sync({ force: true}))
  .then(() => beacon.sync({ force: true}))
  .then(() => staticResponderIndividual.bulkCreate(test.staticResponderIndividuals))
  .then(() => staticResponderStorefront.bulkCreate(test.staticResponderStorefronts))
  .then(() => dynamicResponder.bulkCreate(test.dynamicResponders))
  .then(msg => console.log(msg));