import React, {Component} from 'React'
import {View, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import Perfil from '../components/Perfil'
import { db} from "../firebase/config";


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            perfiles: [],    
            carga: true     
        }
    }
    search(text){
        console.log("mocz");
        db.collection('posts').where('username', '==', text).onSnapshot( docs => {
            let perfil=[];
            docs.forEach(doc => {
                console.log(doc)
                perfil.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            })
            console.log(perfil);
            this.setState({
                perfiles: perfil,    
                carga: false   
            })
        })
    }
    mostrarPerfiles(perfiles){
        perfiles = this.state.perfiles

    }
    render(){
        return(
            <View style={styles.container}>
                 <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>{
                        console.log(text);
                        console.log(this.search(text))
                        this.setState({
                            errorint: ''
                        })
                        
                    }}
                    placeholder='Ingrese nombre de usuario'
                />
                <View>
                        <FlatList
                            data={this.state.perfiles}
                            renderItem={ ({item})=><Perfil doc={item}/>}
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