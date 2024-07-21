// screens/ScheduleScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function ScheduleScreen() {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);

  useEffect(() => {
    // Fetch race schedule
    axios.get('https://api.openf1.org/races')
      .then(response => setRaces(response.data))
      .catch(error => console.error(error));
  }, []);

  const selectRace = (raceId) => {
    // Fetch race details
    axios.get(`https://api.openf1.org/races/${raceId}`)
      .then(response => setSelectedRace(response.data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      {selectedRace ? (
        <View>
          <Text style={styles.title}>{selectedRace.name}</Text>
          <Text>Date: {selectedRace.date}</Text>
          <Text>Location: {selectedRace.location}</Text>
          <Text>Results: {selectedRace.results}</Text>
          <Button title="Back to Race Schedule" onPress={() => setSelectedRace(null)} />
        </View>
      ) : (
        <FlatList
          data={races}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Text>{item.date} - {item.location}</Text>
              <Button title="View Details" onPress={() => selectRace(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

