const path = require('path');
require('node-env-file')(path.join(__dirname, '../../.env'));
const dynamicResponder = require('./models/dynamicResponders.js');
const staticResponderIndividual = require('./models/staticResponderIndividuals.js');
const staticResponderStorefront = require('./models/staticResponderStorefronts.js');
const beacon = require('./models/beacons.js');
const test = require('../../testData.js');


const stores = test.map(place => ({
  fullName: place.FacilityName,
  street: place.Address2 ? `${place.Address} ${place.Address2}`,
  Location: [place.latitude, place.longitude],
  zip: place.ZipCode,
  phone: place.Phone,
  state: 'NY',
  public: true,
}));
console.log('test', Array.isArray(stores));

dynamicResponder.sync({ force: true })
  .then(() => staticResponderIndividual.sync({ force: true }))
  .then(() => staticResponderStorefront.sync({ force: true }))
  .then(() => beacon.sync({ force: true }))
  .then(() => staticResponderStorefront.bulkCreate(stores))
  .then(msg => console.log(msg));
