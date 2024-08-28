const resetAccess = (navigation, Variables, setGlobalVariableValue) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  setGlobalVariableValue({
    key: 'AUTH_HEADER',
    value: '',
  });

  setGlobalVariableValue({
    key: 'ME',
    value: {},
  });
  console.log('test navigation');
  navigation.navigate('LogInScreen');
};

export default resetAccess;
