import React, {Component} from 'react'
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native'
import { db} from "../firebase/config";
import Posteos from "../components/Posteos";


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            perfiles: [],    
            carga: true     
        }
    }
    search(text){
        db.collection('posts').where('username', '==', text).onSnapshot( docs => {
            let perfil=[];
            docs.forEach(doc => {
                perfil.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            })
            this.setState({
                perfiles: perfil,    
                carga: false   
            })
        })
    }
    render(){
        return(
            <View style={styles.container}>
                 <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>{
                        this.search(text)
                    }}
                    placeholder='Ingrese nombre de usuario'
                />
                <View>
                    <FlatList
                        data={this.state.perfiles}
                        renderItem={ ({item})=><Posteos doc={item}/>}
                    />    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        padding: '4%',
    },
    content: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
      },
      box: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        marginBottom: 10
      } 
})