import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { useRegisterMutation } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTheme } from '../store/slices/themeSlice';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';

// Type for navigation prop
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux dispatch and theme
  const dispatch = useDispatch();
  const theme = useColorScheme();

  // Mutation hook for registration
  const [register, { isLoading }] = useRegisterMutation();

  // Function to handle registration
  const handleRegister = async () => {
    if (email && password) {
      try {
        // Perform registration
        const { user } = await register({ username: email, password, theme: theme as 'light' | 'dark' }).unwrap();

        // Update user in Redux store
        dispatch(setUser({ email: user.username, id: user.id }));

        // Update theme in Redux store and AsyncStorage
        dispatch(setTheme(theme as 'light' | 'dark'));
        AsyncStorage.setItem('theme', JSON.stringify(theme));

        // Navigate to Home screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (error: any) {
        // Handle registration error
        Alert.alert('Error', error?.data?.error || 'Registration failed!');
      }
    } else {
      // Alert if fields are empty
      Alert.alert('Please fill in all fields!');
    }
  };

  // Define colors based on theme
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-black';
  const backgroundColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  const placeholderColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <View className={`flex-1 justify-center px-6 py-8 ${backgroundColor}`}>
      {/* Registration Title */}
      <Text className={`text-2xl font-bold self-center mb-6 ${inputTextColor}`}>
        Register
      </Text>

      {/* Email Input */}
      <Text className={`text-base mb-2 ${inputTextColor}`}>
        Email
      </Text>
      <CustomTextInput
        value={email}
        onChangeText={text => setEmail(text)}
        theme={theme as 'light' | 'dark'}
        placeholderTextColor={placeholderColor}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <Text className={`text-base mb-2 ${inputTextColor}`}>
        Password
      </Text>
      <CustomTextInput
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        theme={theme as 'light' | 'dark'}
        placeholderTextColor={placeholderColor}
      />

      {/* Register Button */}
      <CustomButton
        onPress={handleRegister}
        disabled={isLoading}
        theme={theme as 'light' | 'dark'}
        title="Register"
      />

      {/* Navigation to Login screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className="mt-4"
      >
        <Text className={`text-base ${inputTextColor}`}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
