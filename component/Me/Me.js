import React from 'react';
import {Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

var LoginScreen = require('../Login/Login');
var MeScreen = require('./MeScreen');

class DeatilScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text>Deatil</Text>
            </View>
        )}}

const HomeScreenExport = createStackNavigator(
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
    {
        initialRouteName: 'Home'
    },
)

// output class
module.exports = HomeScreenExport;