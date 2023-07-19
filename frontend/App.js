import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

export default function App() {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUpPress = () => {
    setRedirectToSignUp(true);
  };

  const handleLoginPress = () => {
    setRedirectToLogin(true);
  };

  const handleBackPress = () => {
    setRedirectToSignUp(false);
    setRedirectToLogin(false);
  };

  if (redirectToSignUp) {
    return <SignUpScreen handleBackPress={handleBackPress} />;
  }

  if (redirectToLogin) {
    return <LoginScreen handleBackPress={handleBackPress} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title}>TaskHUB</Text>

      <Text style={styles.description}>The App that reminds you.</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text style={styles.centerp}>Get started here!</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text>Create an Account</Text>
        </TouchableOpacity>
        <Text></Text>
       <Text></Text>
        <Text></Text>
        <Text style={styles.centerp}>           Login Here!</Text>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text>Login</Text>
        </TouchableOpacity>
 <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
      <Text>Brought to you by Group 19.</Text>
      </View>
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
