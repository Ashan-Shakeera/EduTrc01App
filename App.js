import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './ThemeContext'; // Import the ThemeProvider

export default function App() {
  return (
    // Wrap AppNavigator with ThemeProvider to provide theme context to the whole app
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
