import React from 'react';

const setPadding = winWidth => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  if (winWidth <= 1200) {
    return 5;
  } else {
    return Math.round((winWidth - 1200) / 2);
  }
};

export default setPadding;
