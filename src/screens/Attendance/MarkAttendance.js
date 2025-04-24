import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { database } from '.././firebase';

export default function MarkAttendance({ route }) {
  const { selectedClass } = route.params;
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const classRef = ref(database, `classes/${selectedClass}/students`);
    onValue(classRef, (snapshot) => {
      const studentIDs = snapshot.val();
      if (studentIDs) {
        const usersRef = ref(database, `users/students`);
        onValue(usersRef, (userSnap) => {
          const allStudents = userSnap.val();
          const studentArray = studentIDs.map((sid) => allStudents[sid]);
          setStudents(studentArray);

          const defaultStatus = {};
          studentArray.forEach((student) => {
            defaultStatus[student.sid] = true;
          });
          setAttendance(defaultStatus);
        });
      }
    });
  }, [selectedClass]);

  const toggleAttendance = (sid) => {
    setAttendance((prev) => ({
      ...prev,
      [sid]: !prev[sid],
    }));
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0];
    const formattedAttendance = {};
    Object.keys(attendance).forEach((sid) => {
      formattedAttendance[sid] = attendance[sid] ? 'Present' : 'Absent';
    });

    const attendanceRef = ref(database, `attendance/${today}/${selectedClass}`);
    set(attendanceRef, formattedAttendance)
      .then(() => alert('✅ Attendance saved successfully'))
      .catch((err) => alert('❌ Failed to save: ' + err.message));
  };

  const calculateSummary = () => {
    const total = students.length;
    const present = Object.values(attendance).filter((v) => v === true).length;
    const absent = total - present;
    const percent = total ? ((present / total) * 100).toFixed(2) : 0;
    return { total, present, absent, percent };
  };

  const fetchMonthlyAttendance = () => {
    const now = new Date();
    const month = now.toISOString().slice(0, 7); // YYYY-MM
    const attendanceRef = ref(database, 'attendance');

    onValue(attendanceRef, (snapshot) => {
      const allData = snapshot.val() || {};
      const monthDays = Object.entries(allData).filter(([date]) =>
        date.startsWith(month)
      );

      const summary = monthDays.map(([date, classData]) => {
        const classAttendance = classData[selectedClass] || {};
        const presentCount = Object.values(classAttendance).filter(
          (val) => val === 'Present'
        ).length;
        const total = Object.keys(classAttendance).length;
        const percent = total > 0 ? ((presentCount / total) * 100).toFixed(1) : 0;
        return { date, percent };
      });

      setMonthlyData(summary);
    });
  };

  const summary = calculateSummary();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📝 Mark Attendance - {selectedClass}</Text>

      <TextInput
        placeholder="🔍 Search student..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />

      {filteredStudents.map((student, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedStudent(student)}
          style={styles.studentCard}
        >
          <Text style={styles.studentText}>{student.name}</Text>
          <Switch
            value={attendance[student.sid]}
            onValueChange={() => toggleAttendance(student.sid)}
          />
        </TouchableOpacity>
      ))}

      <Button title="✅ Submit Attendance" onPress={handleSubmit} />

      <View style={{ marginTop: 20 }}>
        <Button title="📊 Show Summary" onPress={() => setShowSummary(!showSummary)} />
        {showSummary && (
          <View style={styles.summaryBox}>
            <Text>Total Students: {summary.total}</Text>
            <Text>✅ Present: {summary.present}</Text>
            <Text>❌ Absent: {summary.absent}</Text>
            <Text>📈 Attendance: {summary.percent}%</Text>
          </View>
        )}
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="📅 Show Monthly Attendance Chart" onPress={fetchMonthlyAttendance} />
        {monthlyData.map((entry, idx) => (
          <View key={idx} style={styles.monthlyBox}>
            <Text>{entry.date}: {entry.percent}% Present</Text>
          </View>
        ))}
      </View>

      {/* Student Detail Modal */}
      <Modal
        visible={selectedStudent !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedStudent(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>👤 Student Info</Text>
            {selectedStudent && (
              <>
                <Text>👤 Name: {selectedStudent.name}</Text>
                <Text>📧 Email: {selectedStudent.email}</Text>
                <Text>🆔 SID: {selectedStudent.sid}</Text>
                <Text>🎓 Class: {selectedStudent.class}</Text>
                <Text>📊 Status: {attendance[selectedStudent.sid] === undefined
                  ? '⏳ Pending'
                  : attendance[selectedStudent.sid]
                    ? '✅ Present'
                    : '❌ Absent'}
                </Text>
              </>
            )}
            <Button title="Close" onPress={() => setSelectedStudent(null)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f0f4f7', flexGrow: 1 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e86de',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  studentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryBox: {
    backgroundColor: '#d1f2eb',
    padding: 16,
    marginTop: 10,
    borderRadius: 10,
  },
  monthlyBox: {
    backgroundColor: '#fdebd0',
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 24,
    width: '80%',
    borderRadius: 12,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2e86de',
    textAlign: 'center',
  },
});
