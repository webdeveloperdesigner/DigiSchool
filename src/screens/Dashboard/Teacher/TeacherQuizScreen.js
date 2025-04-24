import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { database } from '../../firebase';
import { ref, set } from 'firebase/database';

export default function TeacherQuizScreen() {
  const [quizTitle, setQuizTitle] = useState('');
  const [className, setClassName] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]); // All MCQs

  // Add one question to list
  const handleAddQuestion = () => {
    if (!questionText || !options || !correctAnswer) {
      alert("Fill all fields for the question.");
      return;
    }

    const questionObj = {
      question: questionText,
      options: options.split(',').map(o => o.trim()),
      correctAnswer
    };

    setQuestions([...questions, questionObj]);
    setQuestionText('');
    setOptions('');
    setCorrectAnswer('');
  };

  // Upload entire quiz + notice
  const handleUploadQuiz = () => {
    if (!quizTitle || !className || questions.length === 0) {
      alert("Quiz title, class, and at least one question are required.");
      return;
    }

    const quizId = `quiz_${Date.now()}`;
    const formattedQuestions = {};
    questions.forEach((q, index) => {
      formattedQuestions[`q${index + 1}`] = q;
    });

    const quizData = {
      title: quizTitle,
      class: className,
      questions: formattedQuestions,
    };

    set(ref(database, `quizzes/${quizId}`), quizData)
      .then(() => {
        alert("Quiz uploaded successfully!");

        const noticeId = `notice_${Date.now()}`;
        const noticeData = {
          title: `📢 New Quiz Uploaded for ${className}`,
          message: `🧪 "${quizTitle}" quiz has been uploaded with ${questions.length} question(s). Please attempt it before the deadline.`,
          date: new Date().toISOString().split('T')[0],
        };

        return set(ref(database, `notices/${noticeId}`), noticeData);
      })
      .then(() => {
        setQuizTitle('');
        setClassName('');
        setQuestions([]);
        alert('Notice added for quiz!');
      })
      .catch((error) => {
        console.error("Error uploading quiz/notice: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Upload a Quiz</Text>

      <TextInput style={styles.input} placeholder="Quiz Title" value={quizTitle} onChangeText={setQuizTitle} />
      <TextInput style={styles.input} placeholder="Class Name" value={className} onChangeText={setClassName} />

      <View style={styles.separator} />
      <Text style={styles.subtitle}>Add MCQ</Text>
      <TextInput style={styles.input} placeholder="Question" value={questionText} onChangeText={setQuestionText} />
      <TextInput style={styles.input} placeholder="Options (comma separated)" value={options} onChangeText={setOptions} />
      <TextInput style={styles.input} placeholder="Correct Answer" value={correctAnswer} onChangeText={setCorrectAnswer} />
      <Button title="Add Question" onPress={handleAddQuestion} />

      {questions.length > 0 && (
        <>
          <Text style={styles.previewTitle}>📋 Questions Preview ({questions.length})</Text>
          <FlatList
            data={questions}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.questionPreview}>
                <Text style={styles.qTitle}>{`Q${index + 1}. ${item.question}`}</Text>
                <Text style={styles.qOptions}>Options: {item.options.join(', ')}</Text>
                <Text style={styles.qAnswer}>✔️ Correct: {item.correctAnswer}</Text>
              </View>
            )}
          />
        </>
      )}

      <View style={{ marginVertical: 20 }}>
        <Button title="Upload Quiz & Notify Students" onPress={handleUploadQuiz} color="#1e88e5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fefefe' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1e88e5' },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 5 },
  input: {
    height: 40, borderColor: '#ccc', borderWidth: 1,
    marginBottom: 10, paddingLeft: 8, borderRadius: 4
  },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  previewTitle: { fontWeight: 'bold', marginTop: 15, fontSize: 18, color: '#333' },
  questionPreview: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f8ff',
    borderRadius: 8,
    borderColor: '#90caf9',
    borderWidth: 1,
  },
  qTitle: { fontSize: 16, fontWeight: 'bold' },
  qOptions: { marginTop: 4 },
  qAnswer: { color: 'green', marginTop: 2 }
});
