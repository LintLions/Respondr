const dynamicAngel = require('./models/dynamicAngels.js');
const staticAngelIndividual = require('./models/staticAngelIndividuals.js');
const staticAngelStorefront = require('./models/staticAngelStorefronts.js');
const beacon = require('./models/beacons.js')
const test = require('./testData.js');


dynamicAngel.sync({ force: true })
  .then(() => staticAngelIndividual.sync({ force: true}))
  .then(() => staticAngelStorefront.sync({ force: true}))
  .then(() => beacon.sync({ force: true}))
  .then(() => staticAngelIndividual.bulkCreate(test.staticAngelIndividuals))
  .then(() => staticAngelStorefront.bulkCreate(test.staticAngelStorefronts))
  .then(() => dynamicAngel.bulkCreate(test.dynamicAngels))
  .then(msg => console.log(msg));