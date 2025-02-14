import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  Image, ImageBackground, StyleSheet 
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Ensure this image exists in assets
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Logo & Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} /> 
          <Text style={styles.appName}>EduTrc01</Text>
          <Text style={styles.welcomeText}>Your gateway to education</Text>
        </View>

        {/* Login Card */}
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
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

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('HomeTabs')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Signup Navigation */}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Don't have an account? <Text style={styles.linkBold}>Sign Up</Text></Text>
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
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,  // Adjust logo size
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
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
    fontSize: 24,
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
