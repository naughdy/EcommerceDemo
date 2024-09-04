import 'react-native-gesture-handler';
import './ReactotronConfig';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, StackNavigationOptions } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/index';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrderScreen from './src/screens/OrderScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StatusBar, View, useColorScheme } from 'react-native';
import { setUser } from './src/store/slices/userSlice';
import { selectTheme } from './src/store/slices/themeSlice';

const Stack = createStackNavigator();

const transitionSpec: StackNavigationOptions['transitionSpec'] = {
  open: TransitionSpecs.TransitionIOSSpec,
  close: TransitionSpecs.TransitionIOSSpec,
};

const cardStyleInterpolator = ({ current, layouts }:any) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0],
        }),
      },
    ],
  },
});

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator,
  transitionSpec,
};

const MainNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');
  const dispatch = useDispatch();
  const systemTheme = useColorScheme();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const checkUserAndTheme = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const finalData = JSON.parse(userData);
          dispatch(setUser({ email: finalData.email, id: finalData.id }));
          setInitialRoute('Home');
        }
      } catch (error) {
        console.error('Failed to load user or theme data from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAndTheme();
  }, [dispatch, systemTheme]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={
          theme
            ? theme === 'dark'
              ? 'light-content'
              : !theme && systemTheme === 'dark'
              ? 'light-content'
              : 'dark-content'
            : 'dark-content'
        }
        animated={true}
      />
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
