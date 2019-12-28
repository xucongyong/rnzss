import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

let TaskViewProcess = require('./TaskViewProcess');
const Tab = createMaterialTopTabNavigator();
function App() {
    return (
        <Tab.Navigator
            initialRouteName={"进行"}
            lazy={true}
            >
            <Tab.Screen name="进行" component={TaskViewProcess}/>
            <Tab.Screen name="全部" component={TaskViewProcess}/>
            <Tab.Screen name="完成" component={TaskViewProcess}/>
            <Tab.Screen name="关闭" component={TaskViewProcess}/>
        </Tab.Navigator>
    );
}
module.exports= App;

