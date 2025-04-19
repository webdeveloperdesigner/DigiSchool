import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const handleLogin = async () => {
    if (!email || !id) {
      Alert.alert('Error', 'Please enter both Email and ID');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('email', '==', email), where('id', '==', id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        Alert.alert('Login Success', `Welcome ${userDoc.name}`);
        navigation.navigate('Home', { id: userDoc.id }); // Pass ID to HomeScreen
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Your ID"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});

export default LoginScreen;
