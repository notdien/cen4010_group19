import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function LoginScreen({ handleBackPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>Login Screen</Text>
      {/* Add your login screen components here */}
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'light',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  centerp: {
    fontSize: 16,
  },
  buttonsContainer: {
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});
