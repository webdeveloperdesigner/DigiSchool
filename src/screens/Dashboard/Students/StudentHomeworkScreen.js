import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

export default function StudentHomeworkScreen({ studentClass = 'Class 1' }) {
  const [homeworkList, setHomeworkList] = useState([]);

  useEffect(() => {
    const homeworkRef = ref(database, `homework/${studentClass}`);
    const unsubscribe = onValue(homeworkRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([date, hw]) => ({
          date,
          ...hw,
        }));
        setHomeworkList(list);
      } else {
        setHomeworkList([]);
      }
    });

    return () => unsubscribe();
  }, [studentClass]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📗 Homework for {studentClass}</Text>
      <FlatList
        data={homeworkList}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>📅 {item.date}</Text>
            <Text>📘 {item.subject}</Text>
            <Text style={styles.by}>🧑‍🏫 By {item.uploadedBy}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#388e3c', marginBottom: 20 },
  card: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
  by: { fontStyle: 'italic', color: '#555' },
});
