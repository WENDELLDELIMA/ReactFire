import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';

import firebase from '../../services/firebaseConnection';


export default function Login( {changeStatus}){
 const [type, setType] = useState('login')
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');


function handleLogin(){
  if(type === 'login'){
    const user = firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      changeStatus(user.user.uid)
    })
    .catch((error)=>{
      alert('Erro: ' + error.message);
      return
    })

  }else {
    // Cadastrando no Firebase
  
    const user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        changeStatus(user.uid)
      })
      .catch((error) => {
        console.log(error); // Use error, não 'error'
        alert('Erro: ' + error.message);
        return;
      });
  }
}
  return(
    <SafeAreaView style={styles.container}>
    <View style={styles.container1}>
      
      <TextInput 
        placeholder='Seu E-mail'
        style={styles.input}
        value={email}
        onChangeText={(text)=> setEmail(text)}
      />
      <TextInput 
        placeholder='Sua Senha'
        style={styles.input}
        value={password}
        onChangeText={(text)=> setPassword(text)}
      />
      <TouchableOpacity style={[styles.handleLogin,{backgroundColor: type === 'login' ? '#3ea6f2' : '#181818'} ]}
      onPress={handleLogin}>
        <Text style={{color:'#fff'}}>{type === 'login' ? 'Acessar' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setType(type=> type === 'login' ? 'cadastrar' : 'login')}>
        <Text  style={{textAlign:'center'}}>{type === 'login' ? 'Criar uma conta' : 'Ja possuo uma conta!'}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
  container:{
    flex:1,
    backgroundColor:'#f2f2fc'
    
  }, 
  container1:{
    flex:1,
    paddingTop:40,
    paddingHorizontal:10
    
  },
  input:{
    marginBottom:15,
    backgroundColor:'#FFF',
    height:60,
    borderRadius:4,
    padding:10,
    borderWidth:1,
    borderColor:'#c4c4c4'
  },
  handleLogin:{
    alignItems:'center',
    justifyContent:'center',
 
    height:50,
    marginBottom:15,
    borderRadius:5,
  
  }

});