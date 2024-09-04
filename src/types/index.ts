// Type definitions for navigation parameters
export type RootStackParamList = {
  Login: undefined; // No parameters needed for Login screen
  Register: undefined; // No parameters needed for Register screen
  Home: undefined; // No parameters needed for Home screen
  ProductDetails: { productId: number }; // Parameters needed for ProductDetails screen
  Profile: undefined; // No parameters needed for Profile screen
  AddProduct: undefined; // No parameters needed for AddProduct screen
  Order: { productId: number }; // Parameters needed for Order screen
};

// Interface for Order object
export interface Order {
  id: string; // Unique identifier for the order
  productId: number; // ID of the product
  customerName: string; // Name of the customer
  address: string; // Delivery address
  date: string; // Date of the order
}

// Interface for User object
export interface User {
  id: string; // Unique identifier for the user
  theme: 'light' | 'dark'; // User's theme preference
  username: string; // Username of the user
  password?: string; // Optional password for the user
}
