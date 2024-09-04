import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

// Define the props for the CustomButton component
interface CustomButtonProps {
  onPress: () => void; // Function to be called when button is pressed
  title: string; // Button title
  disabled?: boolean; // Optional flag to disable the button
  theme: 'light' | 'dark'; // Theme to determine button styling
}

// CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, disabled = false, theme }) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : () => { }} // Execute onPress if not disabled
      disabled={disabled} // Disable button if the `disabled` flag is true
      className={`p-4 rounded-lg ${disabled ? 'bg-gray-400' : `${theme === 'dark' ? 'bg-green-700' : 'bg-green-500'}`}`} // Apply dynamic styles based on the theme and disabled state
    >
      {disabled ? (
        // Show loading indicator if the button is disabled
        <ActivityIndicator color="white" testID="loading-indicator"/>
      ) : (
        // Show button title when not disabled
        <Text className="text-white text-center">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
