const showNKPProp = (string, source) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  if (string) {
    if (
      source === 'NKP Proprietary' &&
      string.indexOf('NKP Proprietary') === -1
    ) {
      return `${string.trim()} (NKP Proprietary)`;
    } else {
      return string.trim();
    }
  } else return '';
};

export default showNKPProp;
