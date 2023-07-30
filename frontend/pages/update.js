import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import axios from 'axios';

export default function Update({ route, navigation }) {
  const { username, selectedToDo } = route.params; // Get the username and selected to-do from the navigation params

  const [name, setName] = useState(selectedToDo.name);
  const [description, setDescription] = useState(selectedToDo.description);
  const [creationDate, setCreationDate] = useState(selectedToDo.creation_date);

  const handleUpdate = async () => {
    try {
      const updatedTodo = {
        name,
        description,
        creation_date: creationDate,
      };

      await axios.put(`http://localhost:5678/to-do/${selectedToDo.name}`, updatedTodo);
      navigation.navigate('Home', { username }); // Redirect back to the homepage
    } catch (error) {
      console.error('Error updating to-do:', error);
    }
  };

  return (
    <React.Fragment>
    <View style ={styles.container}>
      <Text style={styles.welcome2}>Please Update Your Selected Task:</Text>
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
      <TouchableOpacity onPress={handleUpdate}>
        <Text style={styles.button2}>Update</Text>
      </TouchableOpacity>
      <Text style={styles.return}>Want to return?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
            <Text style={styles.button2}>BACK TO WELCOME</Text>
            </TouchableOpacity>
    </View>
    </React.Fragment>
  );
}
