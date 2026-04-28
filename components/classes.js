import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    carregarClasses();
  }, []);

  const carregarClasses = async () => {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/2014/classes');
      const json = await response.json();
      setClasses(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={classes} 
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