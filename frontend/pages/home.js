import React, {useState, useEffect } from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from './styles';
import axios from 'axios';

export default function Home() {
    console.log("Welcome to the Home page")

    return (
        <React.Fragment>
            <View style ={styles.container}>
            <Text style={styles.welcome2}>Home Page</Text>
            <Text style={styles.description}>Welcome USER, here are your notes!</Text>
            <TouchableOpacity>
            <Text style={styles.button2}>CREATE</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.button2}>DELETE</Text>
            </TouchableOpacity>
            <Text style={styles.return}>Want to return?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
            <Text style={styles.button2}>BACK TO WELCOME</Text>
            </TouchableOpacity>
            </View>
        </React.Fragment>
        
    )
}