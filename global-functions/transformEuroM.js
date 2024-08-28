const transformEuroM = value => {
  if (!value || value === '0.0') {
    return '-';
  }

  return `€${value}m`;
};

export default transformEuroM;
