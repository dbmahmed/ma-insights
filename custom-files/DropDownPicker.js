// This import is required if you are defining react components in this module.
import React, { useState } from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
import { Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// Define and export your components as named exports here.

const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]);

// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />
export const searchableDropdown = () => (
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
  />
);
