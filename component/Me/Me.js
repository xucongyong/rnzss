import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require("react-native-image-picker")
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
class Hometitle extends React.Component{
    render(){
        return(
            <View>// style={styles.HeaderTitle}
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>
            </View>
        )}}
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
        headerTitle: <Hometitle/>,
        headerStyle: {
        backgroundColor: '#DC3C78',}
        })
        render(){
            function testimage(){
                console.log('ImagePicker')
                console.log(ImagePicker)
                ImagePicker.showImagePicker(options, (response) => {
                  console.log('Response = ', response);
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  } else {
                    const source = { uri: response.uri };

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                      avatarSource: source,
                    });
                  }
                });   
            }



            return(
                <View style={{flex:1}}>
                    <ScrollView>
                        <View>
                            <CommonCell
                                title={'余额提现'}
                            />
                            <CommonCell
                                title={'账号'}
                            />
                            <CommonCell
                                title={'微信'}
                            />
                            <CommonCell
                                title={'手机'}
                            />
                            <CommonCell
                                title={'实名验证'}
                            />
                            <Text
                                onPress={() => testimage()}
                            >getimageurl</Text>
                        </View>

                    </ScrollView>
                </View>
        )
    }
}




const styles = StyleSheet.create({
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