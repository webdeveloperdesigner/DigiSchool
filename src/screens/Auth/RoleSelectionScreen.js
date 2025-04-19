import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const roles = ['Teacher', 'Student', 'Admin'];

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Role</Text>

      {roles.map(role => (
        <TouchableOpacity
          key={role}
          style={styles.button}
          onPress={() => navigation.navigate('Login', { role })}>
          <Text style={styles.buttonText}>{role}</Text>
        </TouchableOpacity>
      ))}

      {/* 👇 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9fc', // Light soft background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    color: '#2c3e50', // Dark blue-grey color for contrast
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Lighter translucent button
    width: '100%',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    backdropFilter: 'blur(5px)', // Web only, creates the glass effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
    transitionDuration: '0.3s',
  },
  buttonText: {
    color: '#2980b9', // Lighter blue text
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: '#56cfe1', // Lighter blue for contrast
    width: '50%',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#56cfe1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
