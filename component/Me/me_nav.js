import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';


let me = require('./Me');

const TopTabNav = createMaterialTopTabNavigator(
    {
        Me: { screen: me },
    },
    {
        initialRouteName:'Me',
        tabBarPosition: 'top',
        lazyLoad: true,
        tabBarOptions:{
            activeTintColor:'#dc3232',
            inactiveTintColor:'#dc3232',
            style:{
              backgroundColor: '#ffffff'
            },
        }
    }
);


module.exports= TopTabNav;