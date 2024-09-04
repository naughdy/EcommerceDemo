import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { setTheme } from '../store/slices/themeSlice';
import { useLoginMutation } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';

// Define navigation prop type for the screen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

// LoginScreen component definition
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Get the current theme from the color scheme
  const theme = useColorScheme();

  // Mutation hook for login
  const [login, { isLoading }] = useLoginMutation();

  // Function to handle login
  const handleLogin = async () => {
    if (email && password) {
      try {
        // Attempt to log in the user
        const { user } = await login({ username: email, password }).unwrap();

        // Update user and theme in the Redux store
        dispatch(setUser({ email: user.username, id: user.id }));
        AsyncStorage.setItem('theme', user.theme);
        dispatch(setTheme(user.theme));

        // Navigate to Home screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (error: any) {
        // Show error alert if login fails
        Alert.alert('Error', error?.data?.error || 'Login failed!');
      }
    } else {
      // Show alert if any field is empty
      Alert.alert('Please fill in all fields!');
    }
  };

  // Determine styling based on the theme
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-black';
  const backgroundColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  const placeholderColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <View className={`flex-1 px-6 py-8 ${backgroundColor}`}>
      {/* Container for form elements */}
      <View className={'flex-1 justify-center'}>
        <Text className={`text-2xl self-center mb-6 font-bold ${inputTextColor}`}>
          Login
        </Text>
        <Text className={`text-base mb-2 ${inputTextColor}`}>
          Email
        </Text>
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={placeholderColor}
          keyboardType="email-address"
          autoCapitalize="none"
          theme={theme as 'light' | 'dark'}
        />
        <Text className={`text-base mb-2 ${inputTextColor}`}>
          Password
        </Text>
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          theme={theme as 'light' | 'dark'}
          placeholderTextColor={placeholderColor}
        />
        <CustomButton
          onPress={handleLogin}
          disabled={isLoading}
          theme={theme as 'light' | 'dark'}
          title="Login"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="mt-4"
        >
          <Text className={`text-base ${inputTextColor}`}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
