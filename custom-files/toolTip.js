// This import is required if you are defining react components in this module.
import React from 'react';
import ReactDOM from 'react-dom';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
// import { Text } from 'react-native';

// Define and export your components as named exports here.

// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />
// export const MyExampleComponent = () => <Text>Hello world!</Text>;

export default function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="tooltip" style={show ? { visibility: 'visible' } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
const rootElement = document.getElementsByTagName('img')[0];

ReactDOM.render(
  <Tooltip text="Simple tooltip">
    <button>Hover me!</button>
  </Tooltip>,
  rootElement
);
