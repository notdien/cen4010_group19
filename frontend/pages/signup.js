import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput,TouchableOpacity  } from "react-native";
import styles from './styles';
import axios from 'axios';

export default function Signup( {navigation} ) {
    console.log("Welcome to the signup")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // hides text
    const [isHidden, setIsHidden] = useState(true);

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5678/login', {
                username,
                password,
            });
            console.log(response.data);

            navigation.navigate('Home', { username });
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <View style ={styles.container}>
            <Text style={styles.welcome2}>Let's get you signed up!</Text>
            <TextInput
                id = "username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="             Enter New Username"
                autoCompleteType="username"
                style={styles.textInput}
            />
            <TextInput
                id = "password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="             Enter New Password"
                autoCompleteType="password"
                style={styles.textInput}
                secureTextEntry={isHidden}
            />
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.button2}>CREATE NEW USER!</Text>
            </TouchableOpacity>
            <Text style={styles.return}>Want to return?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
            <Text style={styles.button2}>BACK TO WELCOME</Text>
            </TouchableOpacity>
        </View>
    )
}