import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// importing the pages
import Welcome from './pages/welcome';
import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import Create from './pages/create';

// function WelcomeScreen() {
//   return (
//     <View>
//       <Text>
//         Welcome Screen
//       </Text>
//     </View>
//   )
// }

// function SignupScreen() {
//   return (
//     <View>
//       <Text>
//         Signup Screen
//       </Text>
//     </View>
//   )
// }

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}