// screens/StandingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function StandingsScreen() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);

  useEffect(() => {
    // Fetch driver standings
    axios.get('https://api.openf1.org/standings/drivers')
      .then(response => setDriverStandings(response.data))
      .catch(error => console.error(error));

    // Fetch team standings
    axios.get('https://api.openf1.org/standings/teams')
      .then(response => setTeamStandings(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Standings</Text>
      <FlatList
        data={driverStandings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.position}. {item.driverName} - {item.points} points</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Team Standings</Text>
      <FlatList
        data={teamStandings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.position}. {item.teamName} - {item.points} points</Text>
          </View>
        )}
      />
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
