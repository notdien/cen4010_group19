import * as React from 'react';
import { Button, View, Text, TouchableOpacity  } from "react-native";
import styles from './styles';

export default function Welcome( {navigation} ) {
    console.log("Welcome to the Welcome Page")

    return (
        <View style ={styles.container}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text>
            <Text style={styles.title}>Task</Text>
            <Text style={styles.titleO}>HUB</Text>
            </Text>
            <Text style={styles.description}>The app that helps reminds you!</Text>
            <Text style={styles.signupW}>New here?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.button}>
            <Text style={styles.button}>SIGN UP HERE!</Text>
            </TouchableOpacity>
            <Text style={styles.loginW}>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
            <Text style={styles.button}>LOGIN!</Text>
            </TouchableOpacity>
            <Text>Presented to you by Group 19</Text>
        </View>
    )
}