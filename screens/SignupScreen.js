import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!firstName || !lastName || !country || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    navigation.replace('HomeTabs');
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Ensure you have this image in the assets folder
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <TextInput 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={setFirstName} 
            style={styles.input} 
            placeholderTextColor="#ccc"
          />
          <TextInput 
            placeholder="Last Name" 
            value={lastName} 
            onChangeText={setLastName} 
            style={styles.input} 
            placeholderTextColor="#ccc"
          />
          <TextInput 
            placeholder="Country" 
            value={country} 
            onChangeText={setCountry} 
            style={styles.input} 
            placeholderTextColor="#ccc"
          />
          <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
            style={styles.input} 
            placeholderTextColor="#ccc"
          />
          <TextInput 
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor="#ccc"
          />
          <TextInput 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            secureTextEntry 
            style={[styles.input, password !== confirmPassword && confirmPassword ? styles.errorInput : null]} 
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white box
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Shadow for Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  errorInput: {
    borderColor: '#e74c3c', // Highlight error for password mismatch
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    fontSize: 15,
    color: '#7f8c8d',
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#2980b9',
  },
});
