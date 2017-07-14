exports.getHelp = () => {
  return {
    type: 'GET_HELP',
    isBeacon: true,
  };
};

exports.cancelHelp = () => {
  return {
    type: 'CANCEL_HELP',
    isBeacon: false,
  };
};

