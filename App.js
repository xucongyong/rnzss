import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, Text, View ,TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//** --- input class --- **//
var Home = require('./component/Home/Home');
var Share = require('./component/Share/Share');
var Order = require('./component/Order/Order');
var Me = require('./component/Me/Me');


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

const TabView = TabNavigator(
  {
    试用: { screen: HomeScreen },
    分享: { screen: ShareScreen },
    订单: { screen: OrderScreen },
    我的: { screen: MeScreen }
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

class TabViewScreen extends React.Component{
  static navigationOptions = {
    header: null,
    };
  render(){ 
     return(
        <TabView />
      )
}
}

class LoginTitle extends React.Component{
    render(){
        return(
            <View>
                <Text style={{color:'white',fontSize:17}}>
                    登陆</Text>
            </View>
        )}}
class RegTitle extends React.Component{
    render(){
        return(
            <View>
                <Text style={{color:'white',fontSize:17}}>
                    注册</Text>
            </View>
        )}}

class IndexTitle extends React.Component{
    render(){
        return(
            <Button 
                title="首页"
                onPress={() => this.props.navigation.navigate('TabViews')}/>
        )}}

class LoginScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <LoginTitle/>, //<TextInput></TextInput>,
        headerLeft:  <IndexTitle/>,
        headerStyle: {
            backgroundColor: '#DC3C78'}})
    render(){
        return(
            <View style={styles.login}>
              <TextInput style={styles.textinput}
                placeholder="请输入账号、手机号" />
            <TextInput
              password="flase"
              placeholder="请输入密码"
                 />
            <View style={styles.button}>
                <Button
                  title="登陆"
                  onPress={() => this.props.navigation.navigate('Login')}
                  />
                <Button
                  title="注册"
                  onPress={() => this.props.navigation.navigate('Reg')}
                  />
            </View>
            </View>
        )
    }
}

class RegScreen extends React.Component{
      static navigationOptions =({
        headerTitle: <RegTitle/>, //<TextInput></TextInput>,
        headerLeft:  <IndexTitle/>,
        headerStyle: {
            backgroundColor: '#DC3C78'}})
    render(){
        return(
            <View style={styles.login}>
              <TextInput style={styles.textinput}
                placeholder="请输入账号、手机号" />
            <TextInput
              password="flase"
              placeholder="请输入密码"
                 />
            <View style={styles.button}>
                <Button
                  title="登陆"
                  onPress={() => this.props.navigation.navigate('Login')}
                  />
                <Button
                  title="注册"
                  onPress={() => this.props.navigation.navigate('Reg')}
                  />
            </View>
            </View>


        )}}

export default StackNavigator(
    {
        TabViews: {
            screen: TabViewScreen
        },
        Login: {
            screen: LoginScreen
        },
        Reg: {
            screen: RegScreen
        }
    },
    {
        initialRouteName: 'Login'
    },
)

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