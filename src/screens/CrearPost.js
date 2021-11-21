import React, {Component} from 'React'
import { db, auth} from "../firebase/config";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

import MiCamara from "../components/MiCamara";


class CrearPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            description: "",
            mostrarCamara: true,   
            foto: ''
          }
    }
    createPost(){
        db.collection("posts").add({
          username: auth.currentUser.displayName,
          description: this.state.description,
          createdAt: Date.now(),
          meGusta:[],            
          comments:[], 
          foto: this.state.foto          
        })
        .then(response => {
          this.setState({
            description: "",
          });
          this.props.drawerProps.navigation.navigate("Home");
        })
        .catch(error => {
          console.log(error)
        })
        this.setState({
          mostrarCamara: true    
        })
      }
      subirFoto(url){
        this.setState({
          foto: url,
          mostrarCamara: false    
        })
      }
      render(){
        return(
          <React.Fragment>
          {
            this.state.mostrarCamara ? 
              <MiCamara subirFoto= {(url)=> this.subirFoto(url)} />
            :
            <React.Fragment>
              <View style={styles.container}>
              <Text style={styles.titulo}>Registro de Posteos</Text>
              <Text>Descripción</Text>
              <TextInput 
                  style={styles.input}
                  multiline = {true}
                  numberOfLines = {5}
                  onChangeText={text => this.setState({description: text})}
              />
    
              <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.createPost()}
              >
                  <Text>Crear Post</Text>
              </TouchableOpacity>
          </View>
            </React.Fragment>
          }
          </React.Fragment>
    
    
          
        )
      }
    }
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
      },
      titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'tomato',
        fontSize: '2rem'
      },
      input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical:10
      },
    
      btn: {
          backgroundColor: 'teal',
          padding: 10,
          color: 'white'
      },
      error: {
          color: 'tomato'
      }
    }) 
    

export default CrearPost;