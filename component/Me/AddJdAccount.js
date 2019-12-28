import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage,Image,TextInput, Alert} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';
var serverUrl = require("../websettings")
const addTbAccountUrl = serverUrl+'/m/addaccount';
const twoCodeUrl = serverUrl+'/t';

var CommonCell = require('./CommonCell');
class Hometitle extends React.Component{
    render(){
        return(
            <View>// style={styles.HeaderTitle}
                <Text style={{color:'white',fontSize:17}}>
                    个人中心</Text>
            </View>
        )}}
class tbScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false,
            text:'',
            tbdata:'',
            token:''
        }
        this.verify = this.verify.bind(this)
    }
    verify(){
        console.log(this.state.text)
        deviceStorage.get('token').then((GetToken) => {
            this.setState({token:GetToken})
            console.log(this.state.text)
            axios.post(addTbAccountUrl,{headers:{Authorization:this.state.token,version:'1.0',account:this.state.text,platform:'jd'}})
                .then(response => {
                    if(response.data == ''){
                        Alert.alert(
                            '绑定成功',
                            '',
                            [
                                {text: '返回首页', onPress: () => this.props.navigation.navigate('index')}
                            ],
                            { cancelable: false }
                        )
                    }else if(response.data === 0){
                        this.props.navigation.navigate('Login')
                    }else{
                        Alert.alert(
                            '提醒',
                            response.data,
                            [
                                {text: '确定', onPress: () => console.log('Cancel Pressed!')},
                            ],
                            { cancelable: false }
                        )				        }
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });

    }
    render(){
        return(
            <View style={{flex:1,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                <Image
                  style={{width: 350, height: 350}}
                  source={{uri: 'https://shiyong-1251434521.cos.ap-shanghai.myqcloud.com/jd.png'}}
                />
                <Text>京东app,扫二维码,或打开网址</Text>
                  <TextInput
                    style={{height:40}}
                    value={twoCodeUrl}
                  />
              <View style={{padding: 10}}>
                  <TextInput
                    placeholder="请输入绑定的京东账号"
                    style={{height:40}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                  />
                  <Text>{this.state.text}</Text>
                    <Button
                        onPress={() =>this.verify()}
                        title="绑定账号"
                        color="#841584"
                      />
                  </View>
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

module.exports = tbScreen;
