// screens/DriversScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import axios from 'axios';

export default function DriversScreen() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    // Fetch all drivers
    axios.get('https://api.openf1.org/drivers')
      .then(response => setDrivers(response.data))
      .catch(error => console.error(error));
  }, []);

  const selectDriver = (driverId) => {
    // Fetch driver details
    axios.get(`https://api.openf1.org/drivers/${driverId}`)
      .then(response => setSelectedDriver(response.data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      {selectedDriver ? (
        <View>
          <Text style={styles.title}>{selectedDriver.name}</Text>
          <Text>Nationality: {selectedDriver.nationality}</Text>
          <Text>Date of Birth: {selectedDriver.dateOfBirth}</Text>
          <Text>Team: {selectedDriver.team}</Text>
          <Text>Season Performance: {selectedDriver.seasonPerformance}</Text>
          <Text>Career Statistics: {selectedDriver.careerStatistics}</Text>
          <Button title="Back to Drivers List" onPress={() => setSelectedDriver(null)} />
        </View>
      ) : (
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Button title="View Profile" onPress={() => selectDriver(item.id)} />
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


