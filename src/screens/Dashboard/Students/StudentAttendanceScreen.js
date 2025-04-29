import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';

const StudentAttendanceScreen = ({ route }) => {
  const { studentId } = route.params; // Example: 'student_1' or '2025000001'
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attendanceRef = ref(database, 'attendance');

    onValue(attendanceRef, (snapshot) => {
      const data = snapshot.val();
      const attendanceList = [];

      // Iterate over all dates
      for (const date in data) {
        const classes = data[date];

        for (const className in classes) {
          const students = classes[className];

          if (students.hasOwnProperty(studentId)) {
            attendanceList.push({
              date,
              className,
              status: students[studentId]
            });
          }
        }
      }

      // Sort by latest date
      attendanceList.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAttendanceData(attendanceList);
      setLoading(false);
    });
  }, [studentId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance for {studentId}</Text>
      {attendanceData.length === 0 ? (
        <Text style={styles.noData}>No attendance data found.</Text>
      ) : (
        <FlatList
          data={attendanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>📅 {item.date}</Text>
              <Text>🏫 Class: {item.className}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default StudentAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noData: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    borderColor: '#81c784',
    borderWidth: 1,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
