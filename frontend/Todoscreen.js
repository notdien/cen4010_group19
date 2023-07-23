import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import axios from 'axios';

export default function Todoscreen({ handleBackPress }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch all ToDos when the component mounts
    fetchAllToDos();
  }, []);

  const handleCreateToDo = async () => { //Ignore Placeholder for Create 
    try {
      const formattedDate = creationDate.toISOString().split('T')[0];

      const response = await axios.post('http://localhost:5678/to-do', {
        name,
        description,
        creation_date: formattedDate,
      });
      console.log(response.data);
      fetchAllToDos();
    } catch (error) {
      console.error(error);
     
    }
  };

  const handleDeleteToDo = async () => {
    try {
      // Get the names of the selected ToDos to delete
      const namesToDelete = todos.filter((todo) => todo.selected).map((todo) => todo.name);
  
      // Send delete requests for each selected ToDo
      const deleteRequests = namesToDelete.map(async (name) => {
        try {
          const response = await axios.delete(`http://localhost:5678/to-do/${name}`);
          console.log(`Deleted ToDo with name: ${name}`);
          console.log(response.data);
          return response;
        } catch (error) {
          console.error(`Error deleting ToDo with name: ${name}`, error);
          throw error;
        }
      });
      // Wait for all delete requests to complete
      const results = await Promise.all(deleteRequests);
      console.log('All ToDos deleted successfully:', results);
      fetchAllToDos();
    } catch (error) {
      console.error('Error while deleting ToDos:', error);
    }
  };

  const handleUpdateToDo = async () => { //Ignore Placeholder for Update 
    try {
      const formattedDate = creationDate.toISOString().split('T')[0];

      const response = await axios.put(`http://localhost:5678/to-do/${name}`, {
        description,
        creation_date: formattedDate,
      });
      console.log(response.data);
      fetchAllToDos();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllToDos = async () => {
    try {
      const response = await axios.get('http://localhost:5678/to-do');
      // Call functions to force out get call
      setTodos(response.data.map((todo) => ({ ...todo, selected: false })));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoPress = (index) => {
    // For Selects
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => (i === index ? { ...todo, selected: !todo.selected } : todo))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your ToDo List</Text>
      {/* Display the fetched todos as buttons */}
      {todos.map((todo, index) => (
        <TouchableOpacity
          key={todo._id}
          style={[
            styles.todoButton,
            { backgroundColor: todo.selected ? '#f44336' : '#ccc' },
          ]}
          onPress={() => handleTodoPress(index)}
        >
          <Text>{todo.name}</Text>
          <Text>{todo.description}</Text>
          <Text>Creation Date: {new Date(todo.creation_date).toDateString()}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleCreateToDo}>
        <Text>Create ToDo List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateToDo}>
        <Text>Update ToDo List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteToDo}>
        <Text>Delete ToDo List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fetchButton} onPress={fetchAllToDos}>
        <Text>Fetch All ToDos</Text>
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
    updateButton: {
        backgroundColor: '#ffc107', 
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      todoButton: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      deleteButton: {
        backgroundColor: '#f44336', 
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      fetchButton: {
        backgroundColor: '#4caf50', 
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
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
  
  
  
  
  