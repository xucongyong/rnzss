import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Main = require('./component/Main/Main');
var Mine = require('./component/Mine/Mine');
var Shop = require('./component/Shop/Shop');


class HomeScreen extends React.Component {
  render() {
    return (
      <Home/>      
    );
  }
}
class MainScreen extends React.Component {
  render() {
    return (
      <Main/>
    );
  }
}
class MineScreen extends React.Component {
  render() {
    return (
      <Mine/>      
    );
  }
}

class ShopScreen extends React.Component {
  render() {
    return (
      <Shop/>      
    );
  }
}

export default TabNavigator(
  {
    试用: { screen: HomeScreen },
    分享: { screen: MainScreen },
    订单: { screen: MineScreen },
    //More: { screen: MoreScreen },
    我的: { screen: ShopScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '试用') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } 
        else if (routeName === '分享') {
          iconName = `ios-aperture${focused ? '' : '-outline'}`;
        }
        else if (routeName === '订单') {
          iconName = `ios-cart${focused ? '' : '-outline'}`;
        }
        else if (routeName === '我的') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Shop') {
          iconName = `ios-more${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#DC3C78',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);