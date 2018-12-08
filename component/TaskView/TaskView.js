import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

let TaskViewProcess = require('./TaskViewProcess');
let TaskViewClose = require('./TaskViewClose');
let TaskViewDone = require('./TaskViewDone');


const Screen = createMaterialTopTabNavigator(
    {
        进行中: {
            screen: TaskViewProcess
        },
        完成: {
            screen: TaskViewDone
        },
        关闭: {
            screen: TaskViewClose
        }

    },
    {
        initialRouteName: '进行中',
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