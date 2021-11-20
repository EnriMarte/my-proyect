import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FloatList, Image, ActivityIndicator } from 'react-native';
import {Camera} from 'expo-camera';
import { storage } from '../firebase/config'; 
import { LinearGradient } from 'expo-linear-gradient';


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
                    <TouchableOpacity style={styles.btnn} onPress= { () => this.sacarFoto()}>
                        <LinearGradient
                    colors={['#7E4B2A', '#78CB43']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}
                        >                        
                            <Text >Sacar Foto</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                

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
        backgroundColor: 'teal',
        color: 'white',
        marginTop: '2%',
        marginLeft: '5%'
    },
    btnAceptar:{
        flex: 1,     
        width: '30%',
        backgroundColor: 'tomato',
        color: 'white',
        marginTop: '2%',
        marginLeft: '5%'
    },
    mensaje:{
        backgroundColor: 'tomato',
        color: 'white'
    }

})

export default MiCamara;