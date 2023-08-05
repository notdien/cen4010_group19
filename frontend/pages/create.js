import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import axios from 'axios';
import { Keyboard } from 'react-native';

export default function Home({ route, navigation }) {
  const { username } = route.params; // Get the username from the navigation params

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');

  const handleCreate = async () => {
    try {
      const newTodo = {
        name,
        description,
        creation_date: creationDate,
      };

      await axios.post(`http://192.168.1.178:5678/create/${username}`, newTodo);
      navigation.navigate('Home', { username }); // Redirect back to the homepage
      console.log("Successful Creation!")
    } catch (error) {
      console.error('Error creating new to-do:', error);
    }
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss } accessible={false}>
      <View style ={styles.container}>
      <Text style={styles.welcome2}>Create a new Task</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Title"
        style={styles.textInput}
        placeholderTextColor= 'white'
      />
      <TextInput
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Description"
        style={styles.textInput}
        placeholderTextColor= 'white'
      />
      <TextInput
        onChangeText={(text) => setCreationDate(text)}
        value={creationDate}
        placeholder="Date"
        style={styles.textInput}
        placeholderTextColor= 'white'
      />
      <TouchableOpacity onPress={handleCreate}>
        <Text style={styles.button2}>Submit</Text>
      </TouchableOpacity>
    </View>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
}
