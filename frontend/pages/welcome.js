import * as React from 'react';
import { Button, View, Text } from "react-native";

export default function Welcome( {navigation} ) {
    console.log("Welcome to the Welcome Page")
    return (
        <View style ={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Welcome to TaskHub!</Text>
            <Text>New here?</Text>
            <Button
                title="Sign up here!"
                onPress={() => navigation.navigate("Signup")}
            />

            <Text>Already have an account?</Text>
            <Button
                title="Login in here!"
                onPress={() => navigation.navigate("Login")}
            />
            <Text>Presented by Group 19</Text>
        </View>
    )
}