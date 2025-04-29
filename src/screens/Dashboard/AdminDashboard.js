import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';

export default function AdminHomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { admin } = route.params || {};  // Assuming admin data is passed in route.params

  const [adminData, setAdminData] = useState(admin);

  // Use effect to log the admin data when the component is mounted
  useEffect(() => {
    console.log('AdminHomeScreen rendered');
    console.log('Admin data:', adminData);
    console.log('Navigation:', navigation);
    console.log('Route:', route);
  }, [adminData, navigation, route]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🛠️ Admin Dashboard</Text>
        <Text style={styles.subHeader}>Welcome, Admin!</Text>
      </View>

      {/* Admin Profile Section */}
      {adminData ? (
        <View style={styles.profileBox}>
          <Text style={styles.profileText}>👤 {adminData.name}</Text>
          <Text style={styles.profileText}>🆔 {adminData.aid}</Text>
          <Text style={styles.profileText}>📧 {adminData.email}</Text>

          {/* Logout Button inside profile */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Welcome')}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.profileText}>Admin data not available.</Text>
      )}

      {/* Logout Button */}
      {/* <View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Welcome')}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
      </View> */}
      

      {/* Grid Menu */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ManageTeachers')}>
            <Text style={styles.cardText}>🧑‍🏫 Manage Teachers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ManageStudents')}>
            <Text style={styles.cardText}>👨‍🎓 Manage Students</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminTimeTable')}>
            <Text style={styles.cardText}>📅 Time Table</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminClasswork')}>
            <Text style={styles.cardText}>📚 Classwork</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminHomework')}>
            <Text style={styles.cardText}>📝 Homework</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminNotices')}>
            <Text style={styles.cardText}>📢 Notices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminQuizzes')}>
            <Text style={styles.cardText}>🧪 Quizzes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentProgress')}>
            <Text style={styles.cardText}>📈 Progress Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminAttendance')}>
            <Text style={styles.cardText}>📊 Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminSettings')}>
            <Text style={styles.cardText}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 DS Public School | Admin v1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f4f8',
    paddingBottom: 20,
  },

  header: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#2563eb', // Rich modern blue
    borderBottomWidth: 1,
    borderColor: '#cbd5e1',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },

  subHeader: {
    fontSize: 16,
    color: '#e0f2fe',
    marginTop: 4,
  },

  profileBox: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  profileText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 6,
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
    paddingHorizontal: 20,
    marginTop: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    width: '47%',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1e40af',
  },

  footer: {
    marginTop: 30,
    padding: 16,
    alignItems: 'center',
  },

  footerText: {
    color: '#94a3b8',
    fontSize: 13,
    fontStyle: 'italic',
  },
});
