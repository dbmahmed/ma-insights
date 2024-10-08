const navigationPage = (navigation, Variables) => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  // console.log(navigation);
  // console.log(Variables);
  // return props.navigation

  navigation.navigate('EventDetailsScreen', { event_id: 1 });

  // return "Some text to show";
};

export default navigationPage;
