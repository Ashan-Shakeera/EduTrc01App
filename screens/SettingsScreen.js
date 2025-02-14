import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext'; // Import the theme context to access dark mode state

// Calculator component
const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    setInput(input + value);
  };

  const handleEqualPress = () => {
    try {
      setResult(eval(input));
    } catch (e) {
      setResult('Error');
    }
  };

  const handleClearPress = () => {
    setInput('');
    setResult('');
  };

  return (
    <View style={styles.calculatorContainer}>
      <TextInput
        style={[styles.calculatorInput, styles.shadow]}
        value={input}
        editable={false}
        placeholder="0"
      />
      <View style={styles.calculatorRow}>
        {['7', '8', '9', '/'].map((button) => (
          <TouchableOpacity
            key={button}
            style={[styles.calculatorButton, styles.shadow]}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.calculatorButtonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.calculatorRow}>
        {['4', '5', '6', '*'].map((button) => (
          <TouchableOpacity
            key={button}
            style={[styles.calculatorButton, styles.shadow]}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.calculatorButtonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.calculatorRow}>
        {['1', '2', '3', '-'].map((button) => (
          <TouchableOpacity
            key={button}
            style={[styles.calculatorButton, styles.shadow]}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.calculatorButtonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.calculatorRow}>
        {['0', '.', '=', '+'].map((button) => (
          <TouchableOpacity
            key={button}
            style={[
              styles.calculatorButton,
              button === '=' && styles.equalButton,
              styles.shadow,
            ]}
            onPress={button === '=' ? handleEqualPress : () => handlePress(button)}
          >
            <Text style={styles.calculatorButtonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.clearButton, styles.shadow]}
        onPress={handleClearPress}
      >
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <Text style={styles.calculatorResult}>Result: {result}</Text>
    </View>
  );
};

// Text conversion components
const TextToBinary = () => {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');

  const convertTextToBinary = () => {
    setBinary(text.split('').map(char => `0b${char.charCodeAt(0).toString(2)}`).join(' '));
  };

  const handleClear = () => {
    setText('');
    setBinary('');
  };

  return (
    <View style={[styles.converterContainer, styles.shadow]}>
      <TextInput
        style={styles.converterInput}
        value={text}
        onChangeText={setText}
        placeholder="Enter text to convert"
        placeholderTextColor="#999"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.converterButton, styles.shadow]}
          onPress={convertTextToBinary}
        >
          <Text style={styles.converterButtonText}>Convert to Binary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clearButton, styles.shadow]}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.convertedText}>{binary}</Text>
    </View>
  );
};

const BinaryToHexadecimal = () => {
  const [binary, setBinary] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');

  const convertBinaryToHex = () => {
    setHexadecimal(parseInt(binary, 2).toString(16).toUpperCase());
  };

  const handleClear = () => {
    setBinary('');
    setHexadecimal('');
  };

  return (
    <View style={[styles.converterContainer, styles.shadow]}>
      <TextInput
        style={styles.converterInput}
        value={binary}
        onChangeText={setBinary}
        placeholder="Enter binary to convert"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.converterButton, styles.shadow]}
          onPress={convertBinaryToHex}
        >
          <Text style={styles.converterButtonText}>Convert to Hexadecimal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clearButton, styles.shadow]}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.convertedText}>{hexadecimal}</Text>
    </View>
  );
};

const HexadecimalToBinary = () => {
  const [hexadecimal, setHexadecimal] = useState('');
  const [binary, setBinary] = useState('');

  const convertHexToBinary = () => {
    setBinary(parseInt(hexadecimal, 16).toString(2));
  };

  const handleClear = () => {
    setHexadecimal('');
    setBinary('');
  };

  return (
    <View style={[styles.converterContainer, styles.shadow]}>
      <TextInput
        style={styles.converterInput}
        value={hexadecimal}
        onChangeText={setHexadecimal}
        placeholder="Enter hexadecimal to convert"
        placeholderTextColor="#999"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.converterButton, styles.shadow]}
          onPress={convertHexToBinary}
        >
          <Text style={styles.converterButtonText}>Convert to Binary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clearButton, styles.shadow]}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.convertedText}>{binary}</Text>
    </View>
  );
};

const DecimalToHexadecimal = () => {
  const [decimal, setDecimal] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');

  const convertDecimalToHex = () => {
    setHexadecimal(parseInt(decimal).toString(16).toUpperCase());
  };

  const handleClear = () => {
    setDecimal('');
    setHexadecimal('');
  };

  return (
    <View style={[styles.converterContainer, styles.shadow]}>
      <TextInput
        style={styles.converterInput}
        value={decimal}
        onChangeText={setDecimal}
        placeholder="Enter decimal to convert"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.converterButton, styles.shadow]}
          onPress={convertDecimalToHex}
        >
          <Text style={styles.converterButtonText}>Convert to Hexadecimal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clearButton, styles.shadow]}
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.convertedText}>{hexadecimal}</Text>
    </View>
  );
};

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme state and toggle function

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkBackground]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme} // Toggle the theme on change
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Add the calculator */}
      <Calculator />

      {/* Text converters */}
      <TextToBinary />
      <BinaryToHexadecimal />
      <HexadecimalToBinary />
      <DecimalToHexadecimal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  darkBackground: {
    backgroundColor: '#1e1e1e', // Dark mode background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50', // Light mode text color
    marginBottom: 20,
  },
  darkText: {
    color: '#ecf0f1', // Dark mode text color
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  switchText: {
    fontSize: 18,
    marginRight: 10,
    color: '#34495e',
  },

  // Calculator styles
  calculatorContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  calculatorInput: {
    fontSize: 40,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    width: '90%',
    textAlign: 'right',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  calculatorRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  calculatorButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 8,
    borderRadius: 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 22,
  },
  equalButton: {
    backgroundColor: '#2ecc71',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calculatorResult: {
    fontSize: 24,
    marginTop: 20,
    color: '#2980b9',
  },

  // Text converter styles
  converterContainer: {
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 20,
  },
  converterInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    color: '#2c3e50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  converterButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    flex: 1,
    marginRight: 5,
  },
  converterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  convertedText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
