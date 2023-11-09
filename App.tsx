import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator} from 'react-native';
import firebase from './src/services/firebaseConnection';
import Listagem from './src/Listagem';

console.disableYellowBox=true;

export default function App(){
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {

    async function dados(){

      await firebase.database().ref('usuarios').on('value', (snapshot)=> {
        setUsuarios([]);

        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            cargo: chilItem.val().cargo
          };

          setUsuarios(oldArray => [...oldArray, data].reverse());
        })

        setLoading(false);

      })

    }

    dados();


  }, []);



  async function cadastrar(){
    if(nome !== '' & cargo !== ''){
      let usuarios = await firebase.database().ref('usuarios');
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo
      });

      alert('Cadastrado com sucesso!');
      setCargo('');
      setNome('');
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setNome(texto) }
      value={nome}
      />

      <Text style={styles.texto}>Cargo</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setCargo(texto) }
      value={cargo}
      />

      <Button
      title="Novo funcionario"
      onPress={cadastrar}
      />

      {loading ? 
      (
        <ActivityIndicator color="#121212" size={45} />
      ) :
      (
        <FlatList
        keyExtractor={item => item.key}
        data={usuarios}
        renderItem={ ({item}) => ( <Listagem data={item} /> )  }
        />
      )
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});