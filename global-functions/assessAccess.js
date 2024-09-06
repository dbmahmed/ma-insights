const assessAccess = (Variables, setGlobalVariableValue) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  let me = Variables.ME;
  if (me.email !== undefined && me.email !== '') {
    return true;
  } else {
    return false;
  }
};

export default assessAccess;
