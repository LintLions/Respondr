const config = require('../private/dbconfig.js');
 
let sequelizeConfig = { url: config.databaseUrl, dialect: 'postgres', protocol: 'TCP'};
 
 module.exports = sequelizeConfig;