import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../Firebase/Config';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CrearPost from '../screens/CrearPost';
import Search from '../screens/Search';


const Drawer = createDrawerNavigator();

export default class AuthDrawer extends Component{
    constructor(props){
        super(props);
        this.state = {
            logIn : false,
            email: '',
            user: '',
            banana: ''
            }
    }

    componentDidMount(){
        auth.signOut()
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    logIn: true,
                })
            }
            else{
                this.setState({
                    logIn: false,
                })
            }
        })
    }
    registrarse(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                logIn: true,
                user: username,
                email: response.user.email
            })
        })
        .catch(error => {
            this.setState({
                banana: "Por favor, modifique su contraseña o ingrese un mail correcto",
                logIn: false
            })
        })
    }
    ingresar(email, password){
            auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.setState({
                    logIn: true,
                    user: response.user.displayName
                })
            })
            .catch(error => {
                this.setState({
                    logIn: false,
                    banana: "Credenciales incorrectas"
                })
            })
    }
    onInputChange(){
        this.setState({
            banana: ''
        })
    }
    signOut(){
        auth.signOut()
        .then(response => {
            this.setState({
                logIn: false,
                user: '',
                banana: ''
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    

    render(){
        return(
            <NavigationContainer> 
                <Drawer.Navigator>
                    {
                        this.state.logIn ?
                            <React.Fragment>
                                <Drawer.Screen name="Inicio">
                                    {() => <Home />}
                                </Drawer.Screen>
                                <Drawer.Screen name="Perfil">
                                    {() => <Profile 
                                    nombre={this.state.user}
                                    signOut={() => this.signOut()} />}
                                </Drawer.Screen>
                                <Drawer.Screen name="Postear">
                                {(drawerProps) => <CrearPost drawerProps={drawerProps}/>}
                                </Drawer.Screen>
                                <Drawer.Screen name="Buscador">
                                    {() => <Search />}
                                </Drawer.Screen>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Drawer.Screen name="Iniciar sesión">
                                    {() => <Login 
                                    ingresar = {(email, password)=> this.ingresar(email, password)} 
                                    error = {this.state.banana} 
                                    errordeLogin={() => this.onInputChange()}
                                    />}
                                </Drawer.Screen>
                                <Drawer.Screen name="Registrarse">
                                    {() => <Register 
                                    registrar = {(email, password, username)=> this.registrarse(email, password, username)} 
                                    error = {this.state.banana}
                                    onInputChange={() => this.onInputChange()}
                                    />}
                                </Drawer.Screen>
                            </React.Fragment>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

