import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Alert, Animated, Easing, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background.jpg'); // Ensure correct path

// Updated article data with subtopics and images
const article = {
  title: "Encouraging Sustainable Practices, Human Rights, and Gender Equality",
  mainTopic: {
    summary: "Environmental pollution, human rights violations, and gender inequality are major global concerns. Addressing these issues requires sustainable practices, awareness programs, and support systems. This document explores ways to reduce environmental pollution, promote resource conservation, support human rights and gender equality, and understand the impact of culture and sexuality on society. Additionally, it provides essential contacts for reporting violence against women."
  },
  sections: [
    {
      title: "1. How Can We Encourage Practices That Reduce Environmental Pollution and Promote Resource Conservation?",
      content: [
        "A. Reducing Environmental Pollution",
        "- Waste Management – Proper disposal, recycling, and reducing single-use plastics.",
        "- Sustainable Transportation – Using public transport, cycling, or electric vehicles.",
        "- Eco-friendly Production – Encouraging businesses to adopt green manufacturing.",
        "- Reducing Carbon Emissions – Planting trees, using renewable energy, and energy-efficient appliances.",
        "- Raising Awareness – Educating people about the impact of pollution through campaigns and social media.",
        "B. Promoting Resource Conservation",
        "- Water Conservation – Fixing leaks, rainwater harvesting, and using water-efficient appliances.",
        "- Energy Efficiency – Switching to LED bulbs, solar power, and turning off unused devices.",
        "- Sustainable Agriculture – Promoting organic farming and reducing chemical fertilizers.",
        "- Biodiversity Conservation – Protecting forests, marine life, and endangered species.",
        "- Supporting Green Policies – Encouraging government policies for sustainability."
      ],
      image: require('../assets/environment.jpg') // Add image path
    },
    {
      title: "2. What Are Some Programs That Promote Human Rights and Gender Equality?",
      content: [
        "A. Global Programs for Human Rights",
        "- United Nations Human Rights Council (UNHRC) – Works to protect global human rights.",
        "- Amnesty International – Advocates for justice and freedom for marginalized groups.",
        "- Human Rights Watch – Investigates and reports human rights violations.",
        "- International Labour Organization (ILO) – Ensures fair labor rights.",
        "- World Health Organization (WHO) – Protects health rights and access to medical care.",
        "B. Programs Supporting Gender Equality",
        "- UN Women – Promotes gender equality worldwide.",
        "- HeForShe Campaign – Encourages men to support women’s rights.",
        "- Global Fund for Women – Provides financial support for women’s organizations.",
        "- Plan International – Because I Am a Girl – Focuses on girls’ education and rights.",
        "- The Malala Fund – Supports girls' access to education globally."
      ],
      image: require('../assets/human_rights.jpg') // Add image path
    },
    {
      title: "3. Where Can You Report Violence Against Women?",
      content: [
        "A. International Support Organizations",
        "- UN Women – www.unwomen.org",
        "- International Domestic Violence Helpline – +1-800-799-7233 (USA)",
        "- Women’s Refuge (Global) – www.womensrefuge.org",
        "B. Country-Specific Helplines",
        "- Sri Lanka Women’s Helpline – 1938",
        "- India – National Commission for Women – 1091",
        "- UK – National Domestic Abuse Helpline – 0808 2000 247",
        "- USA – National Domestic Violence Hotline – 1-800-799-7233",
        "C. Local Police & NGOs",
        "- Contacting the nearest police station.",
        "- Reaching out to women’s protection NGOs.",
        "- Seeking help from legal aid organizations for victims of abuse."
      ],
      image: require('../assets/violence_against_women.jpg') // Add image path
    },
    {
      title: "4. How Does Culture Influence Sexuality and Social Norms?",
      content: [
        "A. Understanding Cultural Impact on Sexuality",
        "- Social Norms – Traditions and values shape attitudes towards relationships.",
        "- Religious Beliefs – Influence perspectives on marriage, gender roles, and sexual behavior.",
        "- Educational Systems – Affect awareness of reproductive health and rights.",
        "- Media Influence – Shapes perceptions of beauty, relationships, and sexuality.",
        "- Legal Systems – Varying laws affect LGBTQ+ rights and sexual education policies.",
        "B. Importance of Sexual Education",
        "- Prevents Misinformation – Educates about reproductive health and safe practices.",
        "- Encourages Consent and Respect – Promotes healthy relationships.",
        "- Supports LGBTQ+ Rights – Creates inclusive and accepting societies.",
        "- Reduces Unwanted Pregnancies & STDs – Promotes responsible decision-making.",
        "- Empowers Individuals – Helps people understand their bodies and rights."
      ],
      image: require('../assets/culture_sexuality.jpg') // Add image path
    }
  ],
  quiz: [
    {
      question: "What is a key practice to reduce environmental pollution?",
      options: ["Using single-use plastics", "Planting trees", "Increasing carbon emissions", "Ignoring waste management"],
      correctAnswer: "Planting trees"
    },
    {
      question: "Which organization promotes gender equality worldwide?",
      options: ["UN Women", "Amnesty International", "WHO", "ILO"],
      correctAnswer: "UN Women"
    },
    {
      question: "What is the helpline number for domestic violence in the USA?",
      options: ["1091", "1938", "1-800-799-7233", "0808 2000 247"],
      correctAnswer: "1-800-799-7233"
    },
    {
      question: "How does culture influence sexuality?",
      options: ["Through social norms", "Through religious beliefs", "Through media influence", "All of the above"],
      correctAnswer: "All of the above"
    }
  ]
};

