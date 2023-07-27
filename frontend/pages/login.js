import React, {useState} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
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
            <View style ={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Login</Text>
            <TextInput
                id = "username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Enter Username"
                autoCompleteType="username"
            />
            <TextInput
                id = "password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Enter Password"
                autoCompleteType="password"
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Back to Welcome"
                onPress={() => navigation.navigate("Welcome")}
            />
            </View>
        </React.Fragment>
    )
}