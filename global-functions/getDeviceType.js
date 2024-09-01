const getDeviceType = (web, ios, android) => {
  if (web) {
    return 'web';
  } else if (ios) {
    return 'ios';
  } else if (android) {
    return 'android';
  }
};

export default getDeviceType;
