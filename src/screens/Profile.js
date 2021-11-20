import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
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
            <View style={styles.container}>
                <Text>{this.props.nombre}</Text>

                <TouchableOpacity style={styles.quitarLike}
                    onPress={() => this.props.signOut()}
                >
                    <Image style={styles.image} source={{uri: "https://www.kindpng.com/picc/m/19-194798_transparent-logout-png-sign-out-icon-transparent-png.png",}}/> 
                    {/* <Text>Cerrar Sesion</Text> */}
                </TouchableOpacity>
                <FlatList style={styles.card}
                    data={this.state.posteosUser}
                    renderItem={ ({item})=><Posteos doc={item} borrar={(id) => this.borrarPost(id)}/>}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: '4%',
      },
      image: {
        width: '100%',
        height: '80%',
    },
    quitarLike: {
        backgroundColor: 'white',
        height: '80px',
        marginLeft: '69%',
        marginRight: '5%',
        opacity: '50%',
      },
})