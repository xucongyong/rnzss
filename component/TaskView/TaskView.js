import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

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
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                    试用中心</Text>
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

class task1 extends React.Component{
    render(){
        console.log('task1')
        return(
            <View style={{flex:1}}>
                <Text>task1</Text>
            </View>
        )}}

class task2 extends React.Component{
    render(){
        console.log('task2')
        return(
            <View style={{flex:1}}>
                <Text>task2</Text>
            </View>
        )}}

class task3 extends React.Component{
    render(){
        console.log('task3')
        return(
            <View style={{flex:1}}>
                <Text>task3</Text>
            </View>
        )}}

class task4 extends React.Component{
    render(){
        console.log('task4')
        return(
            <View style={{flex:1}}>
                <Text>task4</Text>
            </View>
        )}}

const Screen = createTabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Details: {
            screen: DeatilScreen
        },
        task1: {
            screen: task1
        },
        task2: {
            screen: task2
        },
        task3: {
            screen: task3
        },
        task4: {
            screen: task4
        }

    },
    {
        initialRouteName: 'Home',
        tabBarPosition:'top',
        lazy:true,
        swipeEnabled:true,
        tabBarOptions: {
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            width: 100,
          },
          activeTintColor:'#000000',
          inactiveTintColor:'#000000',
          style: {
            backgroundColor: '#FFFFFF',
          },
        }
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