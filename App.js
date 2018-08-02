import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Main = require('./component/Main/Main');
var Mine = require('./component/Mine/Mine');
var More = require('./component/More/More');
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
class MoreScreen extends React.Component {
  render() {
    return (
      <More/>      
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
    Home: { screen: HomeScreen },
    Main: { screen: MainScreen },
    Mine: { screen: MineScreen },
    More: { screen: MoreScreen },
    Shop: { screen: ShopScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } 
        else if (routeName === 'Main') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Mine') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'More') {
          iconName = `ios-more${focused ? '' : '-outline'}`;
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
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);