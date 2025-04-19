import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function AdminHomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity
  const scaleAnim = useRef(new Animated.Value(0.7)).current; // Initial value for scaling

  useEffect(() => {
    // Fade-in and scale-up animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.text, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        Welcome, Admin 👑
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7', // Light background for freshness
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
