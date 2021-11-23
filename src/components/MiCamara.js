import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import {Camera} from 'expo-camera';
import { storage } from '../firebase/config'; 


class MiCamara extends Component{
    constructor(props){
        super(props);
        this.state = {
            foto: '',
            permisos : false    
        }
        this.camara; 
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permisos : true
            })
        })
        .catch(()=>{
            this.setState({
                permisos: false
            })
        })
    }
    sacarFoto(){
        this.camara.takePictureAsync()
        .then((photo)=>{
            this.setState({
                foto : photo.uri
            })
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    rechazar(){
        this.setState({
            foto : ''  
        })
    }
    aceptar(){
        fetch(this.state.foto)
        .then((respuesta)=>{
            return respuesta.blob()
        })
        .then((imagen)=>{
            const storageRef = storage.ref(`camara/${Date.now()} `)
            storageRef.put(imagen)   
            .then(()=>{
                storageRef.getDownloadURL()
                .then((url) =>{
                    this.props.subirFoto(url)
                })
            })
        })
        this.setState({
            foto : ''  
        })
    }
    render(){
        if(this.state.permisos === false){
            return <Text style={styles.mensaje}>No tiene el permiso para tomar fotos</Text>
        }
        return(
            <React.Fragment>
                {
                    this.state.foto ?
                    <React.Fragment>
                        <Image  source= {{uri: this.state.foto}} style={styles.vistaPrevia}   />        
                        <TouchableOpacity onPress={() => this.rechazar()}>
                            <Text style={styles.btnRechazar}>Rechazar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.aceptar()}>
                            <Text style={styles.btnAceptar}>Aceptar</Text>
                        </TouchableOpacity>                        
                    </React.Fragment> 
                    :   
                    <React.Fragment >
                        <Camera 
                            style = { styles.camara}  
                            type = {Camera.Constants.front}   
                            ref = {reference => this.camara = reference} 
                        />
                    </React.Fragment>    
                }
                {!this.state.foto ?
                    <TouchableOpacity style={styles.insta} onPress= { () => this.sacarFoto()}>            
                        <Text >Sacar Foto</Text>
                    </TouchableOpacity>:
                    null
                }
                    
                

            </React.Fragment>
        )
    }

}
const styles = StyleSheet.create({
    camara : {
        flex: 1,
        width: '88%',
        marginLeft: '6%',
        marginBottom: '4%',
    },
    btn: {
        backgroundColor: 'tomato',
        padding: '18',
        color: 'white',
        justifyContent: "center",
    },
    insta: {
        backgroundColor: "#78CB43",
        width: "88%",
        borderRadius: 25,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 34,
        marginLeft: '6%'
      },
    btnn: {
        padding: '6%'
    },
    vistaPrevia:{
        flex:6,       
        width: '100%'
    },
    btnRechazar:{
        flex: 1,     
        width: '30%',
        backgroundColor: "#89653A",
        color: 'white',
        marginTop: '2%',
        marginLeft: '20%',
        textAlign: 'center',
        width: '60%',
        padding: '2%',
    },
    btnAceptar:{
        flex: 1,     
        width: '30%',
        backgroundColor: "#78CB43",
        color: 'white',
        marginTop: '2%',
        marginLeft: '20%',
        textAlign: 'center',
        width: '60%',
        padding: '2%',
    },
    mensaje:{
        backgroundColor: 'tomato',
        color: 'white'
    }

})

export default MiCamara;