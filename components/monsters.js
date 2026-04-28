import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Monsters() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    carregarMonsters();
  }, []);

  const carregarMonsters = async () => {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
      const json = await response.json();
      setMonsters(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={monsters.slice(0, 15)} // Exibe apenas os primeiros 10 monsters
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}