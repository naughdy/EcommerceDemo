import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the props for BasicHeader component
interface BasicHeaderProps {
  theme: 'light' | 'dark'; // Theme for styling
  title: string; // Title to display in the header
  rightIconClick?: () => void; // Optional function for the right icon click
  rightIconName?: string; // Optional name for the right icon
  leftIconClick?: () => void; // Optional function for the left icon click
  leftIconName?: string; // Optional name for the left icon
}

// BasicHeader component
const BasicHeader: React.FC<BasicHeaderProps> = ({
  theme,
  title,
  rightIconClick,
  rightIconName,
  leftIconClick,
  leftIconName,
}) => {
  return (
    <View
      className={`flex-row items-center justify-center p-4 mt-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
    >
      {/* Left icon */}
      {leftIconName && (
        <TouchableOpacity
        testID="left-icon"
          onPress={leftIconClick}
          style={{ position: 'absolute', left: 16 }}
          className="p-2"
        >
          <Icon name={leftIconName} size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title}
      </Text>

      {/* Right icon */}
      {rightIconName && (
        <TouchableOpacity
        testID="right-icon"
          onPress={rightIconClick}
          style={{ position: 'absolute', right: 16 }}
        >
          <Icon name={rightIconName} size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BasicHeader;
