import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function TeacherProfileScreen() {
  const [teacherDetails, setTeacherDetails] = useState({
    name: 'Hansamali Kurera',
    gender: 'Female',
    educationLevel: "Master's in Education",
    experience: '5 years of teaching experience',
    telephone: '+9472 7566541',
    gmail: 'hansamali@gmail.com',
    workPlaces: [
      { place: 'HTR School', duration: '2018-2020', specialNote: 'Taught high school Math' },
      { place: 'SSMV School', duration: '2020-Present', specialNote: 'Teaching programming and computer science' },
    ],
    teacherImage: require('./assets/teacherImage.jpg'), // Default image
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Update the teacher's image
      setTeacherDetails({ ...teacherDetails, teacherImage: { uri: result.assets[0].uri } });
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={teacherDetails.teacherImage} style={styles.profileImage} />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image source={teacherDetails.teacherImage} style={styles.modalImage} />
            <Text style={styles.modalName}>{teacherDetails.name}</Text>
            <Text style={styles.modalDetail}>{teacherDetails.gender}</Text>
            <Text style={styles.modalDetail}>{teacherDetails.educationLevel}</Text>
            <Text style={styles.modalDetail}>{teacherDetails.experience}</Text>
            <Text style={styles.modalDetail}>{teacherDetails.telephone}</Text>
            <Text style={styles.modalDetail}>{teacherDetails.gmail}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <Text style={styles.heading}>Teacher Profile</Text>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.detailText}>{teacherDetails.name}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.detailText}>{teacherDetails.gender}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Education Level:</Text>
          <Text style={styles.detailText}>{teacherDetails.educationLevel}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={styles.detailText}>{teacherDetails.experience}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Telephone:</Text>
          <Text style={styles.detailText}>{teacherDetails.telephone}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Gmail:</Text>
          <Text style={styles.detailText}>{teacherDetails.gmail}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.tableHeader}>Work Experience</Text>
        {teacherDetails.workPlaces.map((work, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableColumn}>{work.place}</Text>
            <Text style={styles.tableColumn}>{work.duration}</Text>
            <Text style={styles.tableColumn}>{work.specialNote}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={pickImage}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  profileImage: {
    width: 120 * 2, // 6 times larger
    height: 120 * 2, // 6 times larger
    borderRadius: 60 * 2, // 6 times larger
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#007bff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    maxWidth: width - 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#343a40',
  },
  detailText: {
    fontSize: 16,
    color: '#495057',
    marginTop: 5,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tableColumn: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    color: '#495057',
  },
  editButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});