import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // your firebase.js path
import { getYear } from 'date-fns'; // If you want to generate SID/TID dynamically

const RegisterScreen = ({ navigation }) => {
  const [role, setRole] = useState('student'); // 'student' or 'teacher'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const generateId = () => {
    const year = getYear(new Date());
    if (role === 'student') {
      return `${year}0000${Math.floor(100000 + Math.random() * 900000)}`; // Student ID format: year0000xxxxx
    } else {
      return `${year}abc${Math.random().toString(36).slice(2, 10)}`; // Teacher ID format: yearabc...xxxx
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !role) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
  
    const generatedId = generateId();
    const userData = {
      name,
      email,
      role,
      id: generatedId,
    };
  
    try {
      // Save data to the appropriate collection (students or teachers)
      if (role === 'student') {
        // Corrected path for student: 'digischool/students/20250000819496'
        await setDoc(doc(db, 'digischool', 'students', generatedId), userData);
      } else {
        // Corrected path for teacher: 'digischool/teachers/2025abcxyz1234'
        await setDoc(doc(db, 'digischool', 'teachers', generatedId), userData);
      }
  
      Alert.alert('Registered!', `Your ${role.toUpperCase()} ID is: ${generatedId}`);
      navigation.navigate('Login'); // Navigate to Login Screen
    } catch (error) {
      console.error("Registration error:", error);  // Log error to console for debugging
      Alert.alert('Error', `Registration failed: ${error.message}`);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register as {role}</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button title={`Switch to ${role === 'student' ? 'Teacher' : 'Student'}`} onPress={() => setRole(role === 'student' ? 'teacher' : 'student')} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});

export default RegisterScreen;
