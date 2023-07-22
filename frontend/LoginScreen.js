import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import axios from 'axios';


export default function LoginScreen({ handleBackPress, StackNavigator }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5678/login', {
        username,
        password,
      });

      if (response.data.Message === 'Login successful!') {
        // Do something on successful login (e.g. navigate to another screen)
        <Text>Login Sussessful!</Text>

      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Alert.alert("Error", error.response.data.Message);
        <Text>Login Unssessful!</Text>
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
        <Text>Login Unssessful!</Text>
      }
    }
  };


  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>Login Screen</Text>
      {/* Add your login screen components here */}
      {/* creates two text boxes for the user to input their username and password into */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
        autoCompleteType="username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCompleteType="password"
      />
      <TouchableOpacity style={styles.backButton} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    
      {/* <TouchableOpacity style={styles.backButton} onPress={handleSignUpPress}>
        <Text>Not registered? Sign Up!</Text>
      </TouchableOpacity> */}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%', // make sure the text input stretches the full width of the container
  },
});
