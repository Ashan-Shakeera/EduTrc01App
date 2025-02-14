import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background.jpg'); // Ensure correct path

export default function HomeScreen({ navigation }) {
  // Function to get a dynamic greeting based on time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Logout Function
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} /> {/* Dark overlay for better readability */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Greeting & Title */}
        <Text style={styles.greeting}>{getGreeting()} 👋</Text>
        <Text style={styles.title}>Welcome to EduTrc01</Text>

        {/* 📌 Courses & Quizzes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses & Quizzes</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Courses')}>
              <Ionicons name="book-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Quizzes')}>
              <Ionicons name="clipboard-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Quizzes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📌 Profile & Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile & Settings</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserProfile')}>
              <Ionicons name="person-circle-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📌 Contribute Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contribute</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ArticleUpload')}>
              <Ionicons name="document-text-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Upload Article</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ImageUpload')}>
              <Ionicons name="image-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📌 Additional Pages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Pages</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Contact')}>
              <Ionicons name="call-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProfileEdit')}>
              <Ionicons name="pencil-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📌 Articles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Articles</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ArticleDetail')}
            >
              <Ionicons name="document-text-outline" size={30} color="#fff" />
              <Text style={styles.cardText}>View Article</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 📌 Teacher Section */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TeacherProfile')}>
          <Ionicons name="school-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Teacher Profile</Text>
        </TouchableOpacity>

        {/* 📌 Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#3498db',
    width: '48%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2ecc71',
    padding: 15,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 15,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});