import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';


let HomeAllPage = require('./task2');

const TopTabNav = createMaterialTopTabNavigator(
    {
        免费折扣: { screen: HomeAllPage },
        // 红包: { screen: HomeAllPage },
        // 报名: { screen: HomeAllPage },
        // 返现: { screen: HomeAllPage },
        // 礼物: { screen: HomeAllPage },
    },
    {
        initialRouteName:'免费折扣',
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