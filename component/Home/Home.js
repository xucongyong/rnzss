import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import createReactClass from 'create-react-class';
import { createStackNavigator } from 'react-navigation';


class Hometitle extends React.Component{
    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <TextInput
                    placeholder="  商家、产品名称、商圈"

                ></TextInput>
            </View>
        )}}
class HomeHeaderLeft extends React.Component{
    render(){
        return(
            <View style={{flex:1, flexDirection:'row',}}>
                <Button style={{width:2, height:40,}}
                    title='城市'
                ></Button>

            </View>
        )}}
class HomeHeaderRight extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Button
                    title='搜索'
                ></Button>
            </View>
        )}}


class HomeScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <Hometitle/>, //<TextInput></TextInput>,
        headerLeft: <HomeHeaderLeft />,
        headerRight: <HomeHeaderRight />,

        headerStyle: {
            backgroundColor: '#f4511e',
        }
    })
  render(){

    return(
        <View style={{flex:1}}>
        <Text>xxxx</Text>
          <Button
          title = 'HELLO'
          onPress ={()=> this.props.navigation.navigate('Details')}
          ></Button>
        </View>
    )
  }
}

class DeatilScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text>Deatil</Text>
            </View>
        )}}

const Screen = createStackNavigator(
    {
        Home: {
          screen: HomeScreen
        },
        Details: {
          screen: DeatilScreen
        }
    },
{
  initialRouteName: 'Home'
},
)

var Home = createReactClass({
	render() {
      return (
      <Screen />
    );
  }
})


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    Headertitle: {

    }
});

// output class
module.exports = Home;