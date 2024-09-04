import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../index'; // Import RootState type

type Theme = 'light' | 'dark'; // Type for theme

interface ThemeState {
  theme: Theme; // Current theme state
}

const initialState: ThemeState = {
  theme: 'light', // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Action to toggle between light and dark theme
    toggleTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      AsyncStorage.setItem('theme', state.theme); // Save theme to AsyncStorage
    },
    // Action to set a specific theme
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Selector to access the theme state from the store
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
