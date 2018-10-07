import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';


let HomeAllPage = require('./HomeAllPage');

const TopTabNav = createMaterialTopTabNavigator(
    {
        全部: { screen: HomeAllPage },
        // 红包: { screen: HomeAllPage },
        // 报名: { screen: HomeAllPage },
        // 返现: { screen: HomeAllPage },
        // 礼物: { screen: HomeAllPage },
    },
    {
        initialRouteName:'全部',
        tabBarPosition: 'top',
        tabBarOptions:{
            activeTintColor:'red',
            inactiveTintColor:'#000000',
            style:{
              backgroundColor: '#ffffff'
            },
        }
    }
);


module.exports= TopTabNav;