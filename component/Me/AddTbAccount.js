import React from "react";
import {StyleSheet,Text, View, ScrollView, Button, AsyncStorage,Image,TextInput} from "react-native";
import deviceStorage from "../Login/jwt/services/deviceStorage";
import axios from 'axios';
import weburl from "../websettings";
import HttpGetPost from '../HttpGetPost';

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
        }
    }
        render(){
            return(
                        <View style={{flex:1,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                            <Image
					          style={{width: 150, height: 150}}
					          source={{uri: 'https://shiyong-1251434521.cos.ap-shanghai.myqcloud.com/alipay.png'}}
					        />
					        <Text>保存图片，请打开'支付宝app'，打开扫码二维码</Text>
				              <View style={{padding: 10}}>
						      <TextInput
						        placeholder="请输入支付宝绑定的淘宝账号"
						        style={{height:40}}
						        onChangeText={(text) => this.setState({text})}
						        value={this.state.text}
						      />
						      </View>

                </View>
        )
}}

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