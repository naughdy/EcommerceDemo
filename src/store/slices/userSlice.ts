import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  id: string; // User ID
  email: string; // User email
}

const initialState: UserState = {
  id: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user information
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      AsyncStorage.setItem('user', JSON.stringify({
        email: action.payload.email,
        id: action.payload.id,
      })).catch((error) => {
        console.error('Failed to save user data to AsyncStorage:', error);
      });
    },
    // Action to handle user logout
    logout: (state) => {
      state.email = '';
      state.id = '';
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('theme');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
