import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TeacherAttendanceScreen() {
  const navigation = useNavigation();

  // Mock data – use real classes from backend
  const classList = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📊 Select Class to Mark Attendance</Text>
      {classList.map((cls, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() =>
            navigation.navigate('MarkAttendance', { selectedClass: cls })
          }
        >
          <Text style={styles.cardText}>{cls}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: '#dff9fb',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: { fontSize: 18, fontWeight: '500' },
});
