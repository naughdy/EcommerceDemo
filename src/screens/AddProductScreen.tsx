import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAddProductMutation } from '../services/products';
import { selectTheme } from '../store/slices/themeSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BasicHeader from '../components/Header';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';

// Define navigation prop type for the screen
type AddProdScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddProduct'>;

type Props = {
  navigation: AddProdScreenNavigationProp;
};

// AddProductScreen component definition
const AddProductScreen: React.FC<Props> = ({ navigation }) => {
  // State hooks for form fields and media
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [media, setMedia] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Select user and theme from Redux store
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector(selectTheme);

  // Mutation hook for adding a product
  const [addProduct, { isLoading }] = useAddProductMutation();

  // Function to choose media from image library
  const handleChooseMedia = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setMedia(result.assets[0]);
      }
    } catch (error) {
      console.error('Error launching image library:', error);
    }
  };

  // Function to handle adding a product
  const handleAddProduct = async () => {
    if (!name || !description || !price || !media) {
      setError('Please fill out all fields.');
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    if (media) {
      formData.append('media', {
        uri: media.uri,
        type: media.type,
        name: media.fileName,
      } as any);
    }

    try {
      await addProduct(formData).unwrap();
      Alert.alert('Success', 'Product added successfully!');
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setMedia(null);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Error adding product');
    }
  };

  // Set placeholder color based on theme
  const placeholderColor = theme === 'dark' ? '#888' : '#666';

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header Section */}
      <BasicHeader theme={theme} title="Add Product" />

      {/* Form Section */}
      <View className="p-6 flex-1 justify-center">
        {error && (
          <Text className={`mb-4 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
            {error}
          </Text>
        )}
        <CustomTextInput
          placeholder="Product Name"
          placeholderTextColor={placeholderColor}
          value={name}
          onChangeText={setName}
          theme={theme}
        />
        <CustomTextInput
          placeholder="Description"
          placeholderTextColor={placeholderColor}
          value={description}
          onChangeText={setDescription}
          theme={theme}
        />
        <CustomTextInput
          placeholder="Price"
          placeholderTextColor={placeholderColor}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          theme={theme}
        />

        {/* Display selected media */}
        {media && (
          <Image
            source={{ uri: media.uri }}
            style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 16 }}
          />
        )}

        {/* Choose Media Button */}
        <TouchableOpacity
          onPress={handleChooseMedia}
          className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          <Text className="text-white text-center">Choose Media</Text>
        </TouchableOpacity>

        {/* Add Product Button */}
        <CustomButton
          onPress={handleAddProduct}
          disabled={isLoading}
          title="Add Product"
          theme={theme}
        />
      </View>
    </View>
  );
};

export default AddProductScreen;
