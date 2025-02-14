import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Local image imports
const profilePlaceholder = require('../assets/profile-placeholder.png');
const backgroundImage = require('../assets/background-image.jpg'); // Add your background image here

export default function ProfileEditScreen() {
  // User state
  const [userDetails, setUserDetails] = useState({
    userName: 'Sunil Yosh',
    age: '24',
    educationLevel: "Bachelor's in Computer Science",
    certificates: ['Python Programming', 'Web Development', 'Database Management'],
    userImage: profilePlaceholder, // Local placeholder image
  });

  const [errors, setErrors] = useState({});
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Image picker function
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square image
        quality: 1,
      });

      if (!result.canceled) {
        setUserDetails({ ...userDetails, userImage: { uri: result.assets[0].uri } });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick an image. Please try again.');
    }
  };

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    if (!userDetails.userName.trim()) {
      newErrors.userName = 'Name is required';
    }
    if (!userDetails.age.trim() || isNaN(userDetails.age)) {
      newErrors.age = 'Age must be a valid number';
    }
    if (!userDetails.educationLevel.trim()) {
      newErrors.educationLevel = 'Education level is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save changes function
  const handleSave = () => {
    if (validateInputs()) {
      Alert.alert('Success', 'Your profile has been updated!');
      // Add your save logic here (e.g., API call)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => fadeAnim.setValue(0));
    }
  };

  // Add a new certificate
  const addCertificate = () => {
    const newCertificate = 'New Certificate';
    setUserDetails({
      ...userDetails,
      certificates: [...userDetails.certificates, newCertificate],
    });
  };

  // Remove a certificate
  const removeCertificate = (index) => {
    const updatedCertificates = userDetails.certificates.filter((_, i) => i !== index);
    setUserDetails({ ...userDetails, certificates: updatedCertificates });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Image */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <View style={styles.profileImageWrapper}>
              <Image source={userDetails.userImage} style={styles.profileImage} />
              <View style={styles.cameraIcon}>
                <MaterialIcons name="photo-camera" size={24} color="#fff" />
              </View>
            </View>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>

          {/* User Details Card */}
          <View style={styles.card}>
            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.userName && styles.inputError]}
                value={userDetails.userName}
                onChangeText={(text) => handleInputChange('userName', text)}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
              />
              {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
            </View>

            {/* Age */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, errors.age && styles.inputError]}
                value={userDetails.age}
                onChangeText={(text) => handleInputChange('age', text)}
                keyboardType="numeric"
                placeholder="Enter your age"
                placeholderTextColor="#999"
              />
              {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
            </View>

            {/* Education Level */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Education Level</Text>
              <TextInput
                style={[styles.input, errors.educationLevel && styles.inputError]}
                value={userDetails.educationLevel}
                onChangeText={(text) => handleInputChange('educationLevel', text)}
                placeholder="Enter your education level"
                placeholderTextColor="#999"
              />
              {errors.educationLevel && <Text style={styles.errorText}>{errors.educationLevel}</Text>}
            </View>

            {/* Certificates */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Certificates</Text>
              {userDetails.certificates.map((certificate, index) => (
                <View key={index} style={styles.certificateItem}>
                  <TextInput
                    style={[styles.input, styles.certificateInput]}
                    value={certificate}
                    onChangeText={(text) => {
                      const updatedCertificates = [...userDetails.certificates];
                      updatedCertificates[index] = text;
                      setUserDetails({ ...userDetails, certificates: updatedCertificates });
                    }}
                    placeholder="Certificate name"
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    onPress={() => removeCertificate(index)}
                    style={styles.removeCertificateButton}
                  >
                    <Feather name="x" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={addCertificate} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Certificate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={['#6a11cb', '#2575fc']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Animated.Text style={[styles.saveButtonText, { opacity: fadeAnim }]}>
                Save Changes
              </Animated.Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 249, 252, 0.8)', // Semi-transparent background
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  changePhotoText: {
    marginTop: 10,
    color: '#3498db',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 14,
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#dbe2e8',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 30,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  certificateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  certificateInput: {
    flex: 1,
    marginRight: 10,
  },
  removeCertificateButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});