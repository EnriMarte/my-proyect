import React, { Component } from "react";
import { View, Text, StyleSheet} from 'react-native';



export default class Comentarios extends Component {
    constructor(props){
        super(props);
    }
  
    render(){  
        return(
            
            <View style={styles.card}>
                <Text style={styles.comentarios}> {this.props.doc.creador}: {this.props.doc.comentario}  </Text>
            </View>
                
        )
    }
}
const styles = StyleSheet.create({
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
  comentarios: {
    fontSize: 18,
    fontWeight: 'normal'
  }
})