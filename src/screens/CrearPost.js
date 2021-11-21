import React, {Component} from 'React'
import { db, auth} from "../firebase/config";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

import MiCamara from "../components/MiCamara";


class CrearPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            description: "",
            mostrarCamara: true,    //Creo este estado para verificar si tengo acceso o no a la camara, para mostrarla al usuario
            foto: ''     //Este estado lo creo para guardar la foto en el storage de Firebase 
          }
    }
    createPost(){
        db.collection("posts").add({
          username: auth.currentUser.displayName,
          description: this.state.description,
          createdAt: Date.now(),
          likes:[],            //Para lograr controlar los Likes
          comments:[],        //Para lograr almacenar los comentarios
          foto: this.state.foto            //Para lograr almacenar la foto y luego poder mostrarla donde desee
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
              <Text style={styles.titulo}>!Subí tu foto!</Text>
              <TextInput 
                  style={styles.input}
                  multiline = {true}
                  numberOfLines = {5}
                  onChangeText={text => this.setState({description: text})}
              />
    
              <TouchableOpacity
                  style={styles.insta}
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
    //Aquí es donde le aplico los estilos
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
        color: '#89653A',
        fontSize: '2rem'
      },
      input: {
        height: 20,
        paddingBottom: 25,
        paddingTop: 25,
        paddingLeft: 10,
        paddingRight: 60,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical:10

      },
      insta: {
        backgroundColor: "#78CB43",
        borderRadius: 30,
        width: "30%",
        height: 36,
        marginBottom: 20,
        alignItems: "center",
        marginTop: '4%',
        padding: '2%',
        marginLeft: '0%'
      },
      error: {
          color: 'tomato'
      }
    }) 
    

export default CrearPost;