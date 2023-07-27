import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import axios from 'axios';

export default function Signup( {navigation} ) {
    console.log("Welcome to the signup")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5678/signup', {
                username,
                password,
            });
            console.log(response.data);

            navigation.navigate("Home")
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <View style ={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Let's get you signed up!</Text>
            <TextInput
                id = "username"
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Enter New Username"
                autoCompleteType="username"
            />
            <TextInput
                id = "password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Enter New Password"
                autoCompleteType="password"
            />
            <Button title="New User" onPress={handleSignup} />
            <Button
                title="Back to Welcome"
                onPress={() => navigation.navigate("Welcome")}
            />
        </View>
    )
}