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
        db.collection('posts').where('username', '==', this.props.nombre).orderBy('createdAt', 'desc').onSnapshot( docs => {
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
    borrarPost(id){
        let thisDoc = db.collection('posts').doc(id);
        thisDoc.delete()
        
        let postNuevos = this.state.posteosUser.filter((post) => post.id != id)
        this.setState({
            posteosUser: postNuevos
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
                    renderItem={ ({item})=><Posteos doc={item} borrar={(id) => this.borrarPost(id)}/>}
                />

            </View>
        )
    }
}
