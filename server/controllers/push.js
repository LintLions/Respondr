const PushNotifications = require('node-pushnotifications');

const processKey = [
  process.env.APP_KEY1,
  process.env.APP_KEY2,
  process.env.APP_KEY3,
].join('\n');

const push = new PushNotifications({
  apn: {
    token: {
      key: processKey,
      // key: keyP8,
      keyId: process.env.APP_KEYID,
      teamId: process.env.APP_TEAM,
    },
    // cert: certPem,
    // key: keyPem,
  },
});

const data = {
  title: 'New push notification', // REQUIRED
  body: 'Powered by AppFeel', // REQUIRED
  custom: {
    sender: 'AppFeel',
  },
  priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
  locKey: '', // gcm, apn
  bodyLocArgs: '', // gcm, apn
  titleLocKey: '', // gcm, apn
  titleLocArgs: '', // gcm, apn
  retries: 1, // gcm, apn
  encoding: '', // apn
  badge: 1, // gcm for ios, apn
  alert: null, // apn, will take precedence over title and body
  // alert: '', // It is also accepted a text message in alert
  launchImage: '', // apn and gcm for ios
  action: '', // apn and gcm for ios
  topic: 'com.respondrapp.respondr', // apn and gcm for ios
  category: '', // apn and gcm for ios
  contentAvailable: '', // apn and gcm for ios
  mdm: '', // apn and gcm for ios
  urlArgs: '', // apn and gcm for ios
  truncateAtWordEnd: true, // apn and gcm for ios
  mutableContent: 0, // apn
  expiry: Math.floor(Date.now() / 1000) + 30, // seconds
};
const apnData = ({ title, body }) => ({
  payload: data.custom || {},
  badge: data.badge,
  sound: data.sound || 'ping.aiff',
  alert: data.alert || {
    title,
    body,
    action: data.action,
  },
  topic: data.topic, // Required
});

module.exports = { push, data, apnData };
// Or you could use it as a promise:
// push.send(registrationIds, data)
//     .then((results) => { ... })
//     .catch((err) => { ... });

