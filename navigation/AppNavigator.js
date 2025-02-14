import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import ArticleUploadScreen from '../screens/ArticleUploadScreen';
import ImageUploadScreen from '../screens/ImageUploadScreen';
import TeacherProfileScreen from '../screens/TeacherProfileScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen'; 
import GamesScreen from '../screens/GamesScreen'; // ✅ Import the new GamesScreen

// Import HomeTabs (Bottom Tab Navigator)
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="ArticleUpload" component={ArticleUploadScreen} />
        <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        
        {/* ✅ Add the new GamesScreen */}
        <Stack.Screen name="Games" component={GamesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
