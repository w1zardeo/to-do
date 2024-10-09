import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ incompleteCount, completeCount, navigation, selectedDate }) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Використовуємо вибрану дату
    if (selectedDate) {
      setInputText(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TextInput
          style={styles.title}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter date"
          placeholderTextColor="#DADADA"
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.calendarButton}>Calendar</Text>
        </TouchableOpacity>
      </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'inter',
    marginTop: 76,
  },
  calendarButton: {
    color: '#007BFF',
    fontSize: 16,
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
