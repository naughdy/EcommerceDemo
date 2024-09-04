import React from 'react';
import { View, Text, FlatList, Switch, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/slices/themeSlice';
import { RootState } from '../store';
import { logout } from '../store/slices/userSlice';
import { useUpdateThemeMutation } from '../services/auth'; // Assuming this service exists
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BasicHeader from '../components/Header';

// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // Select theme and dispatch from Redux
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // Select orders and user from Redux
  const orders = useSelector((state: RootState) => state.orders.orders);
  const user = useSelector((state: RootState) => state.user);

  // Hook for updating the theme on the server
  const [updateTheme] = useUpdateThemeMutation();

  // Function to handle theme toggle
  const handleToggleTheme = async () => {
    // Determine new theme
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    // Update theme in Redux store
    dispatch(toggleTheme(newTheme));
    // Update theme on the server
    await updateTheme({ userId: user.id, theme: newTheme }).unwrap();
  };

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Reset navigation to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    // Show logout confirmation
    Alert.alert('Logout', 'You have been logged out successfully.');
  };

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header with Profile title and Logout button */}
      <BasicHeader
        theme={theme}
        title="Profile"
        rightIconClick={handleLogout}
        rightIconName="sign-out"
      />

      {/* Content with Switch Theme and Order History */}
      <View className="p-6">
        {/* Switch Theme Section */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleToggleTheme}
            thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Order History Section */}
        <Text className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Order History
        </Text>

        {/* Conditionally render the order list */}
        {orders.length > 0 ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className={`p-4 my-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}>
                <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Product ID: {item.productId}
                </Text>
                <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Customer Name: {item.customerName}
                </Text>
                <Text className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Address: {item.address}
                </Text>
              </View>
            )}
          />
        ) : (
          <View className="items-center justify-center">
            <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4`}>
              There is no order history
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
