import React from 'react';
import {Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

var LoginScreen = require('../Login/Login');
var MeScreen = require('./MeScreen');

class DeatilScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text>Deatil</Text>
            </View>
        )}}

const HomeScreenExport = StackNavigator(
    {
        Home: {
            screen: MeScreen
        },
        Details: {
            screen: DeatilScreen
        },
        Login: {
            screen: LoginScreen
        },
    },
)

// output class
module.exports = HomeScreenExport;