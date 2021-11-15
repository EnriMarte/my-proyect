import React, {Component} from 'React'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            errorint: ''
        }

    }
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: "https://i.ibb.co/JK3Wb2f/Kiwi.png",}}/> 
                <Text style={styles.error}>{this.props.error}</Text>
                <Text style={styles.error}>{this.state.errorint}</Text>
            <View style={styles.input}>

                <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>{
                        this.props.onInputChange()
                        this.setState({
                            errorint: '',
                            email: text
                        })
                    }}
                    placeholder='Email'
                    keyboardType='email-address'
                    />
            </View>
             <View style={styles.input}>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>{
                        this.props.onInputChange()
                        this.setState({
                            errorint: '',
                            password: text
                        })
                    }}
                    placeholder ='Password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
            </View>
                <TouchableOpacity 
                    
                    style={!(this.state.email && this.state.password)?
                        styles.disLoginBtn:
                        styles.loginBtn}
                    disabled= {!(this.state.email && this.state.password)} 
                    onPress={()=>{
                        if(this.state.email && this.state.password){
                            this.props.ingresar(this.state.email, this.state.password)
                        }else{
                            this.setState({
                                errorint: 'Porfavor completa los datos'
                            })
                        }
                    }
                }>    
                <Text>
                    Log In
                </Text >

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
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
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
    error:{
        color: 'red'
    },
    image: {
        height: "25%",
        marginBottom: 40,
        width: "60%",
      },
})