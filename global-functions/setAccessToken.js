import React from 'react';

const setAccessToken = (Variables, setGlobalVariableValue, newToken) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  // console.log(newToken);

  console.log(Variables);

  setTimeout(() => {
    setGlobalVariableValue({
      key: 'AUTH_HEADER',
      value: newToken,
    });
    console.log(Variables);
    return true;
  }, 1000);
};

export default setAccessToken;
