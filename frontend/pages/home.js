import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import axios from 'axios';

export default function Home({ route, navigation }) {
  const { username } = route.params; // Get the username from the navigation params

  const [userData, setUserData] = useState(null);
  const [selectedToDo, setSelectedToDo] = useState(null);

  useEffect(() => {
    // Fetch user data from the server using the username
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5678/read/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleDelete = async () => {
    try {
      if (selectedToDo) {
        await axios.post(`http://localhost:5678/delete/${username}`, { name: selectedToDo.name });
        // Update the user data after deletion
        setUserData(userData.filter((todo) => todo.name !== selectedToDo.name));
        setSelectedToDo(null); // Clear the selected to-do item after deletion
      }
    } catch (error) {
      console.error('Error deleting to-do:', error);
    }
  };

  const handleUpdate = () => {
    if (selectedToDo) {
      navigation.navigate('Update', { username, selectedToDo }); // Navigate to the Update page with selected to-do data
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get(`http://localhost:5678/read/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  return (
    <React.Fragment>
    <View style ={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      {userData && (
        <View>
          <Text style={styles.welcome2}>User's Task:</Text>
          {userData.map((todo) => (
            <TouchableOpacity
              key={todo.name}
              onPress={() => setSelectedToDo(todo)}
              style={{
                padding: 10,
                backgroundColor: selectedToDo === todo ? 'white' : 'transparent',
              }}
            >
              <Text style={{ color: 'orange' }}>{todo.name} - {todo.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {selectedToDo && (
        <View>
          <Text>Selected To-Do:</Text>
          <Text>{selectedToDo.name} - {selectedToDo.description}</Text>
          <Text style={styles.return}>                   Task Options</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Create', { username })}>
        <Text style={styles.button2}>Create</Text>
      </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate}>
            <Text style={styles.button2}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.button2}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={handleRefresh}>
        <Text style={styles.button2}>Refresh</Text>
      </TouchableOpacity>
      <Text style={styles.return}>Want to return?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
            <Text style={styles.button2}>BACK TO WELCOME</Text>
            </TouchableOpacity>
    </View>
    </React.Fragment>
  );
}
