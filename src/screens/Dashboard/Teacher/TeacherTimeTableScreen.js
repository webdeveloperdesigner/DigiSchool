import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Update path as per your project

export default function TeacherTimeTableScreen({ route }) {
  const { teacher } = route.params || {}; // Receive teacher data from navigation
  const [classTimetable, setClassTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacher) {
      console.warn('No teacher data received!');
      setLoading(false);
      return;
    }

    const assignedClass = teacher.assignedClass;

    // Fetch the timetable for the teacher's assigned class
    const ttRef = ref(database, `timetable/${assignedClass}`);
    onValue(ttRef, (snapshot) => {
      const ttData = snapshot.val();
      if (ttData) {
        setClassTimetable(ttData);
      }
      setLoading(false);
    });
  }, [teacher]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading Timetable...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        📅 Timetable for {teacher?.assignedClass} ({teacher?.name})
      </Text>
      <Text style={styles.subHeader}>Teacher ID: {teacher?.tid}</Text>

      {Object.keys(classTimetable).map((day) => (
        <View key={day} style={styles.dayBlock}>
          <Text style={styles.dayTitle}>{day}</Text>
          {classTimetable[day].map((entry, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.subject}>{entry.subject}</Text>
              <Text style={styles.time}>⏰ {entry.time}</Text>
              <Text style={styles.teacher}>👤 {entry.teacher}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#999' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '400',
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayBlock: { marginBottom: 20 },
  dayTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#2c3e50' },
  card: {
    backgroundColor: '#f0f4f7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  subject: { fontSize: 18, fontWeight: 'bold', color: '#34495e' },
  time: { fontSize: 16, color: '#555' },
  teacher: { fontSize: 16, color: '#888' },
});
