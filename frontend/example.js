import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity  } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to TaskHub</Text>
      <Text style={styles.description}>The App that reminds you.</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>Get started here!</Text>
      <View style={styles.buttonsContainer}>
        <Text style={styles.button}>Create an Account</Text>
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>Login Here!</Text>
      <View style={styles.buttonsContainer}>
        <Text style={styles.button}>Login</Text>
      </View>
      <Text></Text><Text></Text>
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text>Brought to you by Group 19.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    marginBottom: 10,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});
