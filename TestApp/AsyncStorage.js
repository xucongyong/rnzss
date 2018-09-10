import React from 'react';
import { Platform, StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default class App extends React.Component{

    _storeData = async () =>{
        try {
            await AsyncStorage.setItem('X1', 'I like save it.');
            await AsyncStorage.setItem('X2', 'I like save it.');
            console.log('_storeData')
        } catch (error) {
            //Error saving data
        }
    }
    _retrieveDta = async () => {
        try {
            const value = await AsyncStorage.getItem('X1');
            const value1 = await AsyncStorage.getItem("token");
            if (value !== null) {
                // We have data!
                console.log(value);
                console.log('_retrieveDta')
                console.log(value1);Í
            }
        } catch (error) {
            //ERROR RETRIVEING DATA
        }
    }

    render() {
        return(
            <View>
                <Text>123123</Text>

                <Text>123123</Text>
                <Text>123123</Text>

                <TouchableOpacity style={{width: 100, height: 100, borderWidth: 1}} onPress={this._storeData}>
                <Text>_storeData</Text>
            </TouchableOpacity>
                <TouchableOpacity style={{width: 100, height: 100, borderWidth: 1}} onPress={this._retrieveDta}>
                    <Text>_retrieveDta</Text>
                </TouchableOpacity>
            </View>

    )}
}



