import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Posteos from '../components/Posteos'
import {db} from "../firebase/config";


export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            posteosUser: []
        }

    }
    componentDidMount(){
        db.collection('posts').where('username', '==', this.props.nombre).onSnapshot( docs => {
            let posts=[];
            docs.forEach(doc => {
                console.log(doc)
                posts.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            })
            this.setState({
                posteosUser: posts,    
                carga: false   
            })
        })
    }
    render(){
        return(
            <View style={StyleSheet.container}>
                <Text>Profile</Text>
                <Text>{this.props.nombre}</Text>

                <TouchableOpacity
                    onPress={() => this.props.signOut()}
                >
                    <Text>Cerrar Sesion</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.posteosUser}
                    renderItem={ ({item})=><Posteos doc={item}/>}
                />

            </View>
        )
    }
}
