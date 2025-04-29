import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { database } from '../firebase'; // Adjust based on your structure
import { ref, onValue } from 'firebase/database';

export default function LoginScreen({ route, navigation }) {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const usersRef = ref(database, 'users');

    onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val();
        let found = false;

        const userGroup = data[role.toLowerCase() + 's']; // admins, teachers, students

        if (userGroup) {
          for (let id in userGroup) {
            const user = userGroup[id];

            if (
              user.email === email &&
              user.password === password &&
              user.role === role
            ) {
              found = true;
              ToastAndroid.show(`Welcome ${role}`, ToastAndroid.SHORT);

              if (role === 'Student') {
                navigation.replace('StudentHome', {
                  student: {
                    name: user.name,
                    sid: user.sid,
                    email: user.email,
                    class: user.class
                  }
                });
              } else if (role === 'Teacher') {
                navigation.replace('TeacherHome', {
                  teacher: {
                    name: user.name,
                    tid: user.tid,
                    email: user.email,
                    assignedClass: user.assignedClass
                  }
                });
              } else if (role === 'Admin') {
                navigation.replace('AdminHome', {
                  admin: {
                    name: user.name,
                    aid: user.aid,
                    email: user.email
                  }
                });
              }

              break;
            }
          }
        }

        if (!found) {
          ToastAndroid.show('Invalid credentials or role', ToastAndroid.SHORT);
        }
      },
      { onlyOnce: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as {role}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50',
    letterSpacing: 1.5,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    marginBottom: 18,
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#34495e',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
