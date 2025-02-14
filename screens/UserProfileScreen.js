import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function ProfileEditScreen() {
  // Dummy user data
  const [userDetails] = useState({
    userName: 'Sunil Yosh',
    age: 24,
    educationLevel: 'Bachelor\'s in Computer Science',
    certificates: [
      { name: 'Python Programming', progress: 80 },
      { name: 'Web Development', progress: 60 },
      { name: 'Database Management', progress: 90 },
    ],
    userImage: require('./assets/userImage.jpg'), // Local image path (make sure to place the image in the correct folder)
  });

  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation for fade-in effect

  // Function to handle edit button press
  const handleEdit = () => {
    Alert.alert('Edit Profile', 'Editing functionality is not available yet.');
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Function to render progress bars for certificates
  const renderProgressBar = (progress) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={darkMode ? ['#1c1c1c', '#333333'] : ['#6a11cb', '#2575fc']} // Gradient background
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <Image source={userDetails.userImage} style={styles.profileImage} />
          <Text style={[styles.userName, { color: darkMode ? '#fff' : '#fff' }]}>{userDetails.userName}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={24} color={darkMode ? '#fff' : '#fff'} />
          </TouchableOpacity>
        </Animatable.View>

        {/* Dark Mode Toggle */}
        <TouchableOpacity style={styles.darkModeButton} onPress={toggleDarkMode}>
          <Ionicons name={darkMode ? 'moon' : 'sunny'} size={24} color={darkMode ? '#fff' : '#fff'} />
          <Text style={[styles.darkModeText, { color: darkMode ? '#fff' : '#fff' }]}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>

        {/* User Details Section */}
        <Animatable.View animation="fadeInUp" duration={1000} style={[styles.detailsContainer, { backgroundColor: darkMode ? '#333' : 'rgba(255, 255, 255, 0.9)' }]}>
          {/* Age */}
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={24} color={darkMode ? '#6a11cb' : '#6a11cb'} />
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailLabel, { color: darkMode ? '#ccc' : '#666' }]}>Age</Text>
              <Text style={[styles.detailValue, { color: darkMode ? '#fff' : '#333' }]}>{userDetails.age}</Text>
            </View>
          </View>

          {/* Education Level */}
          <View style={styles.detailItem}>
            <Ionicons name="school-outline" size={24} color={darkMode ? '#6a11cb' : '#6a11cb'} />
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailLabel, { color: darkMode ? '#ccc' : '#666' }]}>Education Level</Text>
              <Text style={[styles.detailValue, { color: darkMode ? '#fff' : '#333' }]}>{userDetails.educationLevel}</Text>
            </View>
          </View>

          {/* Certificates */}
          <View style={styles.detailItem}>
            <Ionicons name="ribbon-outline" size={24} color={darkMode ? '#6a11cb' : '#6a11cb'} />
            <View style={styles.detailTextContainer}>
              <Text style={[styles.detailLabel, { color: darkMode ? '#ccc' : '#666' }]}>Certificates</Text>
              {userDetails.certificates.map((cert, index) => (
                <View key={index} style={styles.certificateItem}>
                  <Text style={[styles.certificateName, { color: darkMode ? '#fff' : '#333' }]}>{cert.name}</Text>
                  {renderProgressBar(cert.progress)}
                </View>
              ))}
            </View>
          </View>
        </Animatable.View>

        {/* Additional Actions (Optional) */}
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: darkMode ? '#444' : '#fff' }]}>
          <Text style={[styles.actionButtonText, { color: darkMode ? '#fff' : '#6a11cb' }]}>View Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: darkMode ? '#444' : '#fff' }]}>
          <Text style={[styles.actionButtonText, { color: darkMode ? '#fff' : '#6a11cb' }]}>Share Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  darkModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  darkModeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  detailsContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  certificateItem: {
    marginBottom: 10,
  },
  certificateName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6a11cb',
    borderRadius: 5,
  },
  actionButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});