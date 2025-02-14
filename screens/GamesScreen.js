import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GamesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educational Games 🎮</Text>
      <Text style={styles.subtitle}>Choose a game to play and enhance your skills!</Text>

      <TouchableOpacity style={styles.gameCard} onPress={() => alert('Game Coming Soon!')}>
        <Ionicons name="rocket-outline" size={30} color="#fff" />
        <Text style={styles.cardText}>Math Challenge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gameCard} onPress={() => alert('Game Coming Soon!')}>
        <Ionicons name="bulb-outline" size={30} color="#fff" />
        <Text style={styles.cardText}>Logic Puzzle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C35',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  gameCard: {
    backgroundColor: '#3498db',
    width: '80%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
