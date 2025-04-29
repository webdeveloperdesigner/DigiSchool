import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function StudentProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { student } = route.params || {};

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👨‍🎓 Student Profile</Text>
      </View>

      <View style={styles.profileBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{student?.name || 'N/A'}</Text>

        <Text style={styles.label}>Student ID (SID):</Text>
        <Text style={styles.value}>{student?.sid || 'N/A'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{student?.email || 'N/A'}</Text>

        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>{student?.class || 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>⬅️ Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 4,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
