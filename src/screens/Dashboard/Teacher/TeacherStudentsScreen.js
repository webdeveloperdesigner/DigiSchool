import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { database } from '../../firebase'; // your configured firebase
import { ref, get, child } from 'firebase/database';
import { useRoute } from '@react-navigation/native';

export default function TeacherStudentsScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { tid } = route.params || {}; // pass tid from login

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Step 1: Find teacher's assignedClass
        const teacherSnap = await get(ref(database, `users/teachers`));
        let assignedClass = '';
        teacherSnap.forEach(childSnap => {
          const data = childSnap.val();
          if (data.tid === tid) {
            assignedClass = data.assignedClass;
          }
        });

        if (!assignedClass) {
          console.warn('Assigned class not found!');
          setLoading(false);
          return;
        }

        // Step 2: Get list of student IDs in that class
        const classSnap = await get(ref(database, `classes/${assignedClass}/students`));
        const studentIds = classSnap.val() || [];

        // Step 3: Fetch each student data using IDs
        const studentPromises = studentIds.map(async (id) => {
          const studentSnap = await get(ref(database, `users/students/${id}`));
          return studentSnap.val();
        });

        const studentList = await Promise.all(studentPromises);
        setStudents(studentList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [tid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text>Loading students...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👨‍🎓 My Students</Text>
      {students.length === 0 ? (
        <Text>No students found.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.sid}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Email: {item.email}</Text>
              <Text style={styles.info}>Class: {item.class}</Text>
              <Text style={styles.info}>SID: {item.sid}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f8ff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#1e88e5' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});
