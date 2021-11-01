import React, {Component} from 'React'
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'

export default class Login extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Login
                </Text>
                <Text style={styles.label}>E-Mail</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <Text style={styles.error}>{this.props.errorMessage}</Text>
                <TouchableOpacity 
                style={styles.button} 
                onPress={()=>this.props.ingresar(this.state.email, this.state.password)}>
                <Text style={styles.textButton}>Log In</Text>    
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
    textButton:{
        color: '#fff'
    }

})