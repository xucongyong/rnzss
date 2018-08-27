import { createTabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, Text, View ,TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Share = require('./component/Share/Share');
var Order = require('./component/Order/Order');
var Me = require('./component/Me/Me');
var LoginScreen = require('./component/Login/LoginAndRegViews');

class HomeScreen extends React.Component {
  render() {
    return (
      <Home/> 
    );
  }
}
class ShareScreen extends React.Component {
  render() {
    return (
      <Share />
    );
  }
}
class OrderScreen extends React.Component {
  render() {
    return (
      <Order />
    );
  }
}

class MeScreen extends React.Component {
  render() {
    return (
      
      <Me />
    );
  }
}

const TabView = createTabNavigator(
  {
    试用: { screen: HomeScreen },
    分享: { screen: ShareScreen },
    订单: { screen: OrderScreen },
    我的: { screen: MeScreen },
    登陆: { screen: LoginScreen},
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
        else if (routeName === '登陆') {
          iconName = `ios-more${focused ? '' : '-outline'}`;
        }

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
)

export default class shop extends React.Component{

  render(){ 
     return(
        <TabView />
      )
}
}





const styles = StyleSheet.create({
  login: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    height:60,
    fontSize: 18
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

