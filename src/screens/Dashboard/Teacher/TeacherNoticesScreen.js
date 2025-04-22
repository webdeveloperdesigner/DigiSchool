import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust based on your path

export default function TeacherNoticesScreen() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const noticesRef = ref(database, 'notices');
    onValue(noticesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const noticesArray = Object.entries(data).map(([id, notice]) => ({
          id,
          ...notice,
        }));
        setNotices(noticesArray);
      } else {
        setNotices([]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1e88e5" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📢 Teacher Notices</Text>
      {notices.map((notice) => (
        <View key={notice.id} style={styles.noticeCard}>
          <Text style={styles.title}>{notice.title}</Text>
          <Text style={styles.message}>{notice.message}</Text>
          <Text style={styles.date}>📅 {notice.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e88e5',
    textAlign: 'center',
  },
  noticeCard: {
    backgroundColor: '#f0f4f7',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
