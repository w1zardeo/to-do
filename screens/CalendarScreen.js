import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarScreen = ({ navigation }) => {
  // Генеруємо дні місяця
  const generateMonthDays = (month) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return days;
  };

  const renderMonth = ({ item: month }) => (
    <View style={styles.monthContainer}>
      <Text style={styles.monthText}>{month}</Text>
      <View style={styles.daysGrid}>
        {generateMonthDays(month).map((day, index) => (
            <Text 
            key={index}
            onPress={() => navigation.navigate('DayToDoScreen', { selectedDate: `${month} ${day}, 2024` })}
            style={styles.dayText}>{day}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.tasksText}>Tasks</Text>
      </TouchableOpacity>

      <FlatList
        data={months}
        renderItem={renderMonth}
        keyExtractor={(item) => item}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#141419',
  },
  tasksText: {
    fontSize: 18, // Той самий розмір, як у кнопці Calendar
    color: '#007BFF', // Синій колір тексту
    textAlign: 'left', // Розміщуємо текст у правій частині
    marginRight: 10,
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10
  },
  monthContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#1F1F23',
    borderRadius: 10,
    padding: 10,
  },
  monthText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayText: {
    width: '14%',
    color: '#ffffff',
    textAlign: 'center',
    padding: 2,
  },
});

export default CalendarScreen;
