import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

var HomeNavigator = require('./HomeNavigator');


class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    试用中心</Text>
            </View>
        )}}


class HomeScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        headerStyle: {
            backgroundColor: '#DC3C78'}})
    render(){
        return(
            <HomeNavigator />
        )
    }
}

class DeatilScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text>Deatil</Text>
            </View>
        )}}

const Screen = StackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Details: {
            screen: DeatilScreen
        }
    },
    {
        initialRouteName: 'Home'
    },
)



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DC3C78',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#DC3C78',
        marginBottom: 5,
    },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
    },
    HeaderLeft: {

    },
    HeaderRight: {

    },
});

// output class
module.exports = Screen;