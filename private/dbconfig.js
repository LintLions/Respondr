const config = {};
config.databaseUrl = 'postgres://msmith521:HenryHan@beacon.crp4gvy3wdff.us-east-1.rds.amazonaws.com:5432/beacon';
config.databaseOptions = {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

module.exports = config;
