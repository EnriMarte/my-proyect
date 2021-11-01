import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Profile(props){
    return(
        <View style={StyleSheet.container}>
            <Text>Profile</Text>
            <Text>{props.user}</Text>

            <TouchableOpacity
                onPress={() => props.signOut()}
            >
                <Text>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    )
}
