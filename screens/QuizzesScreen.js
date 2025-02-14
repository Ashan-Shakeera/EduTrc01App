import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function QuizzesScreen() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const quizzes = {
    python_basics: [
      { question: 'What is the correct syntax to output "Hello World" in Python?', options: ['echo "Hello World"', 'print("Hello World")', 'console.log("Hello World")', 'System.out.println("Hello World")'], answer: 'print("Hello World")' },
      { question: 'Which keyword is used to define a function in Python?', options: ['def', 'function', 'func', 'define'], answer: 'def' },
      { question: 'Which data type is immutable in Python?', options: ['List', 'Dictionary', 'Tuple', 'Set'], answer: 'Tuple' },
      { question: 'What will be the output of `3 * "abc"`?', options: ['abcabcabc', 'Error', '3abc', 'abc3'], answer: 'abcabcabc' },
    ],
    web_development: [
      { question: 'Which HTML tag is used to define the largest heading?', options: ['<h1>', '<h6>', '<head>', '<header>'], answer: '<h1>' },
      { question: 'Which CSS property is used to change text color?', options: ['text-color', 'color', 'font-color', 'foreground'], answer: 'color' },
      { question: 'Which unit is NOT relative in CSS?', options: ['em', 'rem', 'px', '%'], answer: 'px' },
      { question: 'What does the "position: absolute;" property do?', options: ['Positions an element relative to itself', 'Positions an element relative to the nearest positioned ancestor', 'Positions an element at the center of the page', 'Fixes the element in place'], answer: 'Positions an element relative to the nearest positioned ancestor' },
    ],
    database_management: [
      { question: 'Which SQL command is used to retrieve data from a database?', options: ['GET', 'SELECT', 'FETCH', 'SHOW'], answer: 'SELECT' },
      { question: 'Which SQL clause is used to filter records?', options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'], answer: 'WHERE' },
      { question: 'Which of the following is a NoSQL database?', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'], answer: 'MongoDB' },
      { question: 'What does ACID stand for in database transactions?', options: ['Automated, Consistent, Independent, Durable', 'Atomicity, Consistency, Isolation, Durability', 'Association, Classification, Integrity, Data', 'Access, Control, Integration, Design'], answer: 'Atomicity, Consistency, Isolation, Durability' },
    ],
  };

  const startQuiz = (quizKey) => {
    setSelectedQuiz(quizKey);
    setIsQuizStarted(true);
    setUserAnswers({});
    setScore(null);
    animateButton();
  };

  const retakeQuiz = () => {
    setUserAnswers({});
    setScore(null);
    animateButton();
  };

  const selectAnswer = (questionIndex, selectedOption) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
  };

  const submitQuiz = () => {
    let correctAnswers = 0;
    quizzes[selectedQuiz].forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    animateButton();
  };

  const quitQuiz = () => {
    setSelectedQuiz(null);
    setIsQuizStarted(false);
    setUserAnswers({});
    setScore(null);
    animateButton();
  };

  const animateButton = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Quizzes</Text>
            <Text style={styles.subHeader}>Test your knowledge and earn certificates!</Text>
          </View>

          {/* Certificate Details */}
          <View style={styles.certificateContainer}>
            <Text style={styles.certificateHeader}>Certificate Details</Text>
            <View style={styles.certificateContent}>
              <Text style={styles.certificateText}>Student Name: Sunil Yosh</Text>
              <Text style={styles.certificateText}>Student ID: 258451</Text>
              <Text style={styles.certificateText}>Date: 2025-02-07</Text>
            </View>
          </View>

          {/* Quiz Selection */}
          {!selectedQuiz && score === null && !isQuizStarted && (
            <View style={styles.quizInstructionsContainer}>
              <Text style={styles.instructionsHeader}>How to Take the Quiz</Text>
              <Text style={styles.instructionsText}>
                1. Select a quiz to start. {'\n'}
                2. Answer the questions. {'\n'}
                3. Submit the quiz to see your score. {'\n'}
                4. You can quit any time if you're not ready to finish the quiz.
              </Text>

              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.quizButton} onPress={() => startQuiz('python_basics')}>
                  <Icon name="code" size={24} color="#fff" />
                  <Text style={styles.quizButtonText}>Python Basics</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.quizButton} onPress={() => startQuiz('web_development')}>
                  <Icon name="web" size={24} color="#fff" />
                  <Text style={styles.quizButtonText}>Web Development</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.quizButton} onPress={() => startQuiz('database_management')}>
                  <Icon name="storage" size={24} color="#fff" />
                  <Text style={styles.quizButtonText}>Database Management</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}

          {/* Quiz Questions */}
          {selectedQuiz && score === null && isQuizStarted && (
            <>
              {quizzes[selectedQuiz].map((q, index) => (
                <View key={index} style={styles.questionContainer}>
                  <Text style={styles.question}>{q.question}</Text>
                  {q.options.map((option, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.option, userAnswers[index] === option && styles.selectedOption]}
                      onPress={() => selectAnswer(index, option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.submitButton} onPress={submitQuiz}>
                  <Text style={styles.submitButtonText}>Submit Quiz</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.quitButton} onPress={quitQuiz}>
                  <Text style={styles.quitButtonText}>Quit</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}

          {/* Quiz Results */}
          {score !== null && selectedQuiz && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Your Score: {score} / {quizzes[selectedQuiz].length}</Text>
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.retakeButton} onPress={retakeQuiz}>
                  <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity style={styles.backButton} onPress={quitQuiz}>
                  <Text style={styles.backButtonText}>Back to Quizzes</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContainer: { padding: 20 },
  headerContainer: { marginBottom: 30 },
  header: { fontSize: 36, fontWeight: 'bold', color: '#fff', textAlign: 'center', fontFamily: 'Roboto-Bold' },
  subHeader: { fontSize: 16, color: '#e0e0e0', textAlign: 'center', marginTop: 5, fontFamily: 'Roboto-Regular' },
  certificateContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20, borderRadius: 15, marginBottom: 30, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  certificateHeader: { fontSize: 24, fontWeight: 'bold', color: '#34495e', marginBottom: 10, fontFamily: 'Roboto-Bold' },
  certificateContent: { paddingHorizontal: 10 },
  certificateText: { fontSize: 16, color: '#7f8c8d', marginVertical: 5, fontFamily: 'Roboto-Regular' },
  quizInstructionsContainer: { width: '100%', alignItems: 'center' },
  instructionsHeader: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#fff', textAlign: 'center', fontFamily: 'Roboto-Bold' },
  instructionsText: { fontSize: 16, textAlign: 'center', color: '#e0e0e0', marginBottom: 20, lineHeight: 24, fontFamily: 'Roboto-Regular' },
  quizButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quizButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Roboto-Bold' },
  questionContainer: { marginBottom: 20, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  question: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#34495e', fontFamily: 'Roboto-Bold' },
  option: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#3498db',
  },
  optionText: { fontSize: 16, color: '#34495e', fontFamily: 'Roboto-Regular' },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold' },
  quitButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  quitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold' },
  scoreContainer: { alignItems: 'center', marginTop: 30 },
  scoreText: { fontSize: 24, fontWeight: 'bold', color: '#27ae60', marginBottom: 20, fontFamily: 'Roboto-Bold' },
  retakeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  retakeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold' },
  backButton: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto-Bold' },
});