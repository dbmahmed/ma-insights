import React from 'react';

// Function to push or remove data from arrays
const modifyArrays = (array, value, action) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  if (action === 'push') {
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
  }

  return array;
};

export default modifyArrays;
