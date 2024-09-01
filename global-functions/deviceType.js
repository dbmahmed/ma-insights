const deviceType = (isWeb, isiOS, isAndroid) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  if (isWeb === true) {
    return 'web';
  } else if (isiOs === true) {
    return 'ios';
  } else if (isAndroid === true) {
    return 'android';
  }
};

export default deviceType;
