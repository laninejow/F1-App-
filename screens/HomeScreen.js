// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [topTeams, setTopTeams] = useState([]);

  useEffect(() => {
    // Fetch latest news
    axios.get('https://api.openf1.org/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));

    // Fetch upcoming races
    axios.get('https://api.openf1.org/races/upcoming')
      .then(response => setUpcomingRaces(response.data))
      .catch(error => console.error(error));

    // Fetch recent results
    axios.get('https://api.openf1.org/results/recent')
      .then(response => setRecentResults(response.data))
      .catch(error => console.error(error));

    // Fetch top drivers
    axios.get('https://api.openf1.org/drivers/top')
      .then(response => setTopDrivers(response.data))
      .catch(error => console.error(error));

    // Fetch top teams
    axios.get('https://api.openf1.org/teams/top')
      .then(response => setTopTeams(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Upcoming Races</Text>
      <FlatList
        data={upcomingRaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.date} - {item.location}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Recent Results</Text>
      <FlatList
        data={recentResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.raceName}</Text>
            <Text>{item.results}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Top Drivers</Text>
      <FlatList
        data={topDrivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.team}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Top Teams</Text>
      <FlatList
        data={topTeams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.points}</Text>
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
