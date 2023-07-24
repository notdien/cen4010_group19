import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// different pages
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import CreateScreen from './CreateScreen'; // Import the CreateScreen component
import Todoscreen from './Todoscreen';

// const Stack = createNativeStackNavigator();

export default function App() {
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToCreate, setRedirectToCreate] = useState(false); // Add state for CreateScreen redirection
  const [redirectTodo, setRedirectTodo] = useState(false); // Add state for CreateScreen redirection

  const handleSignUpPress = () => {
    setRedirectToSignUp(true);
    setRedirectToLogin(false);
    setRedirectToCreate(false); // Make sure CreateScreen redirection is disabled
    setRedirectTodo(false);
  };

  const handleLoginPress = () => {
    setRedirectToSignUp(false); // Make sure SignUpScreen redirection is disabled
    setRedirectToLogin(true);
    setRedirectToCreate(false); // Make sure CreateScreen redirection is disabled
    setRedirectTodo(false);
  };

  const handleCreatePress = () => {
    setRedirectToSignUp(false); // Make sure SignUpScreen redirection is disabled
    setRedirectToLogin(false); // Make sure LoginScreen redirection is disabled
    setRedirectToCreate(true);
    setRedirectTodo(false);
  };

  const handleTodoPress = () => {
    setRedirectToSignUp(false); // Make sure SignUpScreen redirection is disabled
    setRedirectToLogin(false); // Make sure LoginScreen redirection is disabled
    setRedirectToCreate(false);
    setRedirectTodo(true);
  };

  const handleBackPress = () => {
    setRedirectToSignUp(false);
    setRedirectToLogin(false);
    setRedirectToCreate(false);
    setRedirectTodo(false);
  };

  if (redirectToSignUp) {
    return <SignUpScreen handleBackPress={handleBackPress} />;
  }

  if (redirectToLogin) {
    return <LoginScreen handleBackPress={handleBackPress} />;
  }

  if (redirectToCreate) {
    return <CreateScreen handleBackPress={handleBackPress} />;
  }
  if (redirectTodo) {
    return <Todoscreen handleBackPress={handleBackPress} />;
  }


  return (
    <React.Fragment>
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
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity style={styles.button} onPress={handleCreatePress}>
          <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTodoPress}>
          <Text>Todo</Text>
        </TouchableOpacity>
        <Text></Text><Text></Text>
        <Text></Text><Text></Text>
        <Text></Text><Text></Text>
        <Text></Text><Text></Text>
        <Text>Brought to you by Group 19.</Text>
      </View>
    </View>

    {/* <NavigationContainer>
      <Stack.Navigator initialRouteName='Todoscreen'>
        <Stack.Screen name ="CreateScreen" component={CreateScreen} />
        <Stack.Screen name ="Todoscreen" component={Todoscreen} />
      </Stack.Navigator>
    </NavigationContainer> */}

    </React.Fragment>
    
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
