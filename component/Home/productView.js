import React from 'react';
import {TabBarBottom, TabNavigator, createStackNavigator} from 'react-navigation';


var doubanComponent = require('./doubanComponent')


var ProductNav = createStackNavigator(
    {
        project: { screen: doubanComponent },
        details: { screen: doubanComponent },
        Login: { screen: doubanComponent },
        Reg: { screen: doubanComponent },
        buy: { screen: doubanComponent }
    },

    {
        navigationOptions: ({ navigation }) => ({
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: '#DC3C78',
            inactiveTintColor: 'gray',
            showIcon: 'false',
            showLabel: 'false',
            tabStyle: {
                width: 40,
            },
            labelStyle: {
                fontSize: 15,
            },
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

module.exports= ProductNav;