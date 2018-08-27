import React from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';
import createReactClass from 'create-react-class';
import { createStackNavigator } from 'react-navigation';



class IndexTitle extends React.Component{
    render(){
        return(
            <Button
                title="首页"
                onPress={() => this.props.navigation.navigate('TabViews')}/>
        )}}
class RegTitle extends React.Component{
    render(){
        return(
            <Button 
                title="首页"
                onPress={() => this.props.navigation.navigate('TabViews')}/>
        )}}

export default class RegScreen extends React.Component{
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
module.exports = RegScreen;

