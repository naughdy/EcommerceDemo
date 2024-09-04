import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetProductByIdQuery } from '../services/products';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { selectTheme } from '../store/slices/themeSlice';
import BasicHeader from '../components/Header';
import CustomButton from '../components/Button';

// Define route and navigation prop types for the screen
type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

type Props = {
  route: ProductDetailsScreenRouteProp;
  navigation: ProductDetailsScreenNavigationProp;
};

// ProductDetailsScreen component definition
const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  // Get productId from route parameters
  const { productId } = route.params;

  // Get theme from the Redux store
  const theme = useSelector(selectTheme);

  // Query to get product details by productId
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  // Show loading indicator while fetching product data
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  // Show error message if there is an issue fetching product data
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <Text className="text-red-500">Error loading product details</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <BasicHeader theme={theme} title="Product Detail" />

      {/* Product Details */}
      <View className="mt-5 p-6 flex-1">
        {product?.media && (
          <Image
            source={{ uri: `http://localhost:3000${product.media}` }} // Adjust the URI based on your API response
            style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 16 }}
            resizeMode="cover"
          />
        )}
        <Text className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {product?.name}
        </Text>
        <Text className={`text-base mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {product?.description}
        </Text>
        <CustomButton
          theme={theme}
          title="Order Now"
          onPress={() => navigation.navigate('Order', { productId })}
        />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
