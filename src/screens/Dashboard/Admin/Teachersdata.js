import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

const TeacherClassworkScreen = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [classDetails, setClassDetails] = useState({});

  useEffect(() => {
    const fetchTeachersAndData = async () => {
      try {
        const teacherRef = ref(database, 'users/teachers');
        const snapshot = await get(teacherRef);
        const data = snapshot.val();
        const teacherArray = data ? Object.values(data) : [];

        const classSnapshot = await get(ref(database, 'classes'));
        const classData = classSnapshot.val() || {};

        const timetableSnapshot = await get(ref(database, 'timetable'));
        const homeworkSnapshot = await get(ref(database, 'homework'));
        const noticeSnapshot = await get(ref(database, 'notices'));
        const quizSnapshot = await get(ref(database, 'quizzes'));

        const allDetails = {};

        for (let t of teacherArray) {
          const className = t.assignedClass;
          allDetails[t.tid] = {
            timetable: timetableSnapshot.val()?.[className] || {},
            homework: homeworkSnapshot.val()?.[className] || {},
            notices: Object.values(noticeSnapshot.val() || {}).filter(n =>
              n.title.includes(className) || n.message.includes(className)
            ),
            quizzes: Object.values(quizSnapshot.val() || {}).filter(q => q.class === className),
          };
        }

        setTeachers(teacherArray);
        setClassDetails(allDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachersAndData();
  }, []);

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 All Teachers</Text>
      {teachers.map((teacher) => (
        <TouchableOpacity
          key={teacher.tid}
          style={styles.card}
          onPress={() => openModal(teacher)}
        >
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.info}>Class: {teacher.assignedClass}</Text>
          <Text style={styles.info}>TID: {teacher.tid}</Text>
        </TouchableOpacity>
      ))}

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTeacher && (
              <>
                <Text style={styles.modalTitle}>{selectedTeacher.name}</Text>
                <Text>Email: {selectedTeacher.email}</Text>
                <Text>Class: {selectedTeacher.assignedClass}</Text>
                <Text>TID: {selectedTeacher.tid}</Text>

                <Text style={styles.sectionTitle}>📅 Timetable:</Text>
                {Object.entries(classDetails[selectedTeacher.tid]?.timetable || {}).map(([day, slots]) => (
                  <Text key={day}>{day}: {slots.map(s => `${s.subject} at ${s.time}`).join(', ')}</Text>
                ))}

                {/* <Text style={styles.sectionTitle}>📝 Homework:</Text>
                {Object.entries(classDetails[selectedTeacher.tid]?.homework || {}).map(([date, hw]) => (
                  <Text key={date}>{date}: {hw.title} - {hw.subject}</Text>
                ))} */}
                <Text style={styles.sectionTitle}>📝 Homework:</Text>
{classDetails[selectedTeacher.tid]?.homework &&
  Object.entries(classDetails[selectedTeacher.tid].homework).map(([date, hwItems]) => (
    <View key={date} style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: '600' }}>{date}</Text>
      {Object.values(hwItems).map((hw, idx) => (
        <Text key={idx}>
          {hw.subject.trim()}: {hw.title.trim()} - {hw.description.trim()}
        </Text>
      ))}
    </View>
))}


                <Text style={styles.sectionTitle}>📢 Notices:</Text>
                {classDetails[selectedTeacher.tid]?.notices?.map((n, idx) => (
                  <Text key={idx}>{n.date}: {n.title}</Text>
                ))}

                <Text style={styles.sectionTitle}>🧪 Quizzes:</Text>
                {classDetails[selectedTeacher.tid]?.quizzes?.map((q, idx) => (
                  <Text key={idx}>{q.title}</Text>
                ))}

                <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: '600',
    color: '#6200ee',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

export default TeacherClassworkScreen;
