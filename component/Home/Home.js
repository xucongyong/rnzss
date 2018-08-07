import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import createReactClass from 'create-react-class';
import { createStackNavigator } from 'react-navigation';


class HomeScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <TextInput></TextInput>
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
}
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
    flex: 1,
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
});

// output class
module.exports = Home;