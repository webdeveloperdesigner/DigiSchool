import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TeacherQuizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧪 Teacher Quiz Manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold', color: '#1e88e5' },
});
