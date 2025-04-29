import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function StudentHomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { student } = route.params || {};

  const handleLogout = () => {
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Student Dashboard</Text>
        {student && (
          <View style={styles.profileBox}>
            <Text style={styles.profileText}>👤 {student.name}</Text>
            <Text style={styles.profileText}>🆔 {student.sid}</Text>
            <Text style={styles.profileText}>📧 {student.email}</Text>
            <Text style={styles.profileText}>🏫 {student.class}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Menu */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentTimeTable')}>
            <Text style={styles.cardText}>📅 Time Table</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("StudentAttendance", { student })}> */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentAttendance', { studentId: student.sid, student })}>

            <Text style={styles.cardText}>📊 Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentClasswork')}>
            <Text style={styles.cardText}>📚 Classwork</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentHomework')}>
            <Text style={styles.cardText}>📝 Homework</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentNotices')}>
            <Text style={styles.cardText}>📢 Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentQuiz')}>
            <Text style={styles.cardText}>🧪 Quizzes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentResults')}>
            <Text style={styles.cardText}>📈 My Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentProfile', { student })}>
  <Text style={styles.cardText}>🧍 Profile</Text>
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
    backgroundColor: '#eef2f5',
  },
  header: {
    paddingTop: 60,
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