export default function ArticleDetailScreen({ navigation }) {
  const [openSectionIndex, setOpenSectionIndex] = useState(null); // Track open section
  const [animation] = useState(new Animated.Value(0)); // Animation value
  const [quizAnswers, setQuizAnswers] = useState([]); // Track quiz answers
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Track quiz submission

  // Toggle section visibility with animation
  const toggleSection = (index) => {
    if (openSectionIndex === index) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setOpenSectionIndex(null));
    } else {
      setOpenSectionIndex(index);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  // Handle the Edit Article button click
  const handleEdit = () => {
    Alert.alert("Edit Article", "This will take you to the edit screen.");
    // Navigation to edit screen can be implemented here
  };

  // Handle the Delete Article button click
  const handleDelete = () => {
    Alert.alert("Delete Article", "Are you sure you want to delete this article?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => navigation.goBack() }
    ]);
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (questionIndex, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answer;
    setQuizAnswers(newAnswers);
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correctAnswers = article.quiz.filter((q, index) => q.correctAnswer === quizAnswers[index]).length;
    Alert.alert("Quiz Results", `You got ${correctAnswers} out of ${article.quiz.length} correct!`);
  };

  // Animated background color for section headers
  const animatedBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.6)'],
  });

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} /> {/* Dark overlay for better readability */}
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Article Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Main Topic Summary */}
        <View style={styles.mainTopicContainer}>
          <Text style={styles.mainTopicText}>{article.mainTopic.summary}</Text>
        </View>

        {/* Article Sections */}
        {article.sections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => toggleSection(index)}>
              <Animated.View style={[styles.sectionHeader, { backgroundColor: animatedBackgroundColor }]}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Ionicons
                  name={openSectionIndex === index ? "chevron-up-outline" : "chevron-down-outline"}
                  size={24}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
            {openSectionIndex === index && (
              <View style={styles.sectionContent}>
                {section.image && <Image source={section.image} style={styles.sectionImage} />}
                {Array.isArray(section.content) ? (
                  section.content.map((line, i) => (
                    <Text key={i} style={styles.sectionText}>{line}</Text>
                  ))
                ) : (
                  <Text style={styles.sectionText}>{section.content}</Text>
                )}
              </View>
            )}
          </View>
        ))}

        {/* Quiz Section */}
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>Quiz</Text>
          {article.quiz.map((q, index) => (
            <View key={index} style={styles.quizQuestion}>
              <Text style={styles.quizQuestionText}>{q.question}</Text>
              {q.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.quizOption,
                    quizAnswers[index] === option && styles.quizOptionSelected
                  ]}
                  onPress={() => handleQuizAnswer(index, option)}
                >
                  <Text style={styles.quizOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity style={styles.quizSubmitButton} onPress={handleQuizSubmit}>
            <Text style={styles.quizSubmitButtonText}>Submit Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Action Button (FAB) for Edit and Delete */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fab, styles.deleteFab]} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainTopicContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  mainTopicText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  sectionContent: {
    padding: 15,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 20,
  },
  quizContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  quizQuestion: {
    marginBottom: 15,
  },
  quizQuestionText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  quizOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  quizOptionSelected: {
    backgroundColor: '#3498db',
  },
  quizOptionText: {
    fontSize: 14,
    color: '#fff',
  },
  quizSubmitButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  quizSubmitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  fab: {
    backgroundColor: '#3498db',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  deleteFab: {
    backgroundColor: '#e74c3c',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});