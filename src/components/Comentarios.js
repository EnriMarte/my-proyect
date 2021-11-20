import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";


export default class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
  
    render(){  
        return(
            
            <View style={styles.card}>
                <Text style={styles.name}>{this.props.doc.comentario}</Text>
                <Text style={styles.name}>{this.props.doc.creador}</Text>
            </View>
                
        )
    }
}
const styles = StyleSheet.create({
//     container: {
//         marginVertical: 15,
//         shadowColor: '#ccc',
//         shadowOffset:{
//             width: 0,
//             height: 0
//         },
//         shadowOpacity: 0.5,
//         shadowRadius: 10,
//         borderRadius: 5,   
//     },
  texto:{
    color: 'white'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
})