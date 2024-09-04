import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

// Define the props for the CustomTextInput component
interface Props extends TextInputProps {
  theme: 'light' | 'dark'; // Theme can be 'light' or 'dark'
}

// CustomTextInput component definition
const CustomTextInput: React.FC<Props> = (props) => {
  // Extract theme from props and set styles accordingly
  const { theme, ...rest } = props;

  return (
    <TextInput
      {...rest} // Spread remaining props to the TextInput component
      placeholderTextColor={theme === 'dark' ? '#888' : '#666'} // Placeholder text color based on theme
      className={`border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
      } p-3 rounded-lg mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
    />
  );
};

export default CustomTextInput;
