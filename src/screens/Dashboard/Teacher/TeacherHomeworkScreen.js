import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  Alert, FlatList, TouchableOpacity
} from 'react-native';
import { database } from '../../firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';

const TeacherHomeworkScreen = ({ route }) => {
  const teacher = route.params?.teacher;

  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [homeworks, setHomeworks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const fetchHomeworks = () => {
    const classRef = ref(database, `homework/${teacher?.assignedClass}/${today}`);
    onValue(classRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (const key in data) {
        if (data[key].uploadedBy === teacher?.tid) {
          list.push({ id: key, ...data[key] });
        }
      }
      setHomeworks(list.reverse());
    });
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const resetForm = () => {
    setSubject('');
    setTitle('');
    setDescription('');
    setEndDate('');
    setEditingId(null);
  };

  const handleUploadHomework = async () => {
    if (!subject || !title || !description || !endDate) {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const data = {
      title,
      description,
      subject,
      endDate,
      uploadedBy: teacher?.tid,
      uploadedByName: teacher?.name,
      homeworkId: `${teacher?.tid}-${today}-${teacher?.assignedClass}-${Date.now()}`
    };

    try {
      const classRef = ref(database, `homework/${teacher?.assignedClass}/${today}`);
      if (editingId) {
        await update(ref(database, `homework/${teacher?.assignedClass}/${today}/${editingId}`), data);
        Alert.alert('Homework updated successfully!');
      } else {
        await push(classRef, data);
        Alert.alert('Homework uploaded successfully!');
      }
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Error uploading homework');
    }

    setLoading(false);
  };

  const handleEdit = (item) => {
    setSubject(item.subject);
    setTitle(item.title);
    setDescription(item.description);
    setEndDate(item.endDate);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this homework?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          await remove(ref(database, `homework/${teacher?.assignedClass}/${today}/${id}`));
          Alert.alert('Homework deleted');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Homework</Text>

      <Text style={styles.label}>Class: {teacher?.assignedClass}</Text>
      <Text style={styles.label}>Teacher: {teacher?.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Button
        title={editingId ? 'Update Homework' : loading ? 'Uploading...' : 'Upload Homework'}
        onPress={handleUploadHomework}
        disabled={loading}
      />

      <Text style={[styles.heading, { marginTop: 30 }]}>My Uploaded Homeworks</Text>

      <FlatList
        data={homeworks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.homeworkItem}>
            <Text style={styles.title}>{item.title} ({item.subject})</Text>
            <Text>{item.description}</Text>
            <Text style={styles.meta}>Due: {item.endDate}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editBtn}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  homeworkItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  meta: {
    color: '#555',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editBtn: {
    marginRight: 10,
    padding: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: '#e53935',
    padding: 6,
    borderRadius: 5,
  },
});

export default TeacherHomeworkScreen;
