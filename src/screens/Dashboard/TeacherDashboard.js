// TeacherDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function TeacherHomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacher } = route.params || {};

  const [teacherData, setTeacherData] = useState(teacher);

  const handleLogout = () => {
    navigation.replace('Welcome'); // or use navigation.navigate('Welcome')
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Teacher Dashboard</Text>
        {teacherData && (
          <View style={styles.profileBox}>
            <Text style={styles.profileText}>👤 {teacherData.name}</Text>
            <Text style={styles.profileText}>🆔 {teacherData.tid}</Text>
            <Text style={styles.profileText}>📧 {teacherData.email}</Text>
            <Text style={styles.profileText}>🏫 {teacherData.assignedClass}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>


      {/* Grid Menu */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TeacherTimeTable', { teacher })}
          >
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
          <Text style={styles.footerText}>© 2025 DS Public School | v0.0.3</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0fe', // Soft bluish background
  },
  header: {
    paddingTop: 60,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#ffffffcc', // Glass-like white
    borderBottomWidth: 1,
    borderColor: '#cfd8dc',
    elevation: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a', // Indigo-900
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  profileBox: {
    marginTop: 10,
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
  },
  profileText: {
    fontSize: 15,
    color: '#2c3e50',
    marginVertical: 2,
  },
  logoutBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    width: '48%',
    padding: 20,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#1e3a8a',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af', // Blue-800
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#7b8794',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
