const customRouting = (
  navigation,
  Variables,
  setGlobalVariableValue,
  screenName,
  param
) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  let params = {};

  if (
    Variables.screenParamName !== '' &&
    Variables.screenParamValue !== '' &&
    Variables.screenParamValue !== 0
  ) {
    params[Variables.screenParamName] = Variables.screenParamValue;
  }

  console.log(params);
  console.log(location);
  navigation.navigate(Variables.currentScreen + 'Screen', params);
};

export default customRouting;
