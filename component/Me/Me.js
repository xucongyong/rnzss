import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import createReactClass from 'create-react-class';
import { createStackNavigator } from 'react-navigation';

var CommonCell = require('./CommonCell');
var LoginScreen = require('../Login/Login');

class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>

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
        console.log('this.props')
        console.log(this.openList)
        console.log(this.props)
        console.log('this.props')
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View>
                        <CommonCell
                            title={'余额提现'}
                        />
                        <CommonCell
                            title={'手机号'}
                        />
                        <CommonCell
                            title={'身份验证'}
                        />
                <Button
                  title="登陆"
                  onPress={() => this.props.navigation.navigate('Details')}
                  />
                <Button
                  title="注册"
                  onPress={() => this.props.navigation.dispatch('Reg')}
                  />
                <Button 
                title="首页"
                onPress={() => this.props.navigation.navigate('Login')}/>
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
        },

    },
    {
        initialRouteName: 'Home'
    },
)

var Me = createReactClass({
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
module.exports = Me;