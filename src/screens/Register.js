// import React, {Component} from "react";
// import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

// class Register extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             email : '',
//             password: ''
//         }
//     }
   
//     render(){
//         return(
//             <View style= {styles.container}>
//                 <Text style={styles.titulo}>Registro de usuarios</Text>
//                 <TextInput
//                     style ={styles.input}
//                     placeholder = 'Introduzca su email'
//                     keyboardType = 'email-address'
//                     onChangeText = { (text) => this.setState({email: text})} 
//                 />
//                 <Text style={styles.titulo}>Password</Text>
//                 <TextInput
//                 style={styles.input}
//                 onChangeText={text => this.setState({password: text})}
//                 secureTextEntry={true}
//                 />
//                 <TouchableOpacity style = {styles.boton} onPress = {() => this.props.registrarse(this.state.email, this.state.password)}>
//                 <Text style={styles.enviar}>Enviar</Text>
//                 </TouchableOpacity>
                
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         height: 250,
//         marginTop: 20
//     },
//     titulo:{
//         fontFamily: 'arial',
//         textAlign: 'center',
//         color: 'tomato',
//         fontSize: '2rem'
//     },
//     input: {
//         height: 20,
//         paddingVertical: 15,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderStyle: 'solid',
//         borderColor: '#ccc',
//         borderRadius: 6,
//         marginVertical:10
//     },
//     boton: {
//         backgroundColor: 'green',
//         paddingHorizontal: 10,
//         paddingVertical: 6,
//         textAlign: 'center',
//         borderRadius: 4,
//         borderWidth: 1,
//         borderStyle: 'solid',
//         borderColor: 'blue'
//     },
//     enviar:{
//         color: 'white'
//     }
// })


// export default Register;
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
        }
    }
    
    // Deprecado por inclusión de Firebase
    // onSubmit(){
    //     console.log(`El email ingresado es: ${this.state.email}`);
    //     console.log(`El usuario ingresado es: ${this.state.userName}`);
    //     console.log(`La contraseña ingresada es: ${this.state.password}`);
    // }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
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
                <Text style={styles.error}>{this.props.errorMessage}</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={()=>this.props.registrar(this.state.email, this.state.password)}>
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
    textButton:{
        color: '#fff'
    }

})

export default Register;