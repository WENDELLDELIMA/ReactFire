import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';
import {useState, useRef} from 'react'


export default function App() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);
  function clear(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }
  async function search(){
    if(cep == ''){
      alert('Digite um CEP valido!')
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);

      console.log(response.data)
      setCepUser(response.data);

      Keyboard.dismiss();
      
    } catch (error) {
      console.log('DEU RUIM:' + error)
    }
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={styles.text}>Digite o CEP:</Text>
        <TextInput 
          style={styles.input}
          placeholder='Ex: 79003241'
          value={cep}
          onChangeText={ (texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
          
        />
      </View>
      <View style={styles.areaBtn}>
      <TouchableOpacity style={[styles.botao, {backgroundColor:'red'}]}
          onPress={clear}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.botao, {backgroundColor:'blue'}]}
          onPress={search}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        
      </View>

    { cepUser &&
    
    <View style={styles.conteudo}>
    <Text style={styles.conteudoText}> CEP: {cepUser.cep}</Text>
    <Text style={styles.conteudoText}> Logradouro: {cepUser.logradouro}</Text>
    <Text style={styles.conteudoText}> Bairro: {cepUser.bairro}</Text>
    <Text style={styles.conteudoText}> Cidade: {cepUser.localidade}</Text>
    <Text style={styles.conteudoText}> Estado: {cepUser.uf}</Text>
  </View>
    
    
    }
    


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  input:{
    backgroundColor:'#FFF',
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:3,
    width:'90%',
    padding:25,
    fontSize:18

  },
  text:{
    marginTop:25,
    marginBottom:25,
    fontSize:25,
    fontWeight:'bold'

  },
  areaBtn:{
    marginTop:15,
    
    alignItems: 'center',
    flexDirection:'row', 
    justifyContent:'space-around'
  },

  botaoText:{
    fontSize:15,
    fontWeight:'bold',
    color:'white'
  },
  botao:{
 
    padding:15,
    borderRadius:5,
    height:50,
    alignItems:'center'
    
  },
  conteudo:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  conteudoText:{
    fontSize:17
  }
});
