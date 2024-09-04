import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/slices/orderSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/index';
import { selectTheme } from '../store/slices/themeSlice';
import BasicHeader from '../components/Header';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';

// Define route and navigation prop types for the screen
type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;
type OrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Order'>;

type Props = {
  route: OrderScreenRouteProp;
  navigation: OrderScreenNavigationProp;
};

// OrderScreen component definition
const OrderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params; // Get the product ID from route params
  const [customerName, setCustomerName] = useState(''); // State for customer name
  const [address, setAddress] = useState(''); // State for address

  const dispatch = useDispatch(); // Redux dispatch hook
  const theme = useSelector(selectTheme); // Get the current theme from Redux store

  // Function to handle order submission
  const handleOrder = () => {
    if (customerName && address) {
      // Dispatch createOrder action with the provided data
      dispatch(createOrder({
        productId,
        customerName,
        address,
        id: '', // Order ID (empty for now, to be handled in backend)
        date: '', // Order date (empty for now, to be handled in backend)
      }));
      Alert.alert('Order Placed Successfully'); // Show success alert
      navigation.navigate('Home'); // Navigate to Home screen
    } else {
      Alert.alert('Please provide all information'); // Show error alert if fields are empty
    }
  };

  // Define placeholder color based on theme
  const placeholderColor = theme === 'dark' ? '#888' : '#666';

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header component */}
      <BasicHeader theme={theme} title="Place Your Order" />

      <View className="justify-center p-6 flex-1">
        {/* Customer Name input */}
        <Text className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Customer Name
        </Text>
        <CustomTextInput
          value={customerName}
          onChangeText={setCustomerName}
          placeholderTextColor={placeholderColor}
          theme={theme as 'light' | 'dark'}
        />

        {/* Address input */}
        <Text className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Address
        </Text>
        <CustomTextInput
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={placeholderColor}
          theme={theme as 'light' | 'dark'}
        />

        {/* Place Order button */}
        <CustomButton
          onPress={handleOrder}
          theme={theme}
          title="Place Order"
        />
      </View>
    </View>
  );
};

export default OrderScreen;
