const showDate = (value, date, onlyPositive) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  if (
    !value ||
    value == '0.0' ||
    (onlyPositive === true && parseFloat(value) < 0)
  ) {
    return '';
  }

  return `(${date})`;
};

export default showDate;
