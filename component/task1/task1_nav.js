import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';


let task1 = require('./task1');

const TopTabNav = createMaterialTopTabNavigator(
    {
        红包试用: { screen: task1 },
        // 红包: { screen: HomeAllPage },
        // 报名: { screen: HomeAllPage },
        // 返现: { screen: HomeAllPage },
        // 礼物: { screen: HomeAllPage },
    },
    {
        initialRouteName:'红包试用',
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