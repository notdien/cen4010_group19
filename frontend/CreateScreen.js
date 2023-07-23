import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import axios from 'axios';

export default function CreateScreen({ handleBackPress }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState(new Date());

  const handleCreateToDo = async () => {
    try {
      const formattedDate = creationDate.toISOString().split('T')[0];

      const response = await axios.post('http://localhost:5678/create', {
        name,
        description,
        creation_date: formattedDate,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: creationDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        setCreationDate(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create ToDo List</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name of List"
        autoCompleteType="off"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Description"
        multiline
        numberOfLines={4}
        autoCompleteType="off"
      />
      <TouchableOpacity style={styles.datePickerButton} onPress={openDatePicker}>
        <Text>Creation Date: {creationDate.toDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleCreateToDo}>
        <Text>Create ToDo List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  datePickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  backButton: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});




