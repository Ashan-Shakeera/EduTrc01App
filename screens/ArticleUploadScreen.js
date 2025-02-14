import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';

// Articles with local images
const articles = [
  {
    id: 1,
    title: 'Database',
    description: 'An organized collection of data that allows users to store, retrieve, and manage information efficiently.',
    image: require('../assets/images/database-image.jpg'), // Use local image
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'The process of creating websites and web applications, including front-end and back-end development.',
    image: require('../assets/images/web-development-image.jpg'), // Use local image
  },
  {
    id: 3,
    title: 'Facebook and Social Issues',
    description: 'Facebook contributes to misinformation, privacy breaches, and cyberbullying, raising ethical concerns.',
    image: require('../assets/images/facebook-social-issues-image.jpg'), // Use local image
  },
  {
    id: 4,
    title: 'Social Media and Mind Control',
    description: 'Social media affects human psychology and behavior, potentially leading to addiction and anxiety.',
    image: require('../assets/images/social-media-image.jpg'), // Use local image
  },
  {
    id: 5,
    title: 'How to Communicate in Society',
    description: 'Effective communication is key to building strong relationships and thriving in society.',
    image: require('../assets/images/communication-image.jpg'), // Use local image
  },
  {
    id: 6,
    title: 'Education and Society',
    description: 'Education shapes individuals and communities, promoting social development and reducing poverty.',
    image: require('../assets/images/education-image.jpg'), // Use local image
  }
];

export default function ArticleUploadScreen({ navigation }) {
  const handleArticlePress = (article) => {
    // Navigate to the detailed article screen and pass the article data
    navigation.navigate('ArticleDetail', {
      title: article.title,
      description: article.description,
      image: article.image,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upload Articles</Text>

      {articles.map((article) => (
        <View key={article.id} style={styles.articleContainer}>
          <Image source={article.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleArticlePress(article)} // Navigate to ArticleDetailScreen
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
