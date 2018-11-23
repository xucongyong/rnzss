import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

let TaskViewHome = require('./TaskViewHome');


const Screen = createMaterialTopTabNavigator(
    {
        进行: {
            screen: TaskViewHome
        },
        操作: {
            screen: TaskViewHome
        },
        申诉: {
            screen: TaskViewHome
        },
        完成: {
            screen: TaskViewHome
        },
        关闭: {
            screen: TaskViewHome
        }

    },
    {
        initialRouteName: '进行',
        tabBarPosition:'top',
        lazy:true,
        swipeEnabled:true,
        tabBarOptions: {
          labelStyle: {
            fontSize: 12,
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