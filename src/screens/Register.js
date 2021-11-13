import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

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
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <Text style={styles.error}>{this.props.error}</Text>
                <Text style={styles.error}>{this.state.errorint}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su nombre'
                    keyboardType = 'default'
                    onChangeText = { (text) => this.setState({userName: text})} 
                />
                <TouchableOpacity 
                    
                    style={!(this.state.email && this.state.password && this.state.userName)?
                        styles.buttondis:
                        styles.button}
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
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    buttondis:{
        backgroundColor:'grey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'grey'
    },
    textButton:{
        color: '#fff'
    }

})

export default Register;