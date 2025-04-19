// TeacherDashboard.js


import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function TeacherHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Teacher Dashboard</Text>
      </View>

      {/* Grid Menu */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherTimeTable')}>
            <Text style={styles.cardText}>📅 Time Table</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherAttendance')}>
            <Text style={styles.cardText}>📊 Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherClasswork')}>
            <Text style={styles.cardText}>📚 Classwork</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherHomework')}>
            <Text style={styles.cardText}>📝 Homework</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherNotices')}>
            <Text style={styles.cardText}>📢 Notices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherQuiz')}>
            <Text style={styles.cardText}>🧪 Quizzes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherProgress')}>
            <Text style={styles.cardText}>📈 Student Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeacherStudents')}>
            <Text style={styles.cardText}>👨‍🎓 My Students</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 DS Public School | V0.0.3</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5', // soft background
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#dce1e7',
    elevation: 3,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 1,
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: '47%',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0d47a1',
  },
  footer: {
    marginTop: 30,
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
