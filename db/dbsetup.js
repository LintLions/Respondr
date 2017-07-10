const dynamicAngel = require('../db/models/dynamicAngels.js');
const staticAngelIndividual = require('../db/models/staticAngelIndividuals.js');
const staticAngelStorefront = require('../db/models/staticAngelStorefronts.js');
const test = require('./testData.js');


dynamicAngel.sync({ force: true })
  .then(() => staticAngelIndividual.sync({ force: true}))
  .then(() => staticAngelStorefront.sync({ force: true}))
  .then(() => staticAngelIndividual.bulkCreate(test.staticAngelIndividuals))
  .then(() => staticAngelStorefront.bulkCreate(test.staticAngelStorefronts))
  .then(() => dynamicAngel.bulkCreate(test.dynamicAngels))
  .then(msg => console.log(msg));