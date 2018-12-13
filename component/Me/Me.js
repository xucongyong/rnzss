import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage,TouchableHighlight} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require("react-native-image-picker")
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */



var CommonCell = require('./CommonCell');
class MeScreen extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false,
            avatarSource: ''
        }
    }

    static navigationOptions =({
        headerStyle: {
        backgroundColor: '#DC3C78'}
        })
        render(){

            return(
                <View style={{flex:1}}>
                        <View>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('money')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>小金库</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('card')}>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>银行卡</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            </TouchableHighlight>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}
                                >淘宝账号</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.LeftText}>京东账号</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={18} color="#4F8EF7"/>
                            </View>
                        </View>
                </View>
        )
    }
}




const styles = StyleSheet.create({
    container:{
        height:44,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    LeftText:{
        marginLeft: 15
    },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
}})

module.exports = MeScreen;