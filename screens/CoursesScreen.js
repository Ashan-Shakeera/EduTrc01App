import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

export default function CoursesScreen() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // Local Banner & Background Images
  const bannerImage = require('../assets/banner.jpg');
  const backgroundImage = require('../assets/background.jpg');

  // Course Data
  const courses = {
    course1: {
      title: 'Programming Basics',
      image: require('../assets/programming.jpg'),
      introduction: 'Learn the fundamental concepts of programming, including syntax, logic, and problem-solving.',
      subtopics: {
        intro: {
          title: 'Introduction to Programming',
          image: require('../assets/intro.jpg'),
          lessons: ['What is Programming?', 'History of Programming', 'Types of Programming Languages'],
          notes: [
            'Programming is the process of writing instructions for computers to execute.',
            'There are different programming paradigms such as procedural, object-oriented, and functional programming.',
            'Popular languages include Python, JavaScript, Java, and C#.',
          ],
        },
        python: {
          title: 'Python Basics',
          image: require('../assets/python.jpg'),
          lessons: ['Variables & Data Types', 'Control Structures', 'Functions'],
          notes: [
            'Python is an interpreted, high-level programming language.',
            'It supports multiple programming paradigms, including procedural and object-oriented.',
            'Common uses include web development, automation, and data science.',
          ],
        },
      },
    },
    course2: {
      title: 'Web Development',
      image: require('../assets/webdev.jpg'),
      introduction: 'Learn how to build modern websites using HTML, CSS, and JavaScript.',
      subtopics: {
        html: {
          title: 'HTML Basics',
          image: require('../assets/html.jpg'),
          lessons: ['HTML Elements', 'Forms & Inputs', 'HTML5 Features'],
          notes: [
            'HTML (HyperText Markup Language) is the standard language for creating webpages.',
            'HTML consists of elements like headings, paragraphs, and links.',
            'Forms allow user interaction through inputs, checkboxes, and buttons.',
          ],
        },
        css: {
          title: 'CSS Styling',
          image: require('../assets/css.jpg'),
          lessons: ['CSS Selectors', 'Flexbox & Grid', 'CSS Animations'],
          notes: [
            'CSS (Cascading Style Sheets) is used to style HTML elements.',
            'Flexbox and Grid are powerful layout techniques for responsive design.',
            'Animations can be created using CSS transitions and keyframes.',
          ],
        },
      },
    },
    course3: {
      title: 'Sustainable Development',
      image: require('../assets/sustainable.jpg'),
      introduction: 'Explore the principles of sustainable development and their application in modern society.',
      subtopics: {
        esd: {
          title: 'Education for Sustainable Development',
          image: require('../assets/esd.jpg'),
          lessons: ['Principles of ESD', 'Global Goals', 'Sustainable Lifestyles'],
          notes: [
            'ESD empowers learners to take informed decisions for environmental integrity and economic viability.',
            'The UN Sustainable Development Goals (SDGs) provide a framework for action.',
            'Sustainable lifestyles involve reducing waste, conserving energy, and promoting equity.',
          ],
        },
        humanRights: {
          title: 'Human Rights & Equality',
          image: require('../assets/humanrights.jpg'),
          lessons: ['Universal Declaration of Human Rights', 'Gender Equality', 'Social Justice'],
          notes: [
            'Human rights are inherent to all individuals, regardless of nationality, sex, or ethnicity.',
            'Gender equality ensures equal opportunities and rights for all genders.',
            'Social justice promotes fairness and equity in society.',
          ],
        },
      },
    },
    course4: {
      title: 'Global Citizenship',
      image: require('../assets/global.jpg'),
      introduction: 'Understand the role of global citizenship in fostering peace, diversity, and sustainable development.',
      subtopics: {
        peace: {
          title: 'Culture of Peace & Non-Violence',
          image: require('../assets/peace.jpg'),
          lessons: ['Promoting Peace', 'Conflict Resolution', 'Non-Violent Communication'],
          notes: [
            'A culture of peace involves promoting dialogue and understanding.',
            'Conflict resolution techniques help resolve disputes peacefully.',
            'Non-violent communication fosters empathy and cooperation.',
          ],
        },
        diversity: {
          title: 'Cultural Diversity & Inclusion',
          image: require('../assets/diversity.jpg'),
          lessons: ['Appreciating Diversity', 'Inclusive Practices', 'Global Collaboration'],
          notes: [
            'Cultural diversity enriches societies and promotes innovation.',
            'Inclusion ensures that everyone feels valued and respected.',
            'Global collaboration addresses shared challenges like climate change and inequality.',
          ],
        },
      },
    },
    course5: {
      title: 'Technical & Vocational Education',
      image: require('../assets/technical.jpg'),
      introduction: 'Gain skills for employment, entrepreneurship, and lifelong learning.',
      subtopics: {
        skills: {
          title: 'Relevant Skills for Employment',
          image: require('../assets/skills.jpg'),
          lessons: ['Technical Skills', 'Vocational Training', 'Entrepreneurship'],
          notes: [
            'Technical skills are essential for modern jobs in technology and engineering.',
            'Vocational training provides hands-on experience for specific industries.',
            'Entrepreneurship fosters innovation and economic growth.',
          ],
        },
        access: {
          title: 'Equal Access to Education',
          image: require('../assets/access.jpg'),
          lessons: ['Affordable Education', 'Quality Assurance', 'Lifelong Learning'],
          notes: [
            'Affordable education ensures equal opportunities for all.',
            'Quality assurance maintains high standards in education.',
            'Lifelong learning promotes continuous personal and professional development.',
          ],
        },
      },
    },
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 📌 Banner Image */}
        <Image source={bannerImage} style={styles.banner} />

        <Text style={styles.header}>Courses Available</Text>

        {/* 📌 Display Courses */}
        {!selectedCourse && !selectedSubtopic && (
          <>
            {Object.keys(courses).map((courseKey) => (
              <TouchableOpacity
                key={courseKey}
                style={styles.courseCard}
                onPress={() => setSelectedCourse(courseKey)}
              >
                <Image source={courses[courseKey].image} style={styles.courseImage} />
                <Text style={styles.courseTitle}>{courses[courseKey].title}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* 📌 Display Subtopics with Course Introduction */}
        {selectedCourse && !selectedSubtopic && (
          <>
            <Image source={courses[selectedCourse].image} style={styles.banner} />
            <Text style={styles.introduction}>{courses[selectedCourse].introduction}</Text>

            <Text style={styles.subHeader}>Subtopics in {courses[selectedCourse].title}</Text>
            {Object.keys(courses[selectedCourse].subtopics).map((subKey) => (
              <TouchableOpacity
                key={subKey}
                style={styles.courseCard}
                onPress={() => setSelectedSubtopic(subKey)}
              >
                <Image source={courses[selectedCourse].subtopics[subKey].image} style={styles.courseImage} />
                <Text style={styles.courseTitle}>{courses[selectedCourse].subtopics[subKey].title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCourse(null)}>
              <Text style={styles.backButtonText}>Back to Courses</Text>
            </TouchableOpacity>
          </>
        )}

        {/* 📌 Display Lessons & Notes with Subtopic Image */}
        {selectedCourse && selectedSubtopic && (
          <>
            <Image source={courses[selectedCourse].subtopics[selectedSubtopic].image} style={styles.banner} />
            <Text style={styles.subHeader}>
              Lessons in {courses[selectedCourse].subtopics[selectedSubtopic].title}
            </Text>
            {courses[selectedCourse].subtopics[selectedSubtopic].lessons.map((lesson, index) => (
              <View key={index} style={styles.lessonContainer}>
                <Text style={styles.lessonText}>{lesson}</Text>
              </View>
            ))}
            <Text style={styles.subHeader}>Key Notes:</Text>
            {courses[selectedCourse].subtopics[selectedSubtopic].notes.map((note, index) => (
              <View key={index} style={styles.noteContainer}>
                <Text style={styles.noteText}>• {note}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedSubtopic(null)}>
              <Text style={styles.backButtonText}>Back to Subtopics</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

// ✨ Updated Styling
const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flexGrow: 1, alignItems: 'center', padding: 20 },
  banner: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10, marginBottom: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  courseCard: { backgroundColor: '#fff', borderRadius: 10, padding: 10, width: '90%', alignItems: 'center', marginBottom: 15, elevation: 5 },
  courseImage: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 },
  courseTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 10 },
  backButton: { backgroundColor: '#e74c3c', padding: 15, width: '90%', alignItems: 'center', borderRadius: 10, marginTop: 20 },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  introduction: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', marginBottom: 20 },
  subHeader: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15 },
  lessonContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, width: '90%', marginBottom: 10 },
  lessonText: { fontSize: 16, color: '#333' },
  noteContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, width: '90%', marginBottom: 10 },
  noteText: { fontSize: 14, color: '#555' },
});