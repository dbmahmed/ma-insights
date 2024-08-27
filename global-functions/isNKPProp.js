import React from 'react';

const isNKPProp = string => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  return string.indexOf('NKP Proprietary') != -1;
};

export default isNKPProp;
