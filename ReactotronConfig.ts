import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'React Native Demo' })
  .use(reactotronRedux())
  .useReactNative()
  .connect();

if (__DEV__) {
  console.tron = Reactotron;
  Reactotron.clear();
}

export default Reactotron;
