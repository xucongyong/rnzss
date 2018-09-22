import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';


let doubanComponent = require('./doubanComponent');

const TopTabNav = createMaterialTopTabNavigator(
    {
        全部: { screen: doubanComponent },
        红包: { screen: doubanComponent },
        报名: { screen: doubanComponent },
        返现: { screen: doubanComponent },
        有礼: { screen: doubanComponent }
    },
    {
        tabBarPosition: 'top',
    }
);


module.exports= TopTabNav;