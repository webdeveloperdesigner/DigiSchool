import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { database } from '../../firebase';
import { ref, set, onValue, push } from 'firebase/database';

export default function TeacherHomeworkScreen() {
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [uploadedHomework, setUploadedHomework] = useState([]);

  // Replace these with the actual logged-in teacher's info
  const teacherId = 'TID2025XYZ';
  const teacherName = 'Mr. Vivek';

  // Upload homework
  const uploadHomework = () => {
    if (!className || !date || !title || !description || !subject) {
      Alert.alert('Please fill all fields');
      return;
    }

    const homeworkRef = ref(database, `homework/${className}/${date}`);
    set(homeworkRef, {
      title,
      description,
      subject,
      uploadedById: teacherId,
      uploadedByName: teacherName,
    })
      .then(() => Alert.alert('Homework uploaded successfully!'))
      .catch((error) => Alert.alert('Upload failed', error.message));
  };

  // Fetch all homework uploaded by this teacher
  useEffect(() => {
    const allHomeworkRef = ref(database, 'homework');

    const unsubscribe = onValue(allHomeworkRef, (snapshot) => {
      const data = snapshot.val();
      const teacherHomework = [];

      if (data) {
        Object.entries(data).forEach(([classKey, classData]) => {
          Object.entries(classData).forEach(([dateKey, hw]) => {
            if (hw.uploadedById === teacherId) {
              teacherHomework.push({
                id: `${classKey}-${dateKey}`,
                className: classKey,
                date: dateKey,
                ...hw,
              });
            }
          });
        });
      }

      setUploadedHomework(teacherHomework.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📘 Upload Homework</Text>

      <TextInput placeholder="Class Name" style={styles.input} onChangeText={setClassName} />
      <TextInput placeholder="Date (YYYY-MM-DD)" style={styles.input} onChangeText={setDate} />
      <TextInput placeholder="Title" style={styles.input} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={styles.input} onChangeText={setDescription} />
      <TextInput placeholder="Subject" style={styles.input} onChangeText={setSubject} />
      <Button title="Upload Homework" onPress={uploadHomework} />

      <Text style={styles.subHeading}>🧾 My Uploaded Homework</Text>
      <FlatList
        data={uploadedHomework}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>📚 {item.subject}</Text>
            <Text>📝 {item.description}</Text>
            <Text>🏫 Class: {item.className}</Text>
            <Text>📅 Date: {item.date}</Text>
            <Text style={styles.by}>🧑‍🏫 {item.uploadedByName} ({item.uploadedById})</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1e88e5' },
  subHeading: { fontSize: 20, marginVertical: 15, fontWeight: 'bold', color: '#4caf50' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  by: { marginTop: 5, fontStyle: 'italic', color: '#555' },
});
