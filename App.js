import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Spells from './components/spells';
import Classes from './components/classes';
import Features from './components/features';
import Monsters from './components/monsters';

export default function App() {
  const [consult, setConsult] = useState('');
  const [dados, setDados] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [mostrarSpells, setMostrarSpells] = useState(false);
  const [mostrarClasses, setMostrarClasses] = useState(false);
  const [mostrarFeatures, setMostrarFeatures] = useState(false);
  const [mostrarMonsters, setMostrarMonsters] = useState(false);

  const buscarConsult = async () => {
    try {
      const separarConsult = consult.split('/');
      const tipo = separarConsult[0];
      const nome = separarConsult[1];
      const response = await fetch(`https://www.dnd5eapi.co/api/2014/${tipo}/${nome}`);

      if (!response.ok) {
        setDados({ erro: 'Consulta não encontrada' });
        return;
      }

      const json = await response.json();
      setResultado(json);
      setDados(null);

    } catch (error) {
      setDados({ erro: 'Erro ao buscar consulta' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>D&D 5e</Text>
      <Text style={styles.titulo}>Consulte a descrição de classes, habilidades, monstros ou feitiços da 5° Edição de D&D</Text>

      <TextInput
        style={styles.input}
        placeholder="spells/acid-arrow/, classes/barbarian/, features/second-wind/, monsters/aboleth/"
        keyboardType="text"
        value={consult}
        onChangeText={setConsult}
      />

      <Button title="Buscar" onPress={buscarConsult} />
      <Button title="Limpar" onPress={() => { setConsult(''); setResultado(null); setDados(null); setMostrarSpells(false); setMostrarClasses(false); setMostrarFeatures(false); setMostrarMonsters(false); }} />
      <View style={styles.row}>
        <Button title="Classes" style={styles.botao} onPress={() => setMostrarClasses(true)} />
        <Button title="Habilidades" style={styles.botao} onPress={() => setMostrarFeatures(true)} />
      </View>
      <View style={styles.row}>
        <Button title="Monstros" style={styles.botao} onPress={() => setMostrarMonsters(true)} />
        <Button title="Feitiços" style={styles.botao} onPress={() => setMostrarSpells(true)} />
      </View>
      {mostrarSpells && <Spells />}
      {mostrarClasses && <Classes />}
      {mostrarFeatures && <Features />}
      {mostrarMonsters && <Monsters />}
      {resultado && (
        <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>{resultado.name}</Text>
        {resultado.image && (
          <Image
            source={{ uri: `https://www.dnd5eapi.co${resultado.image}` }}
            style={{ width: '100%', height: 200, marginTop: 10 }}
            resizeMode="contain"
          />
        )}
        {resultado.level !== undefined && (
          <>
            <Text>Nível: {resultado.level}</Text>
            <Text>Escola: {resultado.school?.name}</Text>
            <Text>Tempo: {resultado.casting_time}</Text>
            <Text>Alcance: {resultado.range}</Text>

            <Text style={{ marginTop: 10 }}>Descrição:</Text>
            <Text>{resultado.desc?.join('\n')}</Text>
          </>
        )}
        {resultado.type && (
          <>
            <Text>CR: {resultado.challenge_rating}</Text>
            <Text>Tipo: {resultado.type}</Text>
            <Text>HP: {resultado.hit_points}</Text>

            <Text style={{ marginTop: 10 }}>Atributos:</Text>
            <Text>
              STR: {resultado.strength}  DEX: {resultado.dexterity}  CON: {resultado.constitution}
            </Text>
            <Text>
              INT: {resultado.intelligence}  WIS: {resultado.wisdom}  CHA: {resultado.charisma}
            </Text>

            <Text style={{ marginTop: 10 }}>Descrição:</Text>
            {resultado.special_abilities?.map((item, index) => (
              <Text key={index}>
                {item.name}: {item.desc}
              </Text>
            ))}
          </>
        )}
        {resultado.hit_die && (
          <>
            <Text style={{ marginTop: 10, fontSize: 18 }}>Classe</Text>

            <Text>Vida por nível (Hit Die): d{resultado.hit_die}</Text>

            <Text style={{ marginTop: 10 }}>Saving Throws:</Text>
            {resultado.saving_throws?.map((item, index) => (
              <Text key={index}>- {item.name}</Text>
            ))}

            <Text style={{ marginTop: 10 }}>Proficiências:</Text>
            {resultado.proficiencies?.map((item, index) => (
              <Text key={index}>- {item.name}</Text>
            ))}

            <Text style={{ marginTop: 10 }}>Subclasses:</Text>
            {resultado.subclasses?.map((item, index) => (
              <Text key={index}>- {item.name}</Text>
            ))}
          </>
        )}
        {resultado.level !== undefined && resultado.class && !resultado.school && (
          <>
            <Text style={{ marginTop: 10, fontSize: 18 }}>Habilidade</Text>

            <Text>Nível: {resultado.level}</Text>
            <Text>Classe: {resultado.class?.name}</Text>

            <Text style={{ marginTop: 10 }}>Descrição:</Text>
            <Text>{resultado.desc?.join('\n')}</Text>
          </>
        )}
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  resultado: {
    marginTop: 20
  },
  erro: {
    color: 'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 10
  },
  botao: {
    flex: 1,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5
  }
});