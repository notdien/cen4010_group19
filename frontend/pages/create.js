import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import axios from 'axios';

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

      await axios.post(`http://localhost:5678/create/${username}`, newTodo);
      navigation.navigate('Home', { username }); // Redirect back to the homepage
      console.log("Successful Creation!")
    } catch (error) {
      console.error('Error creating new to-do:', error);
    }
  };

  return (
    <React.Fragment>
    <View style ={styles.container}>
      <Text style={styles.welcome2}>Create a new Task</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Title"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Description"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(text) => setCreationDate(text)}
        value={creationDate}
        placeholder="Date"
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleCreate}>
        <Text style={styles.button2}>Submit</Text>
      </TouchableOpacity>
    </View>
    </React.Fragment>
  );
}
