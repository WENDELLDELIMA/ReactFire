import React, { useEffect, useState } from 'react';
import { View,
   Text,
   StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }
      
      // Registrar um ouvinte no nó 'tarefas' do usuário
      const tasksRef = firebase.database().ref(`tarefas/${user}`);
      
      tasksRef.on('child_removed', (removedTaskSnapshot) => {
        // Quando um item é excluído, podemos remover o item correspondente da lista de tarefas
        const deletedKey = removedTaskSnapshot.key;
        setTasks((oldTasks) => oldTasks.filter((task) => task.key !== deletedKey));
      });
      
      // Ler dados iniciais do banco de dados e definir as tarefas
      tasksRef.once('value', (snapshot) => {
        const tasksData = snapshot.val();
        if (tasksData) {
          const tasksList = Object.keys(tasksData).map((key) => ({
            key,
            nome: tasksData[key].nome,
          }));
          setTasks(tasksList);
        } else {
          setTasks([]);
        }
      });
    }

    getUser();
  }, [user]);

function handleAdd(){
  if(newTask === ''){
    return
  }else{
    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;
    tarefas.child(chave).set({
      nome:newTask
    })
    .then(()=>{
      const data = {
        key:chave,
        nome:newTask
      };
      setTasks(oldTasks => [...oldTasks, data])
    })
    setNewTask('');
    Keyboard.dismiss();
  }
}

function handleDelete(key){
  firebase.database().ref('tarefas').child(user).child(key).remove()
  .then(()=>{
    const findTasks = tasks.filter( item => item.key !== key)
    setTasks(findTasks)
  })

}

function handleEdit(data){
  console.log(data)
}


if(!user){
  return <Login changeStatus={(user) => setUser(user)} />
}else{


  return(
    <SafeAreaView style={styles.container}>
    <View style={styles.container1}>
      <TextInput
      style={styles.input}
      placeholder='o que vamos fazer?'
      value={newTask}
      onChangeText={(text) => setNewTask(text)}
      />
      <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
      <Text style={styles.buttonAddText}>+</Text>

      </TouchableOpacity>
    </View>

    <FlatList 
    style={[{padding:12}]}
    data={tasks}
    keyExtractor={(item)=> item.key}
    renderItem={({item}) =>(
      <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
    )}
    />
  </SafeAreaView>
  );
}}

const styles = StyleSheet.create({
  container1:{
    
    paddingTop:40,
    paddingHorizontal:10,
    
    flexDirection:'row'
    
  },
  container:{
    flex:1,
    backgroundColor:"#f2f6fc",
    
  },
  input:{
    flex:1,
    marginBottom:10, 
    padding:10,
    backgroundColor:'#fff',
    borderRadius:4,
    height:46,
    borderWidth:1,
    borderColor:'#c4c4c4'
  },
  buttonAdd:{
    backgroundColor:'#c4c4c4',
    height:46,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    paddingHorizontal:14
  },
  buttonAddText:{
    color:'#fff',
    fontSize:24
  }

});