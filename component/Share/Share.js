import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import createReactClass from 'create-react-class';
import { createStackNavigator } from 'react-navigation';

var CommonCell = require('./CommonCell');



class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    优品分享</Text>
            </View>
        )}}


class HomeScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        // headerLeft: <HomeHeaderLeft />,
        // headerRight: <HomeHeaderRight />,
        headerStyle: {
            backgroundColor: '#DC3C78',}})
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View>
                        <CommonCell
                            title={'扫一扫'}
                        />
                    </View>
                </ScrollView>
            </View>
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

const Screen = createStackNavigator(
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

var Share = createReactClass({
    render() {
        return (
            <Screen />
        );
    }
})


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
module.exports = Share;