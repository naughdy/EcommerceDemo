import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { selectTheme } from '../store/slices/themeSlice';
import { useGetProductsQuery } from '../services/products';
import BasicHeader from '../components/Header';

// Define navigation prop type for the screen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// HomeScreen component definition
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // Select theme from Redux store
  const theme = useSelector(selectTheme);

  // Query hook for fetching products
  const { data: products, error, isLoading } = useGetProductsQuery();

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <Text className="text-red-500">Error loading products</Text>
      </View>
    );
  }

  // Header component for the list
  const ListHeader = () => (
    <View className="p-4">
      <Text className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        List of Products
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <BasicHeader
        theme={theme}
        title="Welcome"
        rightIconClick={() => navigation.navigate('Profile')}
        rightIconName="user"
        leftIconClick={() => navigation.navigate('AddProduct')}
        leftIconName="plus"
      />

      {/* Content */}
      <View className="flex-1 p-6">
        {products && products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
              >
                <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={ListHeader}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4`}>
              There are no products. Please add a product.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddProduct')}
              className={`p-4 border rounded-lg ${theme === 'dark' ? 'border-blue-700 bg-black-800' : 'border-blue-500 bg-black-100'}`}
            >
              <Text className={`text-blue-500 ${theme === 'dark' ? 'text-blue-300' : ''}`}>
                Add Product
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
