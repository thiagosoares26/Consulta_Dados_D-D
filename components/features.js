import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    carregarFeatures();
  }, []);

  const carregarFeatures = async () => {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/2014/features');
      const json = await response.json();
      setFeatures(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={features.slice(0, 15)} // Exibe apenas os primeiros 10 features
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