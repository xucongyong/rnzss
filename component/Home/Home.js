import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';

var HomeDetails = require('./HomeDetails');
var HomeNavigator = require('./HomeNavigator');


class Hometitle extends React.Component{
    render(){
        return(
            <View style={styles.HeaderTitle}>
                <Text style={{color:'white',fontSize:17}}>
                试用中心</Text>
            </View>
        )}}

class HomeScreen extends React.Component{
    static navigationOptions =({
        headerTitle: <Hometitle/>,
        headerLeft:  <Button
            title="ModalScreen"
            onPress={() => this.props.navigation.navigate('MyModal')}/>,
        headerStyle: {
            backgroundColor: '#DC3C78'}})
  render(){
    return(
        <HomeNavigator />
    )
  }
}



const Screen = StackNavigator(
    {
        Home: {
          screen: HomeScreen
        },
        Details: {
          screen: HomeDetails
        }
    },
{
    initialRouteName: 'Home',
},
)


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC3C78',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#DC3C78',
    marginBottom: 5,
  },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
      },
    HeaderLeft: {

    },
    HeaderRight: {

    },
});

// output class
module.exports = Screen;