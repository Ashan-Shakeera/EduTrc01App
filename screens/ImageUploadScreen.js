import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';

// Sample local images (8 images)
const localImages = [
  { id: 1, imageUri: require('../assets/sample-image1.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 2, imageUri: require('../assets/sample-image2.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 3, imageUri: require('../assets/sample-image3.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 4, imageUri: require('../assets/sample-image4.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 5, imageUri: require('../assets/sample-image5.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 6, imageUri: require('../assets/sample-image6.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 7, imageUri: require('../assets/sample-image7.jpg'), likes: 0, comments: [], rating: 0 },
  { id: 8, imageUri: require('../assets/sample-image8.jpg'), likes: 0, comments: [], rating: 0 },
];

export default function ImageUploadScreen() {
  const [images, setImages] = useState(localImages);
  const [comment, setComment] = useState('');

  const addComment = (imageId) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId
          ? { ...image, comments: [...image.comments, comment] }
          : image
      )
    );
    setComment('');
  };

  const likeImage = (imageId) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId
          ? { ...image, likes: image.likes + 1 }
          : image
      )
    );
  };

  const handleRating = (imageId, rating) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId
          ? { ...image, rating: rating }
          : image
      )
    );
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.imageUri} style={styles.image} />

      {/* Like button */}
      <TouchableOpacity style={styles.likeButton} onPress={() => likeImage(item.id)}>
        <Text style={styles.likeText}>Like ({item.likes})</Text>
      </TouchableOpacity>

      {/* Rating Stars */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rate this Image:</Text>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(item.id, star)}>
            <Text style={[styles.star, item.rating >= star && styles.filledStar]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comments section */}
      <Text style={styles.commentHeader}>Comments:</Text>
      <FlatList
        data={item.comments}
        renderItem={({ item }) => <Text style={styles.commentText}>{item}</Text>}
        keyExtractor={(index) => index.toString()}
      />

      {/* Add comment */}
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => addComment(item.id)}
        disabled={!comment}
      >
        <Text style={styles.commentButtonText}>Post Comment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Image Upload & Interaction</Text>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { padding: 20 },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  likeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  likeText: { color: '#fff', fontWeight: 'bold' },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: { fontSize: 18, fontWeight: '600', color: '#34495e', marginRight: 10 },
  star: { fontSize: 30, color: '#ccc' },
  filledStar: { color: '#f1c40f' },
  commentHeader: { fontSize: 18, fontWeight: '600', color: '#34495e', marginBottom: 10 },
  commentText: { fontSize: 16, color: '#7f8c8d', marginBottom: 5 },
  commentInput: {
    backgroundColor: '#ecf0f1',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
  },
  commentButtonText: { color: '#fff', fontWeight: 'bold' },
});
