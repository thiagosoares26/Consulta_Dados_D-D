import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Spells() {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    carregarSpells();
  }, []);

  const carregarSpells = async () => {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/2014/spells');
      const json = await response.json();
      setSpells(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={spells.slice(0, 10)} // Exibe apenas os primeiros 10 feitiços
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
            <Text>Nível: {item.level}</Text>
          </View>
        )}
      />
    </View>
  );
}