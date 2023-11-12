import React from 'react'
import { TouchableOpacity } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'

export default function TaskList({data, deleteItem, editItem}){
    return(
        <View style={styles.container}>
            <View>

            <TouchableWithoutFeedback onPress={()=> editItem(data)}>
                <Text>{data.nome}</Text> 
            
            </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity style={{marginLeft:2}} onPress={()=> deleteItem(data.key)}>
                <Text>Excluir</Text>
            </TouchableOpacity>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#c4c4c4',
        alignItems:'center',
        marginBottom:10,
        padding:2,
        borderRadius:3,
        height:46,
        justifyContent:'space-between',
        paddingHorizontal:20
        
        
    }
})