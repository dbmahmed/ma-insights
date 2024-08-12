import React from 'react';

const formatNumber = num => {
  return Intl.NumberFormat('en-us').format(num);
};

export default formatNumber;
