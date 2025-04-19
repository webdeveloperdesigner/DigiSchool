import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const userId = route?.params?.id; // get passed ID from login

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to DigiSchool 🎓</Text>
      {user && (
        <>
          <Text style={styles.info}>Name: {user.name}</Text>
          <Text style={styles.info}>Role: {user.role}</Text>
          <Text style={styles.info}>ID: {user.id}</Text>
        </>
      )}
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginVertical: 5 },
});

export default HomeScreen;
