import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, Linking, TouchableOpacity, Alert, ImageBackground, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For using icons

export default function ContactScreen() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handlePhoneCall = () => {
    Linking.openURL('tel:0115876934'); // Remove spaces in the phone number
  };

  const handleEmail = () => {
    Linking.openURL('mailto:edutrc01@gmail.com'); // Replace with your actual email
  };

  const handleFeedbackSubmit = () => {
    if (!message || !rating || !feedback) {
      Alert.alert('Error', 'Please fill out all fields.');
    } else {
      Alert.alert('Thank You', 'Your feedback has been submitted!');
      // Reset form after submission
      setMessage('');
      setRating(0);
      setFeedback('');
    }
  };

  const handleClear = () => {
    setMessage('');
    setRating(0);
    setFeedback('');
  };

  return (
    <ImageBackground 
      source={require('./assets/background.jpg')} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Contact Us</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.info}>Address: M56/1 Malabe, Welawita, Sri Lanka</Text>

              <TouchableOpacity onPress={handlePhoneCall} style={styles.contactButton}>
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.contactButtonText}>Phone: 011 5876934</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEmail} style={styles.contactButton}>
                <Ionicons name="mail" size={20} color="#fff" />
                <Text style={styles.contactButtonText}>Email: edutrc01@gmail.com</Text>
              </TouchableOpacity>
            </View>

            {/* Message Box */}
            <TextInput
              style={styles.messageBox}
              multiline
              placeholder="Write your message here..."
              placeholderTextColor="#aaa"
              value={message}
              onChangeText={setMessage}
            />

            {/* Rating System */}
            <Text style={styles.label}>Rate our service:</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons 
                    name={rating >= star ? 'star' : 'star-outline'} 
                    size={30} 
                    color="#FFD700" 
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Feedback Form */}
            <TextInput
              style={styles.feedbackBox}
              multiline
              placeholder="Write your feedback here..."
              placeholderTextColor="#aaa"
              value={feedback}
              onChangeText={setFeedback}
            />

            {/* Submit and Clear Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    width: '90%',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: { 
    fontSize: 18, 
    marginVertical: 10, 
    color: '#fff',
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  contactButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  messageBox: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  feedbackBox: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});