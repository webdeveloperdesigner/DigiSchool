import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from '../../firebase';

const TeacherProgressScreen = ({ route }) => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacherId = route?.params?.teacherId;

  useEffect(() => {
    if (!teacherId) {
      console.error('No teacherId provided in route.params');
      return;
    }

    const fetchData = async () => {
      try {
        const snapshot = await database.ref('attendance').once('value');
        const data = snapshot.val();
        const filteredProgress = [];

        for (const date in data) {
          for (const className in data[date]) {
            const classData = data[date][className];

            for (const studentId in classData) {
              const student = classData[studentId];

              // Check if this class belongs to this teacher
              const classInfoSnapshot = await database.ref(`classes/${className}`).once('value');
              const classInfo = classInfoSnapshot.val();

              if (classInfo && classInfo.teacherId === teacherId) {
                filteredProgress.push({
                  date,
                  className,
                  studentId,
                  status: student,
                });
              }
            }
          }
        }

        setProgressData(filteredProgress);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>📅 {item.date}</Text>
      <Text style={styles.text}>🏫 Class: {item.className}</Text>
      <Text style={styles.text}>🧑 Student ID: {item.studentId}</Text>
      <Text style={styles.text}>✅ Status: {item.status}</Text>
    </View>
  );

  if (!teacherId) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>❌ No teacherId passed to this screen.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loading}>Loading progress...</Text>
      ) : progressData.length > 0 ? (
        <FlatList
          data={progressData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.text}>No progress data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#eef6ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TeacherProgressScreen;
