// LoginScreen.js

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { database } from '../firebase'; // Adjust the import based on your project structure
import { ref, onValue } from 'firebase/database';

export default function LoginScreen({ route, navigation }) {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const usersRef = ref(database, 'users');
    onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val();
        let found = false;

        for (let id in data) {
          const user = data[id];
          if (
            user.email === email &&
            user.password === password &&
            user.role === role
          ) {
            found = true;

            // 🔔 Show toast notification
            ToastAndroid.show(`Welcome ${role}`, ToastAndroid.SHORT);

            // 🔀 Navigate to appropriate screen
            if (role === 'Student') {
              navigation.replace('StudentHome');
            } else if (role === 'Teacher') {
              navigation.replace('TeacherHome');
            } else if (role === 'Admin') {
              navigation.replace('AdminHome');
            }
            break;
          }
        }

        if (!found) {
          ToastAndroid.show('Invalid credentials or role', ToastAndroid.SHORT);
        }
      },
      { onlyOnce: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as {role}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7', // Light, soft background
    
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50', // Dark color for contrast
    letterSpacing: 1.5,
    textShadowColor: '#fff', // Subtle shadow for the title
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    marginBottom: 18,
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#34495e',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adding depth to the inputs
  },
  button: {
    backgroundColor: '#4a90e2', // Flat modern blue
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0, // Remove default button shadow
    borderWidth: 1, // subtle border for definition
    borderColor: '#4a90e2', // match button color
  },
  buttonText: {
    color: '#fff', // White text on button
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase', // To add a modern touch
  },
});
