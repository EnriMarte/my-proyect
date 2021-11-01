import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../Firebase/Config';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';


const Drawer = createDrawerNavigator();

export default class AuthDrawer extends Component{
    constructor(props){
        super(props);
        this.state = {
            logIn : false,
            user: '',
            error: ''
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
    registrarse(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
            this.setState({logIn: true})
            this.setState({user: response.user.email})
        })
        .catch(error => {
            console.log(error);
            this.setState({logIn: false})
        })
    }
    ingresar(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
            this.setState({logIn: true})
            this.setState({user: response.user.email})
        })
        .catch(error => {
            console.log(error);
            this.setState({logIn: false})
        })
    }
    signOut(){
        auth.signOut()
        .then(response => {
            this.setState({
                logIn: false,
                user: ''
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
                                <Drawer.Screen name="Home">
                                    {() => <Home />}
                                </Drawer.Screen>
                                <Drawer.Screen name="Perfil">
                                    {() => <Profile user={this.state.user}
                                    signOut={() => this.signOut()} />}
                                </Drawer.Screen>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Drawer.Screen name="Login">
                                    {() => <Login ingresar = {(email, password)=> this.ingresar(email, password)}/>}
                                </Drawer.Screen>
                                <Drawer.Screen name="Register">
                                    {() => <Register registrar = {(email, password)=> this.registrarse(email, password)}/>}
                                </Drawer.Screen>
                            </React.Fragment>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

