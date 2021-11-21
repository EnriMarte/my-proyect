import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
            errorint: ''
        }
    }


    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: "https://i.ibb.co/QFt66f1/carbon.png",}}/> 
                <Text style={styles.error}>{this.props.error}</Text>
                <Text style={styles.error}>{this.state.errorint}</Text>
                <View style={styles.input}>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                    />
                </View>
                <View style={styles.input}>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
                </View>
                <View style={styles.input}>
                <TextInput
                    style ={styles.TextInput}
                    placeholder = 'Introduzca su nombre'
                    keyboardType = 'default'
                    onChangeText = { (text) => this.setState({userName: text})} 
                />
                </View>
                <TouchableOpacity 
                    
                    style={!(this.state.email && this.state.password && this.state.userName)?
                        styles.disLoginBtn:
                        styles.loginBtn}
                    disabled= {!(this.state.email && this.state.password && this.state.userName)} 
                    onPress={()=>{
                        
                        if(this.state.email && this.state.password && this.state.userName){
                            this.props.registrar(this.state.email, this.state.password, this.state.userName)
                        }else{
                            this.setState({
                                errorint: 'Porfavor completa los datos'
                            })
                        }
                    }
                    }>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
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
      },
    input: {
        backgroundColor: "#78CB43",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
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
    textButton:{
        color: '#fff'
    },
    image: {
        height: "8%",
        marginBottom: 20,
        width: "66%",
      },
    registrar: {
        color: '#89653A',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        fontSize: 'large',
    },

})

export default Register;