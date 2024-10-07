import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const paddingPercentageHeight = (76 / height) * 100;

const Header = ({ incompleteCount, completeCount }) => {
  // State to hold the input text
  const [inputText, setInputText] = useState('');

  // Function to format the date
  const formatDate = () => {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Update inputText with the formatted date on component mount
  useEffect(() => {
    setInputText(formatDate());
  }, []);

  return (
    <View style={styles.header}>
      <TextInput
        style={[styles.title, { paddingTop: height * (paddingPercentageHeight / 100) }]}
        value={inputText} // Controlled input
        onChangeText={setInputText} // Update state on text change
        placeholder="Enter date" // Placeholder text
        placeholderTextColor="#DADADA" // Color for placeholder
        underlineColorAndroid="transparent" // Remove underline on Android
      />
      <Text style={styles.subtitle}>{incompleteCount} incomplete, {completeCount} completed</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 0,
    marginTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'inter', // Use the custom loaded font
    marginTop: 0,
    marginLeft: 18,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#575767',
    fontFamily: 'inter',
    marginTop: 11,
    marginLeft: 18,
  },
  line: {
    height: 2,
    width: 343,
    backgroundColor: '#575767',
    marginTop: 16,
    marginLeft: 18,
    borderRadius: 5,
  },
});

export default Header;
