import React, {useState} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from './styles';
import axios from 'axios';


export default function Login({navigation} ) {
    console.log("Welcome to the login page")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5678/login', {
                username,
                password
            });
            if (response.data.Message === 'Login successful!') {
                <Text>Login Successful!</Text>
                console.log("Successful login!")
                navigation.navigate("Home")
            }
        }
        catch (error) {
            if(error.response) {
                Alert.alert("Error", error.response.data.Message);
                <Text>Login Unsuccessful!</Text>
            }
            else {
                console.log('Error', error.response.data.Message);
                <Text>Login Unsuccessful!</Text>
            }
        }
    }

    return (
        <React.Fragment>
            <View style ={styles.container}>
            <Text style={styles.welcome2}>Login</Text>
            <TextInput
                id = "username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="                  Enter Username"
                autoCompleteType="username"
                style={styles.textInput}
            />
            <TextInput
                id = "password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="                  Enter Password"
                autoCompleteType="password"
                style={styles.textInput}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.button2}>LOGIN!</Text>
            </TouchableOpacity>
            <Text style={styles.return}>Want to return?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
            <Text style={styles.button2}>BACK TO WELCOME</Text>
            </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}