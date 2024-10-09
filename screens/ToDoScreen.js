import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import TaskModal from '../components/TaskModal';
import { useFonts } from 'expo-font';
import { Plus } from '../components/Plus';

const ToDoScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState({
      incomplete: [],
      complete: [],
    });
  
    const [showModal, setShowModal] = useState(false);
  
    const [fontsLoaded] = useFonts({
      'inter': require('../assets/fonts/Inter.ttf'),
    });
  
    const addTask = (newTask) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        incomplete: [...prevTasks.incomplete, newTask],
      }));
      setShowModal(false);
    };
  
    const toggleTask = (index, type) => {
      if (type === 'incomplete') {
        setTasks((prev) => {
          const newTasks = [...prev.incomplete];
          const completedTask = newTasks[index];
          newTasks.splice(index, 1);
          completedTask.completed = true; 
          return {
            ...prev,
            incomplete: newTasks,
            complete: [...prev.complete, completedTask],
          };
        });
      } else {
        setTasks((prev) => {
          const newTasks = [...prev.complete];
          const incompleteTask = newTasks[index];
          newTasks.splice(index, 1);
          incompleteTask.completed = false; 
          return {
            ...prev,
            complete: newTasks,
            incomplete: [...prev.incomplete, incompleteTask],
          };
        });
      }
    };
  
    const updateTaskText = (index, type, newText) => {
      setTasks((prev) => {
        const updatedTasks = [...prev[type]];
        updatedTasks[index].text = newText; 
        return {
          ...prev,
          [type]: updatedTasks,
        };
      });
    };
  
    const deleteTask = (index, type) => {
      setTasks((prev) => {
        const newTasks = [...prev[type]];
        newTasks.splice(index, 1); 
        return {
          ...prev,
          [type]: newTasks,
        };
      });
    };
  
    if (!fontsLoaded) {
      return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: 'center' }} />;
    }
  
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Header 
            incompleteCount={tasks.incomplete.length} 
            completeCount={tasks.complete.length} 
            navigation={navigation} // Передача navigation
          />
          <Tasks 
            tasks={tasks} 
            toggleTask={toggleTask} 
            deleteTask={deleteTask} 
            updateTaskText={updateTaskText} 
          />
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={() => setShowModal(true)}>
          <View>
            <Plus />
          </View>
        </TouchableOpacity>
        <TaskModal visible={showModal} onAddTask={addTask} onClose={() => setShowModal(false)} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingBottom: 1000, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#141419',
    },
    floatingButton: {
      position: 'absolute',
      top: 716,
      left: 303,
      width: 60,
      height: 60,
      backgroundColor: '#3F4EA0',
      borderWidth: 2,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#515CC6',
    },
  });
  
export default ToDoScreen;
