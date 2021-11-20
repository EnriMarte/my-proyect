import React, { Component } from "react";
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Comentarios from "./Comentarios";

export default class Posteos extends Component {
    constructor(props){
        super(props);
        this.state = {
           meGusta: 0,
           meGustaron: false,
           showModal: false,
           showModalDelete: false,
           comentario: ''
        }
    }
    componentDidMount(){
        if(this.props.doc.data.meGusta){
            let likes = this.props.doc.data.meGusta.length;
            this.setState({
                meGusta: likes,
            })
            if (this.props.doc.data.meGusta.includes(auth.currentUser.email)) {
                this.setState({
                    meGustaron: true,
                })  
            }
        } 
    } 
    like(){        
        let thisDoc = db.collection('posts').doc(this.props.doc.id);
        thisDoc.update(
            { meGusta: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
        )
        .then(
            this.setState({
                meGustaron:true,
                meGusta: this.state.meGusta + 1,
            },
            console.log('likeado ok'))
            )
        .catch(e => console.log(e))
    }
    unLike(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);
            // thisDoc.delete()
        thisDoc.update(
            { meGusta: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
        )
        .then(
            this.setState({
                meGustaron:false,
                meGusta: this.state.meGusta - 1,
            },
            console.log('Deslikeado ok'))
            )
        .catch(error => console.log('Upss error encontrado '+error))
    }
    mostrarModal(){
       this.setState({
           showModal: true
       })
    }
    desmostrarModal(){
        this.setState({
            showModal: false
        })
    }
    mostrarModalDelete(){
        this.setState({
            showModalDelete: true
        })
     }
     desmostrarModalDelete(){
         this.setState({
             showModalDelete: false
         })
     }
    comentar(){        
        let thisDoc = db.collection('posts').doc(this.props.doc.id);
      
        thisDoc.update(
            { comments: firebase.firestore.FieldValue.arrayUnion({
                creador: auth.currentUser.email,
                comentario: this.state.comentario
            })}
        )
        .then(
            this.setState({
                comentario:''
            },
            console.log('comentario ok'))
            )
        .catch(e => console.log(e))
    }




    render(){  

        return(
            <View style={styles.card}>
            <Image style={styles.thumb} source= {this.props.doc.data.foto}/>
                <Text style={styles.name}>{this.props.doc.data.username}</Text>
                <Text style={styles.desc}>Descripción:  {this.props.doc.data.description}</Text>
                    { this.state.meGustaron === true ?
                        <TouchableOpacity  style={styles.quitarLike} onPress={()=>this.unLike()}>
                        <Image style={styles.image} source={{uri: "https://i.postimg.cc/y6gnWK7m/logon.png",}}/> 
                        </TouchableOpacity> :
                        <TouchableOpacity  style={styles.meGusta}  onPress={()=>this.like()}>
                        <Image style={styles.image} source={{uri: "https://i.postimg.cc/Kzj2DW8y/este.png",}}/> 
                        </TouchableOpacity>
                    }
                    <Text>Likes: {this.state.meGusta}</Text>
                    <Text>Cantidad de comentarios: {this.props.doc.data.comments.length} </Text>
                <TouchableOpacity style={styles.insta} onPress={()=>this.mostrarModal()}>
                Comentate
                {this.state.showModal ?
                <Modal visible={this.state.showModal}
                animationType= 'fade'
                transparent={false}>
                    {this.props.doc.data.comments.length == 0 ?
                    <Text>Aun no hay comentarios, sé el primero en comentar</Text>:
                    null
                    }
                     <FlatList
                            data={this.props.doc.data.comments}
                            renderItem={ ({item})=><Comentarios doc={item}/>}
                    />
                    <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>this.setState({comentario: text})}
                    placeholder='Que bien te ves pana rabbit...'
                    keyboardType='text'
                    value={this.state.comentario}
                    />
                    <TouchableOpacity 
                        style={!(this.state.comentario )?
                            styles.disLoginBtn:
                            styles.loginBtn}
                        disabled= {!(this.state.comentario )} 
                        onPress={()=>this.comentar()}> Comentar</TouchableOpacity>
                    <TouchableOpacity style={styles.insta} onPress={()=>this.desmostrarModal()}> Cerrar</TouchableOpacity>
                </Modal>:
                <Text></Text>
                }
                </TouchableOpacity> 
                {this.props.doc.data.username == auth.currentUser.displayName && this.props.borrar ?
                    <TouchableOpacity style={styles.insta} onPress={()=>this.mostrarModalDelete()}>
                    {this.state.showModalDelete ?
                        <Modal visible={this.state.showModalDelete}
                        animationType= 'fade'
                        transparent={false}>
            
                        <TouchableOpacity style={styles.meGusta} onPress={() => this.props.borrar(this.props.doc.id)}>
                            <Text>Borrar</Text>
                        </TouchableOpacity>   
                            <TouchableOpacity style={styles.insta} onPress={()=>this.desmostrarModalDelete()}> Cerrar</TouchableOpacity>               
                        </Modal>:
                            <Text></Text>
                    }
                    </TouchableOpacity>:
                        null
                }
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
    quitarLike: {
    backgroundColor: 'white',
    height: '80px',
    marginLeft: '69%',
    marginRight: '5%',
    opacity: '50%',
  },
  meGusta: {
    backgroundColor: 'white',
    height: '80px',
    marginLeft: '69%',
    marginRight: '5%',
  },
  image: {
      width: '54%',
      height: '60%',
      marginLeft: '40%',
  },
  texto:{
    color: 'black'
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
    alignSelf: 'center'
  },
  desc: {
        fontSize: 22,
  },
  insta: {
    backgroundColor: "#78CB43",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#89653A",
  },
  disLoginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
  },
})